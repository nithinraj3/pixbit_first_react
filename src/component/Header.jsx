import React from "react";
import AuthNavBar from "./AuthNavBar";
import UserNavBar from "./UserNavBar";

const Header = (props) => {
  const user = props.user;

  return <>{user ? <UserNavBar /> : <AuthNavBar />}</>;
};

export default Header;
