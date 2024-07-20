import { useTasksStore } from "@/shared/store/tasks"
import type { TTask } from "@/shared/store/tasks"

export const useSortTasks = ( tasks: TTask[] ): TTask[] => {

  const sort = useTasksStore(state => state.sort)
  
  // Фильтрую сделанные и несделанные задачи и в начало кладу несделанные
  const filtered = tasks.reduce<TTask[]>((acc, task) => {
    
    if ( sort.done && task.done ) {
      acc.push(task)
    }

    if ( sort.undone && !task.done ) {
      acc.unshift(task)
    }

    return acc
  }, [])

  if ( !sort.date ) return filtered

  // Сортировка по дате загрузки
  const sorted = filtered.sort((a, b) => {
    
    if ( a.date > b.date ) {
      return 1
    }
    
    if ( a.date < b.date ) {
      return -1
    }

    return 0
  })

  return sorted

}