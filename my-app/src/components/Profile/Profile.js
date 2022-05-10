import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { iconUserNotFound, iconFollowers, iconFollowing } from "../../assets";
import "./profile.css";

export const Profile = ({ userName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const userResponse = await axios(
        `https://api.github.com/users/${userName}`
      );
      setUserData(userResponse.data);
      setError(null);
    } catch (err) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      fetchUser();
    }
  }, [userName, fetchUser]);

  if (error) {
    return <h1>User not found</h1>;
  }

  if (loading) {
    return null;
  }

  const {
    name,
    login,
    html_url: url,
    followers,
    following,
    public_repos: reposTotal,
    avatar_url: avatarUrl,
  } = userData;

  return (
    <main className="main">
      <div className="main-container">
        <div className="user">
          <div className="avatar-container">
            <img className="avatar" src={avatarUrl} alt="avatar"></img>
          </div>
          <p className="name">{name}</p>
          <a className="username" href={url}>
            {login}
          </a>
          <div className="follow">
            <img
              className="followers-icon"
              src={iconFollowers}
              alt="iconFollowers"
            />
            <span className="followers">{followers} followers</span>
            <img
              className="following-icon"
              src={iconFollowing}
              alt="iconFollowing"
            />
            <span className="following">{following} following</span>
          </div>
        </div>
        <div className="repos">
          <h1 className="repos-title">
           </h1>
        </div>
      </div>
    </main>
  );
};
