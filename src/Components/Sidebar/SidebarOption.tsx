import { Link } from "react-router-dom";

export function SidebarOption({
  Icon,
  title,
  selected,
  to,
}: {
  Icon: string;
  title: string;
  selected: boolean;
  to: string;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 ${
        selected
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <img className="w-6 h-6" src={Icon} alt={title} />
      <span className="text-md font-semibold">{title}</span>
    </Link>
  );
}