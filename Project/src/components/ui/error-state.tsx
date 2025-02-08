interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "There was an error loading the content",
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-center">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="text-sm text-black hover:text-gray-700 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
