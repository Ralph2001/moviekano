interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center h-48 text-red-500">
    <p>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
