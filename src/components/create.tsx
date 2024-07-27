import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTaskContext } from "../context/task";

const taskSchema = z.object({
  nm_task: z.string().min(1, { message: "Task is required" }).max(30, { message: "Task must be less than 30 characters" }),
  dt_task: z.string().min(1, { message: "Date is required" }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface ICreateProps {}

const Create: React.FunctionComponent<ICreateProps> = (props) => {
  const { addTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormValues) => {
    await addTask(data);
    reset();
  };

  return (
  <div className="flex bg-slate-200 w-[300px] h-[230px] justify-center items-center rounded-xl">
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-4'>
        <div className='flex flex-col gap-1 p-1'>
          <div className='flex bg-white border-2 border-black rounded-xl p-1'>
            <label>Task: </label>
            <input type='text' max={30} {...register('nm_task')} className='text-black hover:cursor-pointer focus:outline-none pl-1'/>
          </div>
          {errors.nm_task && <p className='text-red-500'>{errors.nm_task.message}</p>}
        </div>
        <div className='flex flex-col gap-1 p-1'>
          <div className='flex bg-white border-2 border-black rounded-xl p-1'>
            <label>Date: </label>
            <input type='date' {...register('dt_task')} className='text-black w-full hover:cursor-pointer focus:outline-none pl-1'/>
          </div>
          {errors.dt_task && <p className='text-red-500'>{errors.dt_task.message}</p>}
        </div>
        <button type='submit' className='bg-black rounded-3xl text-white p-1 transform transition-transform duration-300 hover:scale-110'>Add Task</button>
      </form>   
  </div>

  );
};

export default Create;
