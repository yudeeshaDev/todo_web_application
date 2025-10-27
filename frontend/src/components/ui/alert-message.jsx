import * as React from "react"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "../../lib/utils"
import { Alert, AlertDescription } from "./alert"

const AlertMessage = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'error':
        return <XCircle className="h-4 w-4" />
      case 'warning':
        return <AlertCircle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return "border-green-200 bg-green-50 text-green-800"
      case 'error':
        return "border-red-200 bg-red-50 text-red-800"
      case 'warning':
        return "border-yellow-200 bg-yellow-50 text-yellow-800"
      case 'info':
        return "border-blue-200 bg-blue-50 text-blue-800"
      default:
        return "border-green-200 bg-green-50 text-green-800"
    }
  }

  return (
    <Alert className={cn("mb-4", getAlertClass())}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <AlertDescription>{message}</AlertDescription>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </Alert>
  )
}

export { AlertMessage }
