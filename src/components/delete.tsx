import React from 'react';

interface IDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const Delete: React.FunctionComponent<IDeleteProps> = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center justify-center bg-slate-200 w-[300px] h-[150px] rounded-xl p-4">
        <p className="mb-4 text-center text-black">Are you sure you want to delete this task?</p>
        <div className="flex gap-4">
          <button onClick={props.onConfirm} className="bg-red-600 text-white rounded-3xl p-2 transform transition-transform duration-300 hover:scale-110">Delete</button>
          <button onClick={props.onCancel} className="bg-gray-600 text-white rounded-3xl p-2 transform transition-transform duration-300 hover:scale-110">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
