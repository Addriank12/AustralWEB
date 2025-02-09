import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
}: {
  children: any;
  to: string;
}) {
  return (
    <Link
      to={to}
      className={`transition-colors inline-flex cursor-pointer items-center justify-center rounded-md py-1 h-8 px-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-21
            bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500`}
    >
      {children}
    </Link>
  );
}
