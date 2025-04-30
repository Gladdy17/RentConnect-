import React from "react";
import "../styles/Header.css";
import LogoutButton from "./Button Components/LogoutButton";


function Header({ User, setLoggedIn }) {

  return (
    <header className="header">
      <div className="header_logo">
        <h1 className="header_title_Primary">Rent</h1>
        <h1 className="header_title_Secondary">Connect</h1>
      </div>
      {User && (
          <div className="logoutContainer">
            <h2 className="userName">
              {User.first_name} {User.last_name}
            </h2>
            <LogoutButton 
              setLoggedIn={setLoggedIn} />
          </div>
        )}
    </header>
  );
}

export default Header;
