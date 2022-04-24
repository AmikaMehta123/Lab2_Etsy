import React from 'react';

const PaginationNums = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <p onClick={() => paginate(number)} href='' className='page-link'>
              {number}
            </p>
          </li>
        ))}
      </ul></nav>
  );
};

export default PaginationNums;