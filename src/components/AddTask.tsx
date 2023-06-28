import React, { useState } from "react"
import PlusIcon from "@/components/icons/PlusIcon"

interface Props {
    handlerTask: (task: string) => void;
  };

const AddTask = ({handlerTask}: Props): React.JSX.Element => {
    const [task, setTask] = useState<string>('');

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handlerTask(task);
        setTask('')
    }

  return (
    <form 
    id="FormAddTask"
    onSubmit={handlerSubmit}
    className='flex flex-wrap bg-white p-4 rounded-xl items-center mb-6 space-x-2 shadow-md dark:bg-gray-800 dark:shadow-none'>
          <input
            name="task"
            type='text'
            onChange={(e) => setTask(e.currentTarget.value)}
            value={task}
            className='flex-1 h-8 p-2 rounded-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:placeholder:text-gray-400'
            placeholder='Create a new todo...' />
          <button>
            <PlusIcon 
            className="fill-green-500 dark:fill-white"
            height={25}
            />
          </button>

    </form>
  )
}

export default AddTask