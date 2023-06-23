import React from 'react'
import { Task } from '@/types/Task'
import TrashIcon from '@/components/icons/TrashIcon'

interface Props {
    task: Task;
    handlerEdit: (id: string) => void
    handlerRemove: (id: string) => void
}

const TaskCard = ({task, handlerEdit, handlerRemove}: Props): React.JSX.Element => {
    const {id, name, complete} = task

    const handlerCheck = () => {
        handlerEdit(id)
    }

    const handlerClick = () => {
      handlerRemove(id)
    }

  return (
    <div className='flex flex-wrap h-16 md:space-x-4 border-b border-gray-300 dark:border-gray-700 align-middle items-center justify-center md:justify-evenly'>
        <input 
        type='checkbox'
        value={id}
        checked={complete}
        className='form-checkbox md:h-5 md:w-5 rounded-full text-indigo-600'
        onChange={() => handlerCheck()}
        />
        <input
        type='text'
        value={name}
        title={name}
        readOnly
        className={`${complete && 'line-through text-gray-500 dark:text-gray-500'} md:w-[400px] bg-transparent border-none focus:ring-0 focus:border-none focus:outline-none dark:text-gray-200`}
        />
        <button
        onClick={() => handlerClick()}
        >
          <TrashIcon 
          className="fill-blue-950 dark:fill-white"
          height={25}
          />
        </button>
    </div>
  )
}

export default TaskCard