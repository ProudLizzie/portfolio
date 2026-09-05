import type { Metadata } from 'next'
import { AdminGate } from '@/components/admin/admin-gate'

// Unlisted, password-gated admin route. Kept out of search indexes; it is not
// linked from the site navigation.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminGate />
}
