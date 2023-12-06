import Header from "./Home";
import {Outlet} from "react-router-dom";

export default function Layout(props) {
  return (
    <main>
      <Header isLoggedIn={props.isLoggedIn}/>
      <Outlet />
    </main>
  );
}