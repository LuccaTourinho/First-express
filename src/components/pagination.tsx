import React from 'react';

interface IPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {

  const startPage = Math.max(props.currentPage - 2, 1);
  const endPage = Math.min(props.currentPage + 2, props.totalPages);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className='flex w-full justify-around p-4'>
        <i 
          onClick={() => props.currentPage > 1 && props.onPageChange(1)} 
          className={`fa-solid fa-angles-left text-white ${props.currentPage === 1 ? 'text-gray-500' : 'cursor-pointer transform transition-transform duration-300 hover:scale-125'}`}></i>
        {
          pages.map(page => (
            <span
              key={page}
              className={`text-white ${page === props.currentPage ? 'font-bold text-gray-500 border-b-2 border-gray-500' : 'cursor-pointer transform transition-transform duration-300 hover:scale-125'}`}
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </span>
        ))}
        <i 
          onClick={() => props.currentPage < props.totalPages && props.onPageChange(props.totalPages)} 
          className={`fa-solid fa-angles-right text-white ${props.currentPage === props.totalPages ? 'text-gray-500' : 'cursor-pointer transform transition-transform duration-300 hover:scale-125'}`}></i>
    </div>
  );
};

export default Pagination;
