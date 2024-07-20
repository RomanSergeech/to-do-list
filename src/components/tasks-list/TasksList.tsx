import { useState } from "react"
import { getDate } from "./utils"
import { TaskForm } from "../task-form/TaskForm"
import { classNames } from "@/shared/utils"
import { useTasksStore } from "@/shared/store/tasks"
import { useSortTasks } from "./hooks"

import type { TTask } from "@/shared/store/tasks"

import c from './tasksList.module.scss'

const TasksList = () => {

  const tasksStore = useTasksStore(state => state.tasks)

  const tasks = useSortTasks(tasksStore)

  return (
    <div className={classNames('block', c.tasks_list)} >
      
      <h3 className='block_title' >Задачи</h3>

      <div className={c.tasks_wrapper} >
        {tasks?.map(task => (
          <div key={task.id} className={classNames(task.done ? c._done : '', task?.removed ? c._hide : '')} >
            <p className={c.title} >{task.title}</p>
            <p className={c.date} >Дедлайн: {getDate(task.date)}</p>
            <p className={c.description} >{task.description}</p>
            <div className={c.btns} >
              <CompleteTaskButton task={task} />
              { !task.done && <EditTaskButton task={task} />}
              <DeleteTaskButton taskId={task.id} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

interface CompleteTaskButtonProps {
  task: TTask
}
const CompleteTaskButton = ({ task }: CompleteTaskButtonProps) => {

  const completeHandler = () => {
    useTasksStore.getState().completeTask(task.id, !task.done)
  }

  return (
    <button
      className={classNames(c.complete_button, task.done ? c._active : '')}
      onClick={completeHandler}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.57181 10.5548L2.37339 7.35639L1 8.72978L5.57181 13.3016L15 3.87339L13.6266 2.5L5.57181 10.5548Z" fill="#0D0D0D"/></svg>
    </button>
  )
}

interface DeleteTaskButtonProps {
  taskId: number
}
const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {

  const [confirm, setConfirm] = useState(false)

  const deleteHandler = () => {
    useTasksStore.getState().deleteTask(taskId)
  }

  const confirmHandler = () => {
    if ( confirm ) {
      deleteHandler()
      return
    }

    setConfirm(true)

    setTimeout(() => {
      setConfirm(false)
    }, 2000)
  }

  return (
    <button className={c.delete_button} onClick={confirmHandler} >
      {confirm
        ? 'Подтвердить'
        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.33577 13.3334C3.33577 14.0687 3.93377 14.6667 4.66911 14.6667H11.3358C12.0711 14.6667 12.6691 14.0687 12.6691 13.3334V5.33337H14.0024V4.00004H11.3358V2.66671C11.3358 1.93137 10.7378 1.33337 10.0024 1.33337H6.00244C5.26711 1.33337 4.66911 1.93137 4.66911 2.66671V4.00004H2.00244V5.33337H3.33577V13.3334ZM6.00244 2.66671H10.0024V4.00004H6.00244V2.66671ZM11.3358 5.33337L11.3364 13.3334H4.66911V5.33337H11.3358Z" fill="#0D0D0D"/><path d="M6.00244 6.66671H7.33577V12H6.00244V6.66671ZM8.66911 6.66671H10.0024V12H8.66911V6.66671Z" fill="#0D0D0D"/></svg>}
    </button>
  )
}

interface EditTaskButtonProps {
  task: TTask 
}
const EditTaskButton = ({ task }: EditTaskButtonProps) => {

  const [active, setActive] = useState(false)

  const openModal = () => {
    setActive(true)
    const body = document.querySelector('body')
    if ( body ) body.style.overflow = 'hidden'
  }

  return (<>
    <button className={c.edit_button} onClick={openModal} >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.6665 11.3423L7.6085 11.3323L14.0298 4.97226C14.2818 4.72026 14.4205 4.38559 14.4205 4.02959C14.4205 3.67359 14.2818 3.33893 14.0298 3.08693L12.9725 2.02959C12.4685 1.52559 11.5892 1.52826 11.0892 2.02759L4.6665 8.38893V11.3423ZM12.0298 2.97226L13.0892 4.02759L12.0245 5.08226L10.9672 4.02559L12.0298 2.97226ZM5.99984 8.94493L10.0198 4.96293L11.0772 6.02026L7.05784 10.0009L5.99984 10.0043V8.94493Z" fill="black"/><path d="M3.33333 14H12.6667C13.402 14 14 13.402 14 12.6667V6.888L12.6667 8.22133V12.6667H5.43867C5.42133 12.6667 5.40333 12.6733 5.386 12.6733C5.364 12.6733 5.342 12.6673 5.31933 12.6667H3.33333V3.33333H7.898L9.23133 2H3.33333C2.598 2 2 2.598 2 3.33333V12.6667C2 13.402 2.598 14 3.33333 14Z" fill="#0D0D0D"/></svg>
    </button>

    {active && <Modal task={task} setActive={setActive} />}
  </>)
}

interface ModalProps {
  task: TTask
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal = ({ task, setActive }: ModalProps) => {

  const closeModal = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
     // Проверка что клик был по области вне модального окна 
     if ( e.target === e.currentTarget ) {
      closeHandler()
     }
  }

  const closeHandler = () => {
    setActive(false)
    const body = document.querySelector('body')
    if ( body ) body.style.overflow = null
  }

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement>, date: Date ) => {
    e.preventDefault()

    // Получаю обьект с элементами формы, чтобы получить значения инпутов
    const data = new FormData(e.currentTarget)

    const title = data.get('title') as string | null
    const description = data.get('description') as string | null

    useTasksStore.getState().editTask({
      id: task.id,
      title,
      description,
      date: new Date(date).getTime(),
      done: task.done
    })

    closeHandler()
  }

  return (
     <div className={c.modal} onClick={closeModal} >
        <div className={classNames(c.modal_body, 'block')} >

           <span className={c.close} onClick={closeHandler} ></span>

           <p className='title' >Campaign</p>

           <TaskForm initialValues={task} onSubmit={onSubmit} />

        </div>
     </div>
  )
}

export { TasksList }