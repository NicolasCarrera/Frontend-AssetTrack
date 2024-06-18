import { Outlet } from "react-router-dom";
import StickyNavbar from "../../components/common/StickyNavbar";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <StickyNavbar />
      <main className="relative overflow-auto max-h-screen w-full py-10 px-5 md:px-10 lg:px-20 bg-[#FFFFFE]">
        <Outlet />
      </main>
    </div>
  )
}