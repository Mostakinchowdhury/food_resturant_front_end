'use client'
import Blurload from '@/components/Blurload'
import { poppins } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { loginSuccess } from '@/lib/authcreateslice'
import { RootState } from '@/lib/configstore'
import { isvalidtoken } from '@/lib/validatels'
import { auth_type } from '@/type/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const SignPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [formdata, setFormdata] = useState<auth_type>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  })
  const dispatch = useDispatch()
  const [error, setError] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean[]>([false, false])
  const handleShowPassword = (index: number) => {
    const updatedShowPassword = [...showPassword]
    updatedShowPassword[index] = !updatedShowPassword[index]
    setShowPassword(updatedShowPassword)
  }
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  //

  // handle submit function
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    if (!isLogin && formdata.password !== formdata.password2) {
      setError('Passwords do not match')
      toast('Passwords do not match')
      setIsLoading(false)
      return
    }
    const url = isLogin
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login/`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register/`

    const payload = isLogin
      ? {
          email: formdata.email,
          password: formdata.password
        }
      : {
          first_name: formdata.first_name,
          last_name: formdata.last_name,
          email: formdata.email,
          password: formdata.password,
          password2: formdata.password2
        }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        data = { error: 'Invalid JSON response', raw: text }
      }

      if (!response.ok) {
        setIsLoading(false)
        setError(data)
      } else {
        setSuccess(isLogin ? data.message : data)
        if (isLogin) {
          setIsLoading(false)
          dispatch(
            loginSuccess({
              accessToken: data.access,
              refreshToken: data.refresh
            })
          )
          const isvaild = await isvalidtoken()
          if (isvaild) {
            setTimeout(() => {
              router.push('/profile')
            }, 3000)
          }
        } else {
          setIsLogin(false)
          toast('🎉 Account created successfully. Redirecting in 3 seconds...', {
            duration: 3000,
            style: {
              color: 'green',
              fontSize: '18px',
              fontWeight: 'bold'
            }
          })
          setTimeout(() => {
            router.push(`/verifyemail?email=${encodeURIComponent(formdata.email)}`)
          }, 3000)
          setIsLoading(false)
        }
      }
      setFormdata({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
      })
    } catch (error) {
      setError(`Something went wrong ${JSON.stringify(error)}`)
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile')
    }
  }, [isAuthenticated, router])
  return (
    <section
      className={`flex flex-col md:flex-row items-stretch md:gap-10 gap-4 p-4 bg-txt2 shadow-md rounded-lg ${poppins.className}`}
    >
      {isLoading && <Blurload text="" />}
      {/* image section */}
      <div className="w-full md:w-1/2 flex-1 md:flex hidden">
        <Image
          src={isLogin ? '/login.jpg' : '/signup.jpg'}
          width={400}
          height={400}
          alt="loginimg"
          priority
          className="md:w-auto w-full object-cover rounded-2xl"
        />
      </div>
      {/* form section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 flex-1 p-6 md:px-16">
        <h2 className="text-size4 md:text-size5 text-white font-bold">
          {isLogin ? 'Welcome Back!' : 'Create an Account!'}
        </h2>
        {/* switching is login */}
        <p className="text-size0 font-normal text-gray-400">
          {isLogin ? 'Not a member? ' : 'Already have an account? '}{' '}
          <span
            className="underline text-blue-800 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin)
              setFormdata({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password2: ''
              })
            }}
          >
            {isLogin ? 'Create account' : 'Login'}
          </span>
        </p>
        {/* form */}
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          {/* first name last name */}
          {!isLogin && (
            <div className="flex justify-start items-start md:items-center md:gap-4 gap-2 flex-col md:flex-row ">
              <input
                type="text"
                className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full"
                placeholder="First name"
                name="first_name"
                required
                value={formdata.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full"
                placeholder="Last name"
                name="last_name"
                required
                value={formdata.last_name}
                onChange={handleChange}
              />
            </div>
          )}
          {isLogin && error.first_name && (
            <p className="text-red-500 text-size1 font-normal">{error.first_name}</p>
          )}
          {isLogin && error.last_name && (
            <p className="text-red-500 text-size1 font-normal">{error.last_name}</p>
          )}
          {/* email */}
          <input
            type="email"
            className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full"
            placeholder="Email"
            name="email"
            required
            value={formdata.email}
            onChange={handleChange}
          />
          {error.email && <p className="text-red-500 text-size1 font-normal">{error.email}</p>}
          {/* Password */}
          <div className="flex px-4 py-3 has-focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] text-size1 font-normal w-full justify-between items-center gap-3">
            <input
              type={showPassword[0] ? 'text' : 'password'}
              placeholder="Enter your password"
              className="placeholder:text-gray-400 focus:placeholder:text-white outline-0 focus:outline-0 active:outline-0 active:border-0 grow peer text-gray-400 focus:text-white"
              required
              name="password"
              value={formdata.password}
              onChange={handleChange}
            />
            {/* eye button from react icon */}
            {!showPassword[0] ? (
              <FaEye
                size={22}
                className="cursor-pointer text-gray-400 peer-focus:text-white"
                onClick={() => handleShowPassword(0)}
              />
            ) : (
              <FaEyeSlash
                size={22}
                className="cursor-pointer text-gray-400 peer-focus:text-white"
                onClick={() => handleShowPassword(0)}
              />
            )}
          </div>
          {error.password && (
            <p className="text-red-500 text-size1 font-normal">{error.password}</p>
          )}
          {/* confirm password */}
          {!isLogin && (
            <div className="flex px-4 py-3 has-focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] text-size1 font-normal w-full justify-between items-center gap-3">
              <input
                type={showPassword[1] ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="placeholder:text-gray-400 focus:placeholder:text-white outline-0 focus:outline-0 active:outline-0 active:border-0 grow peer text-gray-400 focus:text-white"
                required
                name="password2"
                value={formdata.password2}
                onChange={handleChange}
              />
              {/* eye button from react icon */}
              {!showPassword[1] ? (
                <FaEye
                  size={22}
                  className="cursor-pointer text-gray-400 peer-focus:text-white"
                  onClick={() => handleShowPassword(1)}
                />
              ) : (
                <FaEyeSlash
                  size={22}
                  className="cursor-pointer text-gray-400 peer-focus:text-white"
                  onClick={() => handleShowPassword(1)}
                />
              )}
            </div>
          )}
          {!isLogin && error.password2 && (
            <p className="text-red-500 text-size1 font-normal">{error.password2}</p>
          )}
          {/* submit button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-white rounded-md hover:bg-orange-600 transition cursor-pointer text-size3 font-bold md:text-size4"
          >
            {isLogin
              ? isLoading
                ? 'Logging in...'
                : 'Login'
              : isLoading
              ? 'Signing up...'
              : 'Sign Up'}
          </button>
          {/* error message */}
          {isLogin && (
            <Link href="/forgetpassword" className="w-full">
              <Button variant={'link'} className="cursor-pointer block p-0 ml-auto">
                Forget Password?
              </Button>
            </Link>
          )}
          {error && (
            <p className="text-red-500 text-size1 font-normal">
              {typeof error == 'string'
                ? error
                : error.error
                ? error.error
                : Object.values(error)[0]}
            </p>
          )}
          {/* success message */}
          {success && (
            <p className="text-green-500 text-size1 font-normal">
              {typeof success == 'string' ? success : JSON.stringify(success)}
            </p>
          )}
        </form>
        {/* Divider and in center or register with */}
        <div className="flex justify-between items-center gap-3">
          <div className="bg-gray-400 h-[1px] grow" />
          <p className="text-gray-400 font-normal text-size0">
            Or {isLogin ? 'Login' : 'Register'} with
          </p>
          <div className="bg-gray-400 h-[1px] grow" />
        </div>
        {/* google and facebook social login */}
        <div className="flex justify-center items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer hover:scale-105 transition">
            <Image
              src="/google.png"
              alt="google"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer hover:scale-105 transition">
            <Image
              src="/facebook.png"
              alt="facebook"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignPage
