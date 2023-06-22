import Spinner from "./Spinner"

const LoadingScreen = () => {
    return (
      <div className="min-h-screen w-full relative">
        <Spinner height={50} width={50} className="center-div" />
      </div>
    )
}

export default LoadingScreen