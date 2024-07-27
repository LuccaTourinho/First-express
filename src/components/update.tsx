import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTaskContext } from "../context/task";
import { Task } from '../interface';


const taskSchema = z.object({
  nm_task: z.string().min(1, { message: 'Task is required' }).max(30, { message: 'Task must be less than 30 characters' }),
  dt_task: z.string().min(1, { message: 'Date is required' }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface IUpdateProps {
  task: Task; 
  onClose: () => void; 
}


const Update: React.FunctionComponent<IUpdateProps> = (props) => {
  const { editTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      nm_task: props.task.nm_task,
      dt_task: props.task.dt_task,
    },
  });

  useEffect(() => {
    reset({
      nm_task: props.task.nm_task,
      dt_task: props.task.dt_task,
    });
  }, [props.task, reset]);

  const onSubmit = async (data: TaskFormValues) => {
    await editTask(props.task.id, data);
    props.onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative flex items-center justify-center bg-slate-200 w-[300px] h-[230px] rounded-xl p-4">
        <button onClick={props.onClose} className="absolute top-2 right-4 text-black hover:cursor-pointer">
          <i className="fa-solid fa-x transform transition-transform duration-300 hover:scale-125"></i>
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex bg-white border-2 border-black rounded-xl p-1">
              <label>Task: </label>
              <input type="text" maxLength={30} {...register('nm_task')} className="text-black w-full hover:cursor-pointer focus:outline-none pl-1" />
            </div>
            {errors.nm_task && <p className="text-red-500">{errors.nm_task.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex bg-white border-2 border-black rounded-xl p-1">
              <label>Date: </label>
              <input type="date" {...register('dt_task')} className="text-black w-full hover:cursor-pointer focus:outline-none pl-1" />
            </div>
            {errors.dt_task && <p className="text-red-500">{errors.dt_task.message}</p>}
          </div>
          <button type="submit" className="bg-black rounded-3xl text-white p-1 transform transition-transform duration-300 hover:scale-110">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
