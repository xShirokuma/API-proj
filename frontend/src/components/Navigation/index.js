// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import laser from "./laser.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-ul">
      <li>
        <NavLink className="logo" exact to="/">
          <img className="logo-img" alt="logo" src={laser}></img>
          aircnc
        </NavLink>
      </li>

      {isLoaded && (
        <li className="nav-profile">
          {sessionUser && (
            <NavLink exact to="/spots/new">
              Create a New Spot
            </NavLink>
          )}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
