import Link from 'next/link'

export default function CompanyLink({ companyUrl, companyName } : { companyUrl: string, companyName: string }) {
  if (!companyUrl) {
    return (
      <>
        {companyName}
      </>
    )
  }

  return (
    <Link href={companyUrl} className="hover:underline" target="_blank">
      {companyName}
    </Link>
  )
}