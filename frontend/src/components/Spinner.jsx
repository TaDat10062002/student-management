import PulseLoader from "react-spinners/PulseLoader";
const Spinner = () => {
    return (
        <div className="w-fit mx-auto">
            <PulseLoader
                color='blue'
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner