import { toast } from 'react-toastify'

export const withToast = (promise) => {
    toast.promise(
        promise,
        {
            pending: {
                render() {
                    return (
                        <div className="p-6 py-2">
                            <p className="mb-2">
                                Your transaction is being processed.
                            </p>
                            <p className="mb-2">
                                Hang tight... Just a few more moments.
                            </p>
                        </div>
                    )
                },
            },
            success: {
                render({ data }) {
                    return (
                        <div>
                            <p className="font-bold">
                                Tx: {data.transactionHash.slice(0, 20)}...
                            </p>
                            <p className="font-bold">
                                Has been successfuly processed.
                            </p>
                            <a
                                rel="noreferrer"
                                href={`https://ropsten.etherscan.io/tx/${data.transactionHash}`}
                                target="_blank"
                            >
                                <i className="text-indigo-600 underline">
                                    See Tx Detailes
                                </i>
                            </a>
                        </div>
                    )
                },
            },
            error: {
                render({ data }) {
                    // When the promise reject, data will contains the error
                    return <div>{data.message ?? "Transaction has failed"}</div>
                }
            }
        },
        {
            closeButton: true
        }
    )
}