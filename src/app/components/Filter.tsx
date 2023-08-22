'use-client'

import { useEffect } from 'react';
import { useForm } from '@/hooks/useForm'

export default function Filter(
  { currentData, setData, setHasNext, page, setPage, setUseSpinner } :
  {
    currentData: Array<Record<string, any>>
    setData: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>,
    setHasNext: React.Dispatch<React.SetStateAction<boolean>>,
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setUseSpinner: React.Dispatch<React.SetStateAction<boolean>>,
  }
) {
  const { form, onChangeInput } = useForm({
    description: '',
    location: '',
    isFullTime: false,
  })

  const { description, location, isFullTime } = form;

  const inputClass = 'shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  function onSearch() {
    if (page !== 1) setPage(1)
    else fetchList()
  }

  async function fetchList() {
    setUseSpinner(true)

    const buildParams = new URLSearchParams();
    buildParams.append('page', page.toString())
    if (description) buildParams.append('description', description);
    if (location) buildParams.append('location', location);
    if (isFullTime) buildParams.append('full_time', 'true');
    const params = buildParams.toString() ? `?${buildParams.toString()}` : '';
    
    const response = await fetch(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json${params}`)
    const data = await response.json()
    const filteredData = data.filter((item: Record<string, any>) => item);

    setData(page > 1 ? [...currentData, ...filteredData] : filteredData)
    setHasNext(!data.some((item: Record<string, any>) => !item))

    setUseSpinner(false)
  }

  useEffect(() => {
    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <form className="flex items-center gap-4">
      <input
        name="description"
        className={inputClass}
        value={description}
        placeholder="Filter by description"
        onChange={onChangeInput}
      />
      <input
        name="location"
        className={inputClass}
        value={location}
        placeholder="Filter by location"
        onChange={onChangeInput}
      />
      <div className="flex items-center mr-5">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          id="isFullTime"
          name="isFullTime"
          onChange={(event) => onChangeInput(event, true)}
        />
        <label htmlFor="isFullTime" className="ml-2 text-gray-900 dark:text-gray-300">
          Full time only
        </label>
      </div>
      <button type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2" onClick={onSearch}>Search</button>
    </form>
  )
}
