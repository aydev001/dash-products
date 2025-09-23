import { Button } from "@/shared/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

const ErrorFallback = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
      <div className="flex items-center gap-2 text-red-600 mb-4">
        <AlertTriangle size={40} />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>

      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, an unexpected error occurred while loading the page.  
        Please try again by refreshing the page.
      </p>

      <Button onClick={handleReload} className="flex items-center gap-2">
        <RefreshCw size={18} />
        Reload Page
      </Button>
    </div>
  )
}

export default ErrorFallback
