import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./repos.css";
import { PaginationRepo } from "../Pagination/PaginationRepo";

export const Repos = ({ userName }) => {
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(4);

  const fetchRepos = useCallback(async () => {
    try {
      const reposResponse = await axios(
        `https://api.github.com/users/${userName}/repos`
      );
      setRepos(reposResponse.data);
      setError(null);
    } catch (err) {
      setError(err);
    }
  }, [userName]);

  useEffect(() => {
    if (userName) {
      fetchRepos();
    }
  }, [userName, fetchRepos]);

  if (error) {
    return <h1>Repository list is empty</h1>;
  }

  const lastRepo = currentPage * reposPerPage;
  const firstRepo = lastRepo - reposPerPage;
  const currentRepos = repos.slice(firstRepo, lastRepo);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
  };

  return (
    <div>
      <ul className="repo-list">
        {currentRepos.map((repo) => (
          <>
            <li className="repo-item" key={repo.id}>
              <a className="repo-link" href={repo.html_url}>
                {repo.name}
              </a>
              <span className="repo-description">{repo.description}</span>
            </li>
          </>
        ))}
      </ul>
      <PaginationRepo
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </div>
  );
};
