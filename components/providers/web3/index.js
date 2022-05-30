const { createContext, useContext, useEffect, useState, useMemo } = require("react")
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "@utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const web3Context = createContext(null)

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
    return {
        web3,
        provider,
        contract,
        isLoading,
        hooks: setupHooks({ web3, provider, contract })
    }
}

export default function Web3Provider({ children }) {

    const [web3Api, setWeb3Api] = useState(createWeb3State({ web3: null, provider: null, contract: null, isLoading: true }))

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider(web3Context)
            if (provider) {
                const web3 = new Web3(provider)
                const contract = await loadContract("CourseMarketplace", web3)
                console.log(contract)
                setWeb3Api(createWeb3State({
                    web3, provider, contract, isLoading: false
                }))
            } else {
                setWeb3Api(api => ({ ...api, isLoading: false }))
                console.error("Please install Metamask")
            }
        }

        loadProvider()
    }, [])


    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect: provider ?
                async () => {
                    try {
                        await provider.request({ method: "eth_requestAccounts" })
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

export function useHooks(cb) {
    const { hooks } = useWeb3()
    return cb(hooks)
}