'use client'
import LoadingLoader from '@/components/Loader'
import { RootState } from '@/lib/configstore'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()
  const authloading = useSelector((state: RootState) => state.auth.isloading)
  const [selfload, setselfload] = useState<boolean>(true)
  useEffect(() => {
    // wait 1 cycle so redux can update tokens
    if (!authenticated && !authloading) {
      router.push('/sign')
    } else {
      setselfload(false)
    }
  }, [authenticated, router, authloading])
  if (authloading || selfload) {
    return <LoadingLoader />
  }
  return <>{children}</>
}
