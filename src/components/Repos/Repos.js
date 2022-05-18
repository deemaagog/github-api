import React, { useState } from "react";
import "./repos.css";
import useFetch from "../../hooks/useFetch";
import ReactPaginate from "react-paginate";


const REPOS_PER_PAGE = 4;

export const Repos = ({ userName, reposTotal }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { error, data } = useFetch(`${userName}/repos?per_page=${REPOS_PER_PAGE}&page=${currentPage}`);
  const repos = data || []

  if (error) {
    return <h1>Repository list is empty</h1>;
  }

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage + 1);
  }

  const pageCount = Math.ceil(reposTotal / REPOS_PER_PAGE);

  return (
    <>
      <ul className="repo-list">
        {repos.map((repo, i) => (
          <div key={i}>
            <li className="repo-item" key={repo.id}>
              <a className="repo-link" href={repo.html_url}>
                {repo.name}
              </a>
              <span className="repo-description">{repo.description}</span>
            </li>
          </div>
        ))}
      </ul>
      {pageCount > 1 && <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
      />}
    </>
  );
};
