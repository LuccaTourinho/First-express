import React from 'react';
import Pagination from './pagination';
import { useTaskContext } from '../context/task';
import ToDo from './todo';


interface IListProps {
}

const List: React.FunctionComponent<IListProps> = (props) => {
  const { tasks } = useTaskContext();

  return (
    <div className='flex flex-col w-[500px] h-full p-2'>
        <div className='flex flex-col gap-1 p-1 w-full h-full'>
          {
            tasks.map(task => (
              <ToDo key={task.id} task={task} />
            ))
          }
        </div>
        <Pagination/>
    </div>
  );
};

export default List;
