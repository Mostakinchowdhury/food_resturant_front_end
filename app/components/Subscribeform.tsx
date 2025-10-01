'use client'

import { ChangeEvent, useState } from 'react'

import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import LoadingLoader from './Loader'

const Subscribeform = ({ className }: { className?: string }) => {
  // loading state
  const [loading, setloading] = useState<boolean>(false)
  // Error state
  // formdata state
  const [email, setemail] = useState<string>('')

  // handle change
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setemail(value)
    console.log(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    console.log(email)
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      toast('Please Enter a valid email', {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice')
          }
        }
      })
      setloading(false)
      return
    }
    try {
      const response = await axios.post<object>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}subscribers/`,
        { email },
        {
          validateStatus: () => true
        }
      )
      if (!(response.status == 200 || response.status == 201)) {
        setloading(false)
        toast(Object.values(response.data).flat()[0], {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
        return
      }
      setloading(false)
      toast('You are succesfully subscribe our store.Thank you for subscribe our store', {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice')
          }
        }
      })
      setemail('')
    } catch (error) {
      setloading(false)
      console.log()
      if (error instanceof Error) {
        toast(error.message, {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
      } else {
        toast('Sorry something went wrong please contact with us', {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
      }
    }
  }
  if (loading) {
    return <LoadingLoader />
  }
  return (
    <div className={`'${className} space-y-0.5 mx-0'`}>
      <form method="POST" className="mt-4 space-y-2.5" onSubmit={handleSubmit}>
        <div className="lg:w-[450px] box-border bg-bg5 lg:h-[56px] flex relative z-10 flex-row justify-between h-[59px] md:w-[374px] sm:w-[280px] w-[210px] gap-0 rounded-2xl rounded-br-none rounded-tr-none md:rounded-3xl">
          <input
            name="email"
            type="email"
            className="placeholder:text-size1 placeholder:font-normal placeholder:text-txt text-txt text-size1 font-medium md:ml-6 ml-0 outline-0 border-0 focus:outline-0 focus:border-0 rounded-2xl rounded-tr-none rounded-br-none px-3"
            placeholder="youremail@gmail.com"
            value={email}
            required
            onChange={handlechange}
          />
          <button
            type="submit"
            className="font-medium md:text-size3 text-white bg-primary h-[59px] lg:px-[60px] md:px-[25px] px-2 md:rounded-3xl cursor-pointer relative z-50 rounded-tr-2xl rounded-br-2xl text-size1"
          >
            Subscribe
          </button>
        </div>
      </form>
      <p className="font-normal text-size0 text-txt2 lg:text-start text-center">
        we wont spam, read our{' '}
        <Link href={'/email_policy'} className="underline">
          email policy
        </Link>
      </p>
    </div>
  )
}

export default Subscribeform
