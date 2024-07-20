import { useEffect } from 'react'
import { classNames } from '@/shared/utils'
import { CreateTask, Filters, TasksList } from '@/components'
import { useTasksStore } from '@/shared/store/tasks'

import '@/shared/assets/styles/style.scss'

const App = () => {

  useEffect(() => {
    useTasksStore.getState().getTasks()
  }, [])

  return (
    <div className={classNames('page_body', '_container')} >

      <h1 className='title' >To Do List</h1>

      <CreateTask />

      <Filters />

      <TasksList />

    </div>
  )
}

export default App