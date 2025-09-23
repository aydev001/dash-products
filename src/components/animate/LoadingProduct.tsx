import Lottie from "lottie-react";
import loadingAnimiate from "@/shared/lottie/loading.json"

const LoadingProduct = () => {
  return (
    <div className="max-w-[150px] max-h-[150px] scale-100 relative">
      <Lottie animationData={loadingAnimiate} />
      <span className="text-[18px] font-bold font-mono text-indigo-600 absolute bottom-[25px] left-0 right-0 text-center animate-pulse">Loading</span>
    </div>
  )
}

export default LoadingProduct
