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
    <Link to={to} className={`flex items-center space-x-5 p-2 rounded-sm transition-colors text-white duration-200 ${selected ? 'bg-blue-500' : 'bg-[#36363A]'} hover:bg-blue-600`}>
      <img className="w-6 h-6" src={Icon} />
      <span className="text-md font-medium ">{title}</span>
    </Link>
  );
}
