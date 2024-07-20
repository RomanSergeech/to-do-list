import { create } from "zustand"
import { devtools } from 'zustand/middleware'


const TASKS: TTask[] = [
  { id: 1, title: 'Задача 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, est accusamus? Voluptatibus facere ex quasi incidunt magni quod quia labore sint harum fugiat dolore atque dignissimos error veritatis, eaque consequatur.', done: false, date: 1721483024264 },
  { id: 2, title: 'Сделать задачу 1', description: 'Maxime, est accusamus?', done: false, date: 1721593024264 },
  { id: 3, title: 'Задача 2', description: 'Voluptatibus facere ex quasi incidunt magni quod quia labore sint harum fugiat dolore atque dignissimos error veritatis, eaque consequatur.', done: false, date: 1721893024264 },
  { id: 4, title: 'Задача 3', description: 'Dolore atque dignissimos error veritatis, eaque consequatur.', done: true, date: 1721493024264 },
  { id: 5, title: 'Задача 4', description: 'Dignissimos error veritatis, eaque consequatur.', done: true, date: 1721293024264 },
]


export type TTask = {
  id: number
  title: string
  description: string
  date: number
  done: boolean
  removed?: true
}

export type TSort = {
  done: boolean
  undone: boolean
  date: boolean
}


interface TTasksState {
  tasks: TTask[]
  sort: TSort
}

interface TTasksStore extends TTasksState {
  getTasks: () => void
  addTask: ( task: TTask ) => void
  deleteTask: ( taskId: TTask['id'] ) => void
  editTask: ( task: TTask ) => void
  completeTask: ( taskId: TTask['id'], done: boolean ) => void
  changeSort: ( key: keyof TSort, value: boolean ) => void
}

const initialState: TTasksState = {
  tasks: TASKS,
  sort: {
    done: true,
    undone: true,
    date: false
  }
}

export const useTasksStore = create(
	devtools<TTasksStore>((set, get) => ({
		...initialState,

		getTasks: () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) as TTask[] | null
      if ( !tasks ) return
      set({ tasks })
    },

		addTask: ( task ) => {
      const tasks = [...get().tasks]
      tasks.push(task)

      localStorage.setItem('tasks', JSON.stringify(tasks))

      set({ tasks })
    },

		deleteTask: ( taskId ) => {

      const tasks = get().tasks.reduce<TTask[]>((acc, el) => {
        if ( el.id === taskId ) el.removed = true
        acc.push(el)
        return acc
      }, [])

      setTimeout(() => {
        const tasks = get().tasks.filter(task => task.id !== taskId)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        set({ tasks })
      }, 800)

      set({ tasks })
    },

		completeTask: ( taskId, done ) => {
      const tasks = get().tasks.reduce<TTask[]>((acc, el) => {
        if ( el.id === taskId ) el.done = done
        acc.push(el)
        return acc
      }, [])

      localStorage.setItem('tasks', JSON.stringify(tasks))

      set({ tasks })
    },

		editTask: ( task ) => {
      const tasks = get().tasks.reduce<TTask[]>((acc, el) => {
        if ( el.id === task.id ) {
          acc.push(task)
        } else {
          acc.push(el)
        }
        return acc
      }, [])

      localStorage.setItem('tasks', JSON.stringify(tasks))

      set({ tasks })
    },

    changeSort: ( key, value ) => {
      const sort = get().sort
      sort[key] = value
      set({ sort: {...sort} })
    }

	}))
)