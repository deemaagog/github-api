import React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

export const PaginationRepo = ({ reposPerPage, totalRepos, paginate }) => {
  const pageNumbers = [];

  for (let i =1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // <Stack spacing={2}>
    //   <Pagination
    //     shape="rounded"
    //     count={totalPages}
    //     page={page}
    //     onChange={(e) => handlePageChange(e.target.textContent)}
    //     color='primary'
    //   />
    // </Stack>
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
