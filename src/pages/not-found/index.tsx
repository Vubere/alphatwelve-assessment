import { Link } from "react-router-dom";
import ROUTES from "../../lib/routes";


export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1 className="font-bold text-[44px] ">404</h1>
      <Link to={ROUTES.home} className="text-[#3344aa] font-semibold">Go to home page</Link>
    </div>
  )
}