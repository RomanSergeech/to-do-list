
export const getDate = ( num: number ) => {
  // Преобразую миллисекунды в нужный формат даты

  const date = new Date(num)
  const day = addZero(date.getDate())
  const month = addZero(date.getMonth()+1)
  const year = date.getFullYear()

  function addZero( number: number ) {
    return number > 9 ? number : '0'+number
  }

  return `${day}.${month}.${year}`
}