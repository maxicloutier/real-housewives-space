import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";

const ProfileDetails = ({ friends, avatarUrl, name }) => {
  const [users, setUsers] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        <BannerImg src={"/images/profile-bg.jpg"} alt="Mansion" />
        <ProfileDiv>
          <PicNameDiv>
            <ProfileImg src={avatarUrl} alt="Profile Picture" />
            <Name>{name}</Name>
          </PicNameDiv>
          <FriendsTitle>{name}'s Friends</FriendsTitle>
          <FriendsDiv>
            {isLoaded &&
              users.map((user) => {
                for (let i = 0; i <= friends.length; i++)
                  if (friends[i] === user._id) {
                    return (
                      <OneFriendDiv key={user._id}>
                        <FriendAvatar src={user.avatarUrl} />
                        <FriendName>{user.name}</FriendName>
                      </OneFriendDiv>
                    );
                  }
              })}
          </FriendsDiv>
        </ProfileDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const ProfileDiv = styled.div`
  width: 1200px;
  padding: 20px;
  position: absolute;
  top: 36vh;
`;

const ProfileImg = styled.img`
  height: 250px;
  width: 250px;
  border: white 3px solid;
`;

const BannerImg = styled.img`
  object-fit: cover;
  width: 100vw;
`;

const PicNameDiv = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const Name = styled.h2`
  font-size: 45px;
  margin-left: 50px;
  margin-top: 200px;
`;

const FriendsTitle = styled.h3`
  margin-top: 30px;
  font-size: 24px;
  border-bottom: solid 2px deeppink;
  padding-bottom: 5px;
`;

const FriendAvatar = styled.img`
  width: 175px;
  height: 175px;
  padding: 2px;
`;

const FriendName = styled.p`
  margin-bottom: 20px;
  margin-top: 4px;
`;

const FriendsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 0fr);
`;

const OneFriendDiv = styled.div`
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 40px;
  margin-right: 20px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: black;
`;

export default ProfileDetails;
