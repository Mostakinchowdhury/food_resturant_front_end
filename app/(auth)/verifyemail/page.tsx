'use client'
import { poppins } from '@/components/Navbar'
import { field_type } from '@/type/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const SignPage = ({ searchParams }: { searchParams?: { email?: string } }) => {
  const router = useRouter()
  const email = searchParams?.email
  const myForm = useRef<HTMLFormElement | null>(null)
  const [formdata, setFormdata] = useState<field_type>({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: ''
  })
  const inputs = useRef<HTMLInputElement[]>([])
  const [error, setError] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<any>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormdata({ ...formdata, [e.target.name]: value })
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = `field${index + 1}` as keyof field_type
    if (e.key === 'Backspace' && !formdata[key] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
    if (e.key !== 'Backspace' && formdata[key] && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }
  // handle resend otp function

  const handleResend = async () => {
    setFormdata({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: ''
    })
    if (!email) {
      setError('email not found')
      setIsLoading(false)
      return
    }
    setError('')
    setSuccess('')
    setIsLoading(true)
    const url = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }auth/verify_user_otp/?email=${encodeURIComponent(email)}`
    try {
      const response = await fetch(url)
      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        data = { error: 'Invalid JSON response', raw: text }
      }
      setSuccess(data)
      setIsLoading(false)
      inputs.current[0].focus()
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }
  // handle submit function
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/verify_user_otp/`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, otp: Object.values(formdata).join('') })
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        data = { error: 'Invalid JSON response', raw: text }
      }

      if (!response.ok) {
        setError(data)
        setIsLoading(false)
      } else {
        setSuccess(data)
        console.log(data)
        setIsLoading(false)
        setFormdata({
          field1: '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
          field6: ''
        })
      }
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!email) {
      router.push('/sign')
    }
    inputs.current[0].focus()
  }, [email, router])

  useEffect(() => {
    if (
      myForm.current &&
      formdata.field1 &&
      formdata.field2 &&
      formdata.field3 &&
      formdata.field4 &&
      formdata.field5 &&
      formdata.field6
    ) {
      myForm.current.requestSubmit()
    }
  }, [formdata])

  console.log(JSON.stringify(formdata))
  return (
    <section
      className={`flex flex-col md:flex-row items-stretch md:gap-10 gap-4 p-4 bg-txt2 shadow-md rounded-lg ${poppins.className}`}
    >
      {/* image section */}
      <div className="w-full md:w-1/2 flex-1 md:flex hidden">
        <Image
          src={'/verifyemail.jpg'}
          width={400}
          height={400}
          alt="loginimg"
          priority
          className="md:w-auto w-full object-cover rounded-2xl"
        />
      </div>
      {/* form section */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 flex-1 p-6 md:px-16">
        <h2 className="text-size4 md:text-size5 text-white font-bold">Verify Your Email</h2>
        <h3 className="text-size1 font-normal text-gray-300">
          We sent a OTP to your email{' '}
          <span className="text-primary font-semibold underline">{email}</span>
        </h3>
        {/* form */}
        <form className="flex flex-col gap-4" onSubmit={handlesubmit} ref={myForm}>
          <div className="flex justify-start items-start md:items-center md:gap-4 gap-2">
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field1"
              required
              value={formdata.field1}
              onChange={(e) => handleChange(e)}
              maxLength={1}
              ref={(el) => {
                if (el) {
                  inputs.current[0] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 0)}
              pattern="[0-9]{1}"
            />
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field2"
              required
              value={formdata.field2}
              onChange={(e) => handleChange(e)}
              maxLength={1}
              ref={(el) => {
                if (el) {
                  inputs.current[1] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 1)}
              pattern="[0-9]{1}"
            />
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field3"
              required
              value={formdata.field3}
              onChange={(e) => handleChange(e)}
              maxLength={1}
              pattern="[0-9]{1}"
              ref={(el) => {
                if (el) {
                  inputs.current[2] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 2)}
            />
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field4"
              required
              value={formdata.field4}
              pattern="[0-9]{1}"
              onChange={(e) => handleChange(e)}
              maxLength={1}
              ref={(el) => {
                if (el) {
                  inputs.current[3] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 3)}
            />
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field5"
              required
              value={formdata.field5}
              onChange={(e) => handleChange(e)}
              maxLength={1}
              pattern="[0-9]{1}"
              ref={(el) => {
                if (el) {
                  inputs.current[4] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 4)}
            />
            <input
              type="text"
              className="block px-4 py-3 focus:border-2 border-0 border-primary rounded-md bg-[#363c4c] placeholder:text-gray-400 focus:placeholder:text-white text-gray-400 focus:text-white text-size1 font-normal outline-0 focus:outline-0 active:outline-0 active:border-0 w-full notudbtn text-center"
              name="field6"
              required
              value={formdata.field6}
              onChange={(e) => handleChange(e)}
              maxLength={1}
              pattern="[0-9]{1}"
              ref={(el) => {
                if (el) {
                  inputs.current[5] = el
                }
              }}
              onKeyUp={(e) => handleKeyUp(e, 5)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white rounded-md hover:bg-orange-600 transition cursor-pointer text-size3 font-bold md:text-size4"
            >
              {isLoading ? 'Loading...' : 'Verify Email'}
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 bg-primary text-white rounded-md hover:bg-orange-600 transition cursor-pointer text-size3 font-bold md:text-size4"
              onClick={handleResend}
            >
              {isLoading ? 'Loading...' : 'Resend OTP'}
            </button>
          </div>
          {/* error message */}
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
              {typeof success == 'string' ? success : Object.values(success)[0]}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default SignPage
