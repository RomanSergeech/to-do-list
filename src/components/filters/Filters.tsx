import { classNames } from '@/shared/utils'
import { useTasksStore } from '@/shared/store/tasks'
import { Checkbox } from '@/shared/UI'

import type { TSort } from '@/shared/store/tasks'

import c from './filters.module.scss'

type TFilterElemnts = {
  key: keyof TSort
  text: string
}

// Для удобства вынес элементы фильтров в переменную
const FILTER_ELEMENTS: TFilterElemnts[] = [
  { key: 'done', text: 'Завершенные' },
  { key: 'undone', text: 'Незавершенные' },
  { key: 'date', text: 'Сортировать по дате завершения' }
]

const Filters = () => {

  const sort = useTasksStore(state => state.sort)

  return (
    <div className={classNames('block', c.filters)} >
      
      <h3 className='block_title' >Фильтры</h3>

      <div className={c.filters_wrapper} >
        {FILTER_ELEMENTS.map(elem => (
          <FilterElement key={elem.key} elem={elem} checked={sort[elem.key]} />
        ))}
      </div>

    </div>
  )
}

interface FilterElementProps {
  elem: TFilterElemnts
  checked: boolean
}
const FilterElement = ({ elem, checked }: FilterElementProps) => {

  const checkHandler = () => {
    useTasksStore.getState().changeSort(elem.key, !checked)
  }

  return (
    <div className={c.check_wrapper} >
      <Checkbox checked={checked} onChange={checkHandler} />
      <p>{elem.text}</p>
    </div>
  )
}

export { Filters }