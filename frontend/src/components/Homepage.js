import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./Header";

const Homepage = () => {
  const [users, setUsers] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let friends = sessionStorage.getItem("friends");

  // fetch to get the data about all the users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setIsLoaded(true);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <H2>All Housewives</H2>
        <UserDiv>
          {isLoaded &&
            users.map((user) => {
              let isFriend = false;
              if (friends && friends.includes(user._id)) {
                isFriend = true;
              }
              return (
                <FriendCard to={`/users/${user._id}`} key={user._id}>
                  <Image src={user.avatarUrl}></Image>
                  {isFriend && (
                    <Ribbon>
                      <RibbonSpan>Friend</RibbonSpan>
                    </Ribbon>
                  )}
                  <UserName>{user.name}</UserName>
                </FriendCard>
              );
            })}
        </UserDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding: 30px;
`;

const H2 = styled.h2`
  font-size: 32px;
  text-align: left;
`;

const UserDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  justify-content: space-between;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;

  &:hover {
    border: solid 4px deeppink;
  }
`;

const FriendCard = styled(Link)`
  width: fit-content;
  margin-top: 15px;
  text-align: center;
  font-family: "Arial, Helvetica", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: black;
  position: relative;
`;

const Ribbon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
  width: 100px;
  height: 100px;
  text-align: right;
`;

const RibbonSpan = styled.span`
  text-align: center;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 115px;
  display: block;
  background: deeppink;
  box-shadow: 0 0 10px 3px white;
  position: absolute;
  top: 20px;
  right: -25px;
  color: white;
  font-size: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const UserName = styled.p`
  margin-top: 4px;
`;

export default Homepage;
