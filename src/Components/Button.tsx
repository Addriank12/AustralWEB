import { Link } from "react-router-dom";

export default function Button({
  to = "",
  children,
  onClick = null,
}: {
  to?: string;
  children: any;
  onClick?: any;
}) {
  return (
    <Link
      onClick={onClick}
      className="transition-colors cur inline-flex cursor-pointer items-center justify-center rounded-full py-1 h-10 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-600 text-white hover:text-slate-100 hover:bg-red-500 active:bg-red-800 active:text-blue-100 focus-visible:outline-red-600"
      to={to}
    >
      {children}
    </Link>
  );
}
