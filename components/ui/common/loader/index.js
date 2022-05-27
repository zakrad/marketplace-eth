


export default function Loader() {



    return (
        <div className="spinner">
            {
                Array.from({ length: 2 }).map((_, i) =>
                    <div
                        key={`dot-${i}`}
                        className={`double-bounce${i + 1}`} />
                )}
        </div>
    )
}