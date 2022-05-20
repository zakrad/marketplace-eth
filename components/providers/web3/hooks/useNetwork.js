import useSWR from "swr"
import { useEffect } from "react"

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Georli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",

}
export const handler = (web3, provider) => () => {

    const { mutate, ...rest } = useSWR(() =>
        web3 ? "web3/network" : null,
        async () => {
            const chainId = await web3.eth.net.getChainId()
            return NETWORKS[chainId]
        })

    useEffect(() => {
        provider &&
            provider.on("chainChanged", chainId => {
                mutate(NETWORKS[parseInt(chainId, 16)])
            })
    }, [web3])

    return {
        network: {
            mutate,
            ...rest
        }
    }


}