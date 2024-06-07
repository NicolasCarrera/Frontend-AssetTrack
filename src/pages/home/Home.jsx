import { Outlet } from "react-router-dom";
import StickyNavbar from "../../components/common/StickyNavbar";

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <Outlet />
    </>
  )
}