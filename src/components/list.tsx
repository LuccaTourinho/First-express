import React, { useState } from 'react';
import Pagination from './pagination';
import { useTaskContext } from '../context/task';
import ToDo from './todo';

const ITEMS_PER_PAGE = 10;

interface IListProps {
}

const List: React.FunctionComponent<IListProps> = (props) => {
  const { tasks } = useTaskContext();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  const currentTasks = tasks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className='flex flex-col w-[500px] h-full p-2'>
        <div className='flex flex-col gap-1 p-1 w-full h-full'>
          {
            currentTasks.map(task => (
              <ToDo key={task.id} task={task} />
            ))
          }
        </div>
        <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} totalPages={totalPages}/>
    </div>
  );
};

export default List;
