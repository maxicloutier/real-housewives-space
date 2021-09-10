import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const { id } = useParams();

  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // fetch to get a specific user data based on provided id
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileInfo(data.data);
        setIsLoaded(true);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      {isLoaded && (
        <ProfileDetails
          name={profileInfo.name}
          avatarUrl={profileInfo.avatarUrl}
          friends={profileInfo.friends}
        />
      )}
    </>
  );
};

export default Profile;
