import useSWR from "swr"
import { useEffect } from "react"

const adminAddresses = {
    "0xcc5fb3078bcb4fcebc031044e5ed2f56ab4626cc762e19d51ec997bedbba23bc": true
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
        provider &&
            provider.on("accountsChanged",
                accounts => mutate(accounts[0] ?? null)
            )
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