import React, { useState, useEffect } from "react";
import "./paginationRepo.css";

export const PaginationRepo = ({ reposPerPage, totalRepos, paginate, pages=10 }) => {
  const pageNumbers = [];
  // Math.ceil(totalRepos / reposPerPage)
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const [currentBtn, setCurrentBtn] = useState(1);
  const [arrOfCurrentBtns, setArrOfCurrentBtns] = useState([]);

  useEffect(() => {
    let tempPageNumbers = [...pageNumbers];

    let dotsInitial = "...";
    let dotsLeft = "...";
    let dotsRight = "...";

    if (currentBtn >= 1 && currentBtn <= 3) {
      tempPageNumbers = [1, 2, 3, 4, dotsInitial, pageNumbers.length];
    } else if (currentBtn === 4) {
      const sliced = pageNumbers.slice(0, 5);
      tempPageNumbers = [...sliced, dotsInitial, pageNumbers.length];
    } else if (currentBtn > 3 && currentBtn < pageNumbers.length - 2) {
      const sliced1 = pageNumbers.slice(currentBtn - 2, currentBtn);
      const sliced2 = pageNumbers.slice(currentBtn, currentBtn + 1);
      tempPageNumbers = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        pageNumbers.length,
      ];
    } else if (currentBtn === dotsInitial) {
      setCurrentBtn(arrOfCurrentBtns[arrOfCurrentBtns.length - 3] + 1);
    }
    setArrOfCurrentBtns(tempPageNumbers);
  }, [currentBtn]);

  return (
    <div className="pagination-container">
      {arrOfCurrentBtns.slice(0, 1).map((number, index) => (
        <div onClick={() => paginate((number) => (number === 1 ? number : number - 1))}>
          <a
            href="!#"
            className={`${currentBtn === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentBtn((prev) => (prev === 1 ? prev : prev - 1))}
          >
            &lt;
          </a>
        </div>
      ))}
      {arrOfCurrentBtns.map((number, index) => (
        <div key={index} onClick={() => paginate(number)}>
          <a
            key={index}
            href="!#"
            className={currentBtn === number ? "active" : "#F9F9F9"}
            onClick={() => setCurrentBtn(number)}
          >
            {number}
          </a>
        </div>
      ))}
      {arrOfCurrentBtns.slice(0, 1).map((number, index) => (
        <div onClick={() => paginate((number) => (number === pageNumbers.length ? number : number + 1))}>
          <a
            href="!#"
            className={`${currentBtn === pageNumbers.length ? "disabled" : ""}`}
            onClick={() => setCurrentBtn((prev) => prev === pageNumbers.length ? prev : prev + 1)}
          >
            &gt;
          </a>
        </div>
      ))}
    </div>
  );
};
