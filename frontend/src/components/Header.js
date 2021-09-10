import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  // check sessionStorage to see if a user is already signed in
  let user = sessionStorage.getItem("user");

  return (
    <Wrapper>
      <TitleLink to="/" exact="true">
        Real Housewives Space
      </TitleLink>
      {/* check whether a user is already signed in to determine to display either greeting to the signed-in user or the link to sign-in page */}
      {user ? (
        <WelcomeUser>Hello, {user}</WelcomeUser>
      ) : (
        <SignInLink to="/signin">Sign In</SignInLink>
      )}
    </Wrapper>
  );
};

const TitleLink = styled(Link)`
  font-family: "Cinzel", serif;
  font-weight: bold;
  font-size: 30px;
  color: white;
  margin-left: 75px;
  margin-top: 17px;
  margin-bottom: 17px;
  text-decoration: none;
`;

const SignInLink = styled(Link)`
  color: white;
  font-size: 18px;
  margin-top: 22px;
  margin-right: 85px;
  margin-bottom: 17px;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-decoration: none;
`;

const WelcomeUser = styled.p`
  color: white;
  font-size: 18px;
  margin-top: 22px;
  margin-right: 85px;
  margin-bottom: 17px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: deeppink;
`;

export default Header;
