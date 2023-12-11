import Header from "../components/common/header/Header";
import {Link, Outlet} from "react-router-dom";

export default function Layout(props) {
  return (
    <main>
      <Outlet />
    </main>
  );
}