'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
// @ts-ignore
import CompanyLink from '@/app/components/CompanyLink'
// @ts-ignore
import Spinner from '@/app/components/Spinner'


export default function Detail({ params }) {
  const id = params.id
  const [data, setData] = useState({} as Record<string, any>)
  const [useSpinner, setUseSpinner] = useState(true)

  async function fetchDetail() {
    if (id) {
      setUseSpinner(true)
      const response = await fetch(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`)
      const result = await response.json()
      setData(result)
      setUseSpinner(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CompanyImage = () => {
    if (!data.company_logo) return null

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="w-[150px] mt-4 border-2" src={data.company_logo} alt={data.company} />
    )
  }

  const ApplyLink = () => {
    if (!data.url) return null

    return (
      <Link href={data.url} target="_blank" className='text-indigo-600 hover:underline'>
        Apply here
      </Link>
    )
  }

  return (
    <main>
      <div className="max-w-[1000px] pt-8 px-4 mx-auto">
        <Spinner isShown={useSpinner} />
        { useSpinner
          ? null
          : <>
            <Link href="/" className='text-indigo-600 hover:underline'>
              &lt; Back to list
            </Link>
            <div className="mt-8">
              <div className="flex">
                <div className="w-[calc(100%-200px)] pr-8">
                  <section>
                    <div className="text-grey-500 mb-5">
                      {data.type} / {data.location}
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4">
                      {data.title}
                    </h2>
                  </section>
                  <div className="divide-y">
                    <section className="pt-6 pb-6 mt-6">
                      <h3 className="text-xl font-extrabold mb-4">
                        Description
                      </h3>
                      <div dangerouslySetInnerHTML={{__html: data.description}} />
                    </section>
                    <section className="pt-6 pb-6 mt-6">
                      <h3 className="text-xl font-extrabold mb-4">
                        How to Apply
                      </h3>
                      <div dangerouslySetInnerHTML={{__html: data.how_to_apply}} />
                    </section>
                  </div>
                </div>
                <div className="w-[200px]">
                  <CompanyLink companyUrl={data.company_url} companyName={data.company} />
                  <CompanyImage />
                  <ApplyLink />
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </main>
  )
}
