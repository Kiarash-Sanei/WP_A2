export function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <div
      className="w-6 h-6 rounded-full border-4 
                border-gray-300 border-t-blue-500 
                animate-spin"
    />
  ) : null;
}
