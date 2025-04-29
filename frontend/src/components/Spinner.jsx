import ClipLoader from "react-spinners/ClipLoader";
const Spinner = () => {
    return (
        <div className="text-center mt-5">
            <ClipLoader
                color='blue'
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner