import RestaurantIcon from "@mui/icons-material/Restaurant";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("currentUser"));

  function handleClick() {
    setClicked(!clicked);
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const menuItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
    },
  ];

  const loggedInMenuItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
    },
    {
      title: "Statistics",
      url: "/statistics",
      cName: "nav-links",
    },
    {
      title: "Bookings",
      url: "/bookings",
      cName: "nav-links",
    },
    {
      title: "Orders",
      url: "/orders",
      cName: "nav-links",
    },
    {
      title: "Edit Menu",
      url: "/edit",
      cName: "nav-links",
    },
    {
      title: "Book a Table",
      url: "/admin-book",
      cName: "nav-links",
    },
    {
      title: "Reviews",
      url: "/reviews",
      cName: "nav-links",
    },
    {
      title: "Log Out",
      url: "/",
      cName: "nav-links-mobile",
    },
  ];

  return (
    <nav className="navbarItems">
      <h1 className="navbar-logo">
        ARMS <RestaurantIcon />{" "}
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        {clicked ? (
          <CloseIcon style={{ color: "white" }} />
        ) : (
          <MenuIcon style={{ color: "white" }}>
            <CloseIcon />
          </MenuIcon>
        )}
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {(isLoggedIn ? loggedInMenuItems : menuItems).map((item, index) => (
          <Link key={index} to={item.url} className={item.cName}>
            {item.title}
          </Link>
        ))}
      </ul>

      {isLoggedIn && (
        <Link to="/">
          <button
            onClick={handleLogout}
            className="nav-button btn btn--primary "
          >
            Log Out
          </button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
