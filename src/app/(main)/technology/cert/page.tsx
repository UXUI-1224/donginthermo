import { getCertifications } from '@/lib/db'
import CertGrid from './CertGrid'

export default async function CertPage() {
  const certifications = await getCertifications()
  return <CertGrid certifications={certifications} />
}
