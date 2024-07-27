import React from 'react';

interface IPaginationProps {
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  return (
    <div className='flex w-full justify-around p-4'>
        <i className="fa-solid fa-angles-left text-white"></i>
        <i className="fa-solid fa-angle-left text-white"></i>
        <i className="fa-solid fa-angle-right text-white"></i>
        <i className="fa-solid fa-angles-right text-white"></i>
    </div>
  );
};

export default Pagination;
