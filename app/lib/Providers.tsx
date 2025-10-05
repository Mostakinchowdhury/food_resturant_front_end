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
  const dispatch = useDispatch<AppDispatch>()
  const {
    isAuthenticated,
    isloading: authloading,
    accessToken,
    refreshToken
  } = useSelector((state: RootState) => state.auth)

  const { isloading: cartloading } = useSelector((state: RootState) => state.cart)
  const { isloading: profileloading } = useSelector((state: RootState) => state.profile)
  const { isloading: settingloading } = useSelector((state: RootState) => state.setting)
  const { isloading: userloading } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(loadTokensFromStorage())
    isvalidtoken()
    dispatch(fetchprofile())
    dispatch(fetchsetting())
    dispatch(fetchuser())
  }, [dispatch, accessToken, refreshToken])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
    }
  }, [dispatch, isAuthenticated])

  const isLoading = authloading || cartloading || profileloading || settingloading || userloading

  if (isLoading) {
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
