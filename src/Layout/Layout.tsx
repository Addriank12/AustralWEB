import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="grid grid-cols-[250px_1fr] ">
      <Sidebar  />
      <Outlet />
    </div>
  );
}
