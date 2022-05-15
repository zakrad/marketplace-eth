const { createContext, useContext, useEffect, useState, useMemo } = require("react")
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const web3Context = createContext(null)

export default function Web3Provider({ children }) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true
    })

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider(web3Context)
            if (provider) {
                const web3 = new Web3(provider)
                setWeb3Api({
                    provider,
                    web3,
                    contract: null,
                    isLoading: false
                })
            } else {
                setWeb3Api(api => ({ ...api, isLoading: false }))
                console.error("Please install Metamask")
            }
        }

        loadProvider()
    }, [])


    const _web3Api = useMemo(() => {
        return {
            ...web3Api,
            isWeb3Loaded: web3Api.web3 != null,
            connect: web3Api.provider ?
                async () => {
                    try {
                        await web3Api.provider.request({ method: "eth_requestAccounts" })
                    } catch (error) {
                        console.error("Can't retreive account!")
                        location.reload()
                    }
                } :
                () => console.error("Can't connect to metamask, reload please")
        }
    }, [web3Api])

    return (
        <web3Context.Provider value={_web3Api}>
            {children}
        </web3Context.Provider >


    )
}

export function useWeb3() {
    return useContext(web3Context)
}