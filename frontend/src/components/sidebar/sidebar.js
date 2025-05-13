import { slide as Menu } from "react-burger-menu";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./sidebar.css";
function logout(removeCookie, navigate) {
  removeCookie("token");
  navigate("/");
}

export function SideBar() {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  return (
    <Menu>
      <a className="menu-item" href="/main">
        Main
      </a>
      <a className="menu-item" href="/credit">
        Credit
      </a>
      <a
        className="menu-item"
        href="#"
        onClick={() => logout(removeCookie, navigate)}
      >
        Logout
      </a>
    </Menu>
  );
}