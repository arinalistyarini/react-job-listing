'use-client'

import Link from 'next/link'
import CompanyLink from './CompanyLink'

export default function JobItem({ data } : { data: Record<string, any>}) {
  const time = new Date(data?.created_at).toLocaleDateString?.('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || '';

  return (
    <div className="flex items-end pb-4 pt-4">
      <div className="grow">
        <h2>
          <Link href={`/detail/${data.id}`} className='text-lg font-semibold text-indigo-600 hover:underline'>
            {data.title}
          </Link>
        </h2>
        <CompanyLink companyUrl={data.company_url} companyName={data.company} /> - <span className="font-semibold text-green-700">{data.type}</span>
      </div>
      <div className="pl-4">
        {data.location} - <span className="text-gray-400">{time}</span>
      </div>
    </div>
  )
}
