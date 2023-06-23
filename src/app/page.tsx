"use client";
import React, {useState, useEffect} from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddTask from "@/components/AddTask";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types/Task";
import shortid from "shortid";

const initialStateTask = () => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("tasks")
    if (tasks !== null) {
      return JSON.parse(tasks)
    } else {
      return [
        {
          id: "PPBqWA1",
          name: "Test task incomplete",
          complete: false,
          remove: false
        },
        {
          id: "PPBqWA2",
          name: "Test task complete",
          complete: true,
          remove: false
        }
      ]
    }
  }
  return []
}

export default function Home(): React.JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(initialStateTask)
  const [filter, setFilter] = useState<boolean | null>(null)
  const [filterTasks, setFilterTasks] = useState<Task[]>([])
  const [isMounted, setItMounted] = useState<boolean>(false)

  useEffect(() => {
    setItMounted(true)
  },[])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    filterTask(filter)
  },[tasks])

  const handlerAdd = (task: string) => {
    const newTask: Task = {
      id: shortid.generate(),
      name:task,
      complete: false,
      remove: false      
    }
    setTasks([...tasks, newTask])
  }

  const handlerRemove = (id: string) => {
    const updateTasks = tasks.filter(task => task.id !== id)
    setTasks(updateTasks)
  }

  const removeAll = () => {
    const updateTasks = tasks.filter(task => !task.complete)
    setTasks(updateTasks)
  }

  const filterTask = (filter: boolean | null) => {
    setFilter(filter)
    if (filter === null) {
      setFilterTasks(tasks)
      return
    }
    const updateTasks = tasks.filter(task => task.complete === filter && task )
    if (updateTasks.length === 0) {
      setFilter(null)
      setFilterTasks(tasks)
      return
    }
    setFilterTasks(updateTasks)
  }

  const handlerEdit = (id: string) => {
    const updateTasks = tasks.map(task => task.id === id ? {...task, complete: !task.complete} : task)
    setTasks(updateTasks)
  }

  const handlerOrder = (param: DropResult) => {
    const Isrc = param.source.index;
    const Idst = param.destination?.index === undefined  ? Isrc : param.destination.index

    if (filter === null) {
      changePosition(Isrc, Idst)
    } else {
      const OrigenId = filterTasks[Isrc].id
      const DestinoId = filterTasks[Idst].id
      const RealIsrc = getIndexById(OrigenId, tasks)
      const RealIdst = getIndexById(DestinoId, tasks)
      changePosition(RealIsrc, RealIdst)
    }
  }

  const changePosition = (index1: number, index2: number) => {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index1];
      updatedTasks[index1] = updatedTasks[index2];
      updatedTasks[index2] = temp;
      setTasks(updatedTasks);
  }

  function getIndexById(id: string, obj: Task[]): number {
    return obj.findIndex(item => item.id === id);
  }

  if(!isMounted) return <p>loading...</p>

  return (
    <main>
      <AddTask handlerTask={handlerAdd} />
     <DragDropContext 
     onDragEnd={(param) => handlerOrder(param)}>
         <Droppable droppableId="droppable-1">
         {(provided, _) => (
           <div className="bg-white rounded items-center shadow-md dark:bg-gray-800 dark:shadow-none mt-4 pt-4"
           ref={provided.innerRef}
           {...provided.droppableProps}
           >
               {tasks?.length > 0 ? (
                  filterTasks.map((task, index) => (
                     task.remove !== true && (
                       <Draggable 
                      key={`draggable-${task.id}`}
                      draggableId={`draggable-${task.id}`}
                      index={index}
                      >
                       {(provided, snapshot) => (
                         <div 
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={{
                           ...provided.draggableProps?.style,
                           boxShadow: snapshot.isDragging ? "0 0 .5rem #666" : "none"}}
                           key={index}
                         >
                           <TaskCard
                             key={index}
                             task={task}
                             handlerEdit={handlerEdit}
                             handlerRemove={handlerRemove}
                           />
                         </div>                        
                       )}                         
                      </Draggable>
                   )))
               ) : (
                 <div className="text-center p-2 mx-2 my-6"> you have'nt tasks, go outside and touch some grass...</div>
               )}
               {provided.placeholder}
             </div>
             )}
           </Droppable>
     </DragDropContext>
      <article className='flex flex-wrap bg-white p-4 justify-between rounded items-center shadow-md text-gray-500 dark:text-gray-500 dark:bg-gray-800 dark:shadow-none'>
        <p>{tasks?.filter(task => task.complete === false && task.remove === false).length} item{tasks?.filter(task => task.complete === false && task.remove === false).length > 1 ? 's' : ''} left</p>
        <button onClick={() => removeAll()}>Clear Complete</button>
      </article>
      <div className="flex flex-wrap mb-2 md:mx-auto md:w-1/2 md:bg-transparent md:dark:bg-transparent text-gray-500 dark:text-gray-500 md:relative md:top-[-73px] bg-white p-4 justify-center space-x-2 rounded my-4 items-center md:shadow-none shadow-md dark:bg-gray-800 dark:shadow-none">
        <button onClick={() => filterTask(null)} className={`${filter === null ? 'dark:text-blue-800 text-cyan-950 font-bold' : ''}`} >All</button>
        <button onClick={() => filterTask(false)} className={`${filter === false ? 'dark:text-blue-800 text-cyan-950 font-bold' : ''}`} >Active</button>
        <button onClick={() => filterTask(true)} className={`${filter === true ? 'dark:text-blue-800 text-cyan-950 font-bold' : ''}`} >Completed</button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-center dark:text-gray-500">Drag and drop to reorder list</p>
      </div>
    </main>
  )
}
