import { useState } from "react"
import DatePicker from "react-datepicker"
import { Button, Input } from "@/shared/UI"
import { Textarea } from "@/shared/UI/input/Textarea"

import type { TTask } from "@/shared/store/tasks"

import c from './taskForm.module.scss'

interface TaskFormProps {
  initialValues?: TTask
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    date: Date
  ) => void
}
const TaskForm = ({ initialValues, onSubmit }: TaskFormProps) => {

  const initialDate = initialValues?.date ? new Date(initialValues.date) : new Date()
  
  const [date, setDate] = useState<Date>(initialDate)

  const [titleValue, setTitleValue] = useState(initialValues?.title ?? '')
  const [descriptionValue, setDescriptionValue] = useState(initialValues?.description ?? '')

  const onSubmitHandler = ( e: React.FormEvent<HTMLFormElement> ) => {
    // Функция обертка для onSubmit, чтобы очистить поля ввода

    onSubmit(e, date)

    setDate(new Date())
    setTitleValue('')
    setDescriptionValue('')
  }

  return (
    <form onSubmit={onSubmitHandler} className={c.form} >

      <Input
        name="title"
        label="Заголовок"
        placeholder="Заголовок"
        required
        value={titleValue}
        onChange={e => setTitleValue(e.target.value)}
      />

      <SelectDate
        label='Дата завершения'
        date={date}
        setDate={setDate}
      />

      <Textarea
        name="description"
        label="Описание"
        placeholder="Описание"
        rows={1}
        wrapperClassName={c.textarea_wrapper}
        required
        value={descriptionValue}
        onChange={e => setDescriptionValue(e.target.value)}
      />

      <Button>Сохранить</Button>

    </form>
  )
}

interface SelectDateProps {
  label: string
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}
const SelectDate = ({ label, date, setDate }: SelectDateProps) => {

  const handleChange = ( date: any ) => {
    setDate(date)
  }

  return (
     <div className={c.select_date} >
        <p className={c.label} >{label}</p>
        <div>
           <DatePicker
              selected={date}
              onChange={handleChange}
              required
           />
           <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.58325 9.16669H8.24992V10.8334H6.58325V9.16669ZM6.58325 12.5H8.24992V14.1667H6.58325V12.5ZM9.91659 9.16669H11.5833V10.8334H9.91659V9.16669ZM9.91659 12.5H11.5833V14.1667H9.91659V12.5ZM13.2499 9.16669H14.9166V10.8334H13.2499V9.16669ZM13.2499 12.5H14.9166V14.1667H13.2499V12.5Z" fill="black"/><path d="M4.91667 18.3334H16.5833C17.5025 18.3334 18.25 17.5859 18.25 16.6667V6.66669V5.00002C18.25 4.08085 17.5025 3.33335 16.5833 3.33335H14.9167V1.66669H13.25V3.33335H8.25V1.66669H6.58333V3.33335H4.91667C3.9975 3.33335 3.25 4.08085 3.25 5.00002V6.66669V16.6667C3.25 17.5859 3.9975 18.3334 4.91667 18.3334ZM16.5833 6.66669L16.5842 16.6667H4.91667V6.66669H16.5833Z" fill="black"/></svg>
        </div>
     </div>
  )
}

export { TaskForm }