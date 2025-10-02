'use client'
import LoadingLoader from '@/components/Loader'
import { poppins } from '@/components/Navbar'
import store, { AppDispatch, RootState } from '@/lib/configstore'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { loadTokensFromStorage } from './authcreateslice'
import { fetchCart } from './cartslice'
import { fetchprofile } from './profileslice'
import { fetchsetting } from './settingslice'
import { fetchuser } from './userslice'
import { isvalidtoken } from './validatels'

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const authloading = useSelector((state: RootState) => state.auth.isloading)
  const cartloading = useSelector((state: RootState) => state.cart.isloading)
  const profileloading = useSelector((state: RootState) => state.profile.isloading)
  const settingloading = useSelector((state: RootState) => state.setting.isloading)
  const userloading = useSelector((state: RootState) => state.user.isloading)
  useEffect(() => {
    const authandvalidate = () => {
      store.dispatch(loadTokensFromStorage())
      isvalidtoken()
    }
    dispatch(fetchprofile())
    dispatch(fetchsetting())
    dispatch(fetchuser())
    authandvalidate()
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(fetchCart())
    }
  }, [isAuthenticated])

  if (authloading || cartloading || profileloading || settingloading || userloading) {
    return (
      <div
        className={`h-screen w-full flex justify-center items-center gap-3 text-primary font-bold lg:font-extrabold tracking-wider text-6xl lg:text-9xl ${poppins.className}`}
      >
        <LoadingLoader />
      </div>
    )
  }
  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InnerProvider>{children}</InnerProvider>
    </Provider>
  )
}
