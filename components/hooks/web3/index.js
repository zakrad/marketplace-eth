import { useHooks } from "@components/providers/web3"


const enhancedHook = swrRes => {
    return {
        ...swrRes,
        hasInitialResponse: swrRes.data || swrRes.error
    }
}

export const useNetwork = () => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network: swrRes
    }
}
export const useAccount = () => {
    const swrRes = enhancedHook(useHooks(hooks => hooks.useAccount)())
    return {
        account: swrRes
    }
}

export const useOwnedCourses = (...args) => {
    const res = useHooks(hooks => hooks.useOwnedCourses)(...args)

    return {
        ownedCourses: { data: res }
    }
}

export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()
    return {
        account,
        network,
        canPurchaseCourse: !!(account.data && network.isSupported)
    }
}

