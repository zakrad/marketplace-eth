const { createContext, useContext } = require("react")

const web3Context = createContext(null)

export default function Web3Provider({ children }) {

    return (
        <web3Context.Provider value={{ test: "Hello" }}>
            {children}
        </web3Context.Provider >


    )
}

export function useWeb3() {
    return useContext(web3Context)
}