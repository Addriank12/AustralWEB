export default function Button({
  children,
  onClick = null,
  disabled = false,
}: {
  children: any;
  onClick?: any;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-colors inline-flex cursor-pointer items-center justify-center rounded-md py-1 h-8 px-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500"
      }`}
    >
      {children}
    </button>
  );
}