import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import * as sessionActions from "../../store/session";
import OpenModalController from "../OpenModalController";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUserThunk());
    setShowMenu(false);
    navigate("/");
  };

  const ulClassName =
    "profile-dropdown" +
    (showMenu && user ? " flex-container col" : showMenu ? "" : " hidden");

  return (
    <>
      <button className="oval-button" onClick={toggleMenu}>
        <MdMenu />
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              <ul>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                <li
                  className="manage-options-redirect"
                  onClick={(e) => {
                    toggleMenu(e);
                    navigate("/spots/current");
                  }}
                >
                  Manage Spots
                </li>
                <li
                  className="manage-options-redirect"
                  onClick={(e) => {
                    toggleMenu(e);
                    navigate("/reviews/current");
                  }}
                >
                  Manage Reviews
                </li>
              </ul>
            </li>
            <li>
              <button className="oval-button logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalController
              controllerText="Sign Up"
              elementName="li"
              onButtonClick={() => {
                setShowMenu(false);
              }}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalController
              controllerText="Log In"
              elementName="li"
              onButtonClick={() => {
                setShowMenu(false);
              }}
              modalComponent={<LoginFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
