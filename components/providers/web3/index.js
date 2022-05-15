const { createContext, useContext,useEffect ,useState} = require("react")
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const web3Context = createContext(null)

export default function Web3Provider({ children }) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isInitialized: false
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
                    isInitialized: true
                })
            } else {
                setWeb3Api(api => ({ ...api, isInitialized: true }))
                console.error("Please install Metamask")
            }
        }

        loadProvider()
    }, [])

    return (
        <web3Context.Provider value={web3Api}>
            {children}
        </web3Context.Provider >


    )
}

export function useWeb3() {
    return useContext(web3Context)
}