import React, { useState } from 'react';
import { Task } from '../interface';
import { useTaskContext } from '../context/task';
import Update from './update';

interface IToDoProps {
  task: Task;
}

const ToDo: React.FunctionComponent<IToDoProps> = (props) => {
  const { removeTask, editTask } = useTaskContext();
  const [ showUpdatePopup, setShowUpdatePopup ] = useState<boolean>(false);

  const handleDelete = async () => {
    await removeTask(props.task.id);
  };

  const handleEdit = async () => {
    setShowUpdatePopup(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // O método getMonth() retorna o mês (0-11) para a data especificada, onde 0 representa janeiro e 11 representa dezembro.
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    /* 
      Combina o mês, dia e ano em uma string formatada no padrão MM/DD/YYYY. Os métodos toString() e padStart(2, '0') 
      são usados para garantir que tanto o mês quanto o dia sejam representados com dois dígitos, adicionando um zero 
      à esquerda, se necessário. Isso é útil para garantir que números de um dígito sejam apresentados de forma consistente 
      (por exemplo, 3 se torna 03).
    */
  };

  return (
    <div className='flex justify-between w-full border-2 border-white bg-black text-white rounded-lg px-2 py-1'>
      <div className='flex flex-row w-full justify-between items-center'>
        <div>
          <p className='text-white'>{props.task.nm_task}</p>
        </div>
        <div>
          <p className='text-white'>{formatDate(props.task.dt_task)}</p>
        </div>
      </div>
      <div className='flex justify-between gap-2 items-center px-2'>
        <div onClick={handleEdit} className='hover:cursor-pointer border-1 border-blue-600 hover:border-blue-300'>
          <i className="fa-regular fa-pen-to-square text-blue-600 hover:text-blue-300"></i>
        </div>
        <div onClick={handleDelete} className='hover:cursor-pointer border-1 border-red-600 hover:border-red-300'>
          <i className="fa-solid fa-trash-can text-red-600 hover:text-red-300"></i>
        </div>
      </div>
      {
        showUpdatePopup && (
          <Update task={props.task} onClose={() => setShowUpdatePopup(false)} />
        )
      }
    </div>
  );
};

export default ToDo;
