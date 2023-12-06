import Header from "./Home";
import {Outlet} from "react-router-dom";

export default function Layout(props) {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}