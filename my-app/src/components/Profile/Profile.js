import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { iconUserNotFound, iconFollowers, iconFollowing } from "../../assets";
import "./profile.css";
import { Repos } from '../Repos/Repos';

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
			console.log(userResponse.data);
      setError(null);
    } catch (err) {
      setError(err);
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
		description,
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
						<div className="followers-container">
							<img
								className="followers-icon"
								src={iconFollowers}
								alt="iconFollowers"
            	/>
            	<span className="followers">{followers} followers</span>
						</div>
            <div className="following-container">
							<img
								className="following-icon"
								src={iconFollowing}
								alt="iconFollowing"
							/>
							<span className="following">{following} following</span>
						</div>
          </div>
        </div>
        <div className="repos">
          <h1 className="repos-title">{reposTotal ? `Repositories(${reposTotal})` : "No repositories"}</h1>
          <Repos userName={userName} />
        </div>
      </div>
    </main>
  );
};
