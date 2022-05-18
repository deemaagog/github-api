import React from "react";
import {
  iconUserNotFound,
  iconFollowers,
  iconFollowing,
  iconRepoNotFound,
} from "../../assets";
import "./profile.css";
import { Repos } from "../Repos/Repos";
import { CircularProgress } from "@mui/material";
import useFetch from "../../hooks/useFetch";

export const Profile = ({ userName }) => {

  const { error, loading, data } = useFetch(userName);

  if (error) {
    return (
      <div className="not-found-section">
        <div className="not-found-container">
          <img
            className="not-found-icon"
            src={iconUserNotFound}
            alt="userNotFound"
          />
          <h1 className="not-found-description">User not found</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <CircularProgress
        size={68}
        sx={{
          color: [500],
          display: "flex",
          justifyContent: "center",
          margin: "250px auto",
        }}
      />
    );
  }

  const {
    name,
    login,
    html_url: url,
    followers,
    following,
    public_repos: reposTotal,
    avatar_url: avatarUrl,
  } = data || {};

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
                {followers <= 1000 ? (
                  <span className="followers">{followers} followers</span>
                ) : (
                  <span className="followers">
                    {(followers / 1000).toFixed(1) + "k"} followers
                  </span>
                )}
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
                  <img
                    className="repo-not-found-icon"
                    src={iconRepoNotFound}
                    alt="repoNotFound"
                  />
                  <h1 className="repo-not-found-description">
                    Repository list is empty
                  </h1>
                </div>
              )}
            </div>
            <Repos userName={userName} reposTotal={reposTotal} />
          </div>
        </div>
      )}
    </main>
  );
};
