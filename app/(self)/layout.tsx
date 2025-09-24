'use client'
import LoadingLoader from '@/components/Loader'
import { RootState } from '@/lib/configstore'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()
  const authloading = useSelector((state: RootState) => state.auth.isloading)
  useEffect(() => {
    // wait 1 cycle so redux can update tokens
    if (!authenticated) {
      router.push('/sign')
    }
  }, [authenticated, router])
  if (authloading) {
    return (
      <div className="w-[1vw] h-[1vh] fixed flex justify-between items-center text-primary">
        <LoadingLoader />
      </div>
    )
  }
  return <>{children}</>
}
