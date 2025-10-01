import { loginSuccess, logout, toogleauthenticate, toogleauthloading } from './authcreateslice'
import store from './configstore'

export async function isvalidtoken() {
  const { accessToken, refreshToken } = store.getState().auth
  if (!(accessToken && refreshToken)) {
    console.log('logout from accessToken && refreshToken')
    store.dispatch(logout())
    store.dispatch(toogleauthloading(false))
    return
  }
  try {
    // Verify access token
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/token/verify/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessToken })
    })

    if (response.ok) {
      store.dispatch(toogleauthenticate(true))
      store.dispatch(toogleauthloading(false))
      return true
    } // access token valid

    // Access token invalid → try refresh token
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/token/refresh/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken })
      }
    )
    if (!refreshResponse.ok) {
      console.log('logout from !refreshResponse.ok')
      store.dispatch(logout())
      store.dispatch(toogleauthloading(false))
      return false
    }

    const resdata = await refreshResponse.json()
    store.dispatch(loginSuccess({ accessToken: resdata.access, refreshToken }))
    store.dispatch(toogleauthenticate(true))
    store.dispatch(toogleauthloading(false))
    return true
  } catch {
    console.log('logout from catch')
    store.dispatch(logout())
    store.dispatch(toogleauthloading(false))
    return false
  }
}
