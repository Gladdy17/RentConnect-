import React from "react";
import "../styles/Header.css";
import LogoutButton from "./ButtonComponents/LogoutButton";

function Header({ User, setLoggedIn }) {
  return (
    <header className="header">
      <div className="header_logo">
        <h1 className="header_title_Primary">Rent</h1>
        <h1 className="header_title_Secondary">Connect</h1>
        {User && (
          <>
            <h2>
              {User.first_name} {User.last_name}
            </h2>
            <LogoutButton setLoggedIn={setLoggedIn} />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
