import useSWR from "swr"
import { useEffect } from "react"

const adminAddresses = {
    "0xcc5fb3078bcb4fcebc031044e5ed2f56ab4626cc762e19d51ec997bedbba23bc": true,
    "0x45b212b0a8f79fdf8c13596abbc1ce0e5e48fc4630e33188ab2278792ce25da0": true
}

export const handler = (web3, provider) => () => {
    const { data, mutate, ...rest } = useSWR(() =>
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]

            if (!account) {
                throw new Error("Cannot retreive an account, Please refresh the browser.")
            }

            return account
        }
    )
    useEffect(() => {
        const mutator = accounts => mutate(accounts[0] ?? null)
        provider?.on("accountsChanged", mutator)

        return () => {
            provider?.removeListener("accountsChanged", mutator)
        }
    }, [provider])

    return {
        data,
        isAdmin: (
            data &&
            adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest
    }
}