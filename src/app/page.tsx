'use client'

import { useState } from 'react'
import Filter from './components/Filter'
import JobItem from './components/JobItem'
import Spinner from './components/Spinner'

export default function Home() {
  const [data, setData] = useState([] as Array<Record<string, any>>);
  const [hasNext, setHasNext] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [useSpinner, setUseSpinner] = useState(true)

  function nextPage() {
    setCurrentPage(currentPage + 1)
  }

  const MoreJobsButton = () => {
    if (!hasNext || useSpinner) return null

    return (
      <div className="mt-6">
        <button type="button" className="w-full text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2" onClick={nextPage}>More jobs</button>
      </div>
    )
  }

  return (
    <main>
      <div className="max-w-[1000px] pt-8 px-4 mx-auto">
        <Filter
          currentData={data}
          setData={setData}
          setHasNext={setHasNext}
          page={currentPage}
          setPage={setCurrentPage}
          setUseSpinner={setUseSpinner}
        />

        <div className="mt-6">
          <h2 className="text-4xl font-extrabold mb-4">Job list</h2>
          <div className="divide-y">
            {
              (currentPage === 1 && useSpinner)
                ? null
                : data.map((item, index) => <JobItem data={item} key={index} />)
            }
          </div>
          <div className="mb-4">
            <MoreJobsButton />
          </div>
          <Spinner isShown={useSpinner} />
        </div>
      </div>
    </main>
  )
}
