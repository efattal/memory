import "./Loader.css"

const Loader = ({size = "S"}: { size?: "S" | "M" | "L" | "XL" }) => {
    return (
        <div className={`dot-pulse-loader ${size}`}>
            <div className="dot-pulse">
                <div className="dot-pulse__dot"></div>
            </div>
        </div>
    )
}

export default Loader