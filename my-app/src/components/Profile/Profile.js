import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { iconUserNotFound, iconFollowers, iconFollowing, iconRepoNotFound } from "../../assets";
import "./profile.css";
import { Repos } from '../Repos/Repos';
import { CircularProgress } from "@mui/material";

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
			window.setTimeout(() => { setLoading(false) }, 1000);
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      fetchUser();
    }
  }, [userName, fetchUser]);

  if (error) {
    return (
			<div className="not-found-section">
				<div className="not-found-container">
					<img className="not-found-icon" src={iconUserNotFound} alt="userNotFound"/>
					<h1 className="not-found-description">User not found</h1>
				</div>
			</div>
		)
  }

  if (loading) {
    return <CircularProgress
			size={68}
			sx={{
				color: [500],
				display: 'flex',
				justifyContent: 'center',
				margin: '250px auto'
			}}
		/>;
  }

  const {
    name,
    login,
    html_url: url,
    followers,
    following,
    public_repos: reposTotal,
		// description,
    avatar_url: avatarUrl
  } = userData;

  return (
    <main className="main">
			{loading ? (
				<CircularProgress />
			) : (
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
          <div className="repo-section">
						{reposTotal ? (
							<h1 className="repos-title">Repositories ({reposTotal})</h1>
						) : (
							<div className="repo-container">
								<img className="repo-not-found-icon" src={iconRepoNotFound} alt="repoNotFound" />
								<h1 className="repo-not-found-description">Repository list is empty</h1>
							</div>
						)}
					</div>
          <Repos userName={userName} />
        </div>
      </div>
			)}
      {/* <PaginationRepo numOfPages={numOfPages} /> */}
    </main>
  );
};
