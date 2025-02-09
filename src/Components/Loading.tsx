import { TailSpin } from "react-loader-spinner";

export function Loading({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="w-20 h-20 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
