import { classNames } from "@/shared/utils"
import { useTasksStore } from "@/shared/store/tasks"
import { TaskForm } from "../task-form/TaskForm"

import "react-datepicker/dist/react-datepicker.css";
import c from './createTask.module.scss'

const CreateTask = () => {

  const saveTask = ( e: React.FormEvent<HTMLFormElement>, date: Date ) => {
    e.preventDefault()

    // Получаю обьект с элементами формы, чтобы получить значения инпутов
    const data = new FormData(e.currentTarget)

    const title = data.get('title') as string | null
    const description = data.get('description') as string | null

    useTasksStore.getState().addTask({
      id: Date.now(),
      title,
      date: new Date(date).getTime(),
      description,
      done: false
    })
  }

  return (
    <div className={classNames('block', c.create_task)} >
      
      <h3 className='block_title' >Создать задачу</h3>

      <TaskForm onSubmit={saveTask} />

    </div>
  )
}



export { CreateTask }