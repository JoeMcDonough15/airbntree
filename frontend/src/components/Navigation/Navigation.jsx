import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import ProfileButton from "../ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar flex-container">
      <ul className="nav-list-container flex-container">
        <li>
          <NavLink to="/">{<Logo />}</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
