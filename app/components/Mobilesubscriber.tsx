'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import LoadingLoader from './Loader'

const Subscriberform = () => {
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
    <div>
      <form className="mt-4 space-y-2.5" method="POST" onSubmit={handleSubmit}>
        <p className="font-normal text-size0 text-white text-center">
          Enter your email to see what we added to our store <br />
          and what we provide discount and promo code
        </p>
        <div className="w-[300px] box-border bg-white rounded-3xl h-[56px] flex justify-between items-center relative z-10">
          <input
            value={email}
            onChange={handlechange}
            name="email"
            className="placeholder:text-size1 placeholder:font-normal placeholder:text-txt text-txt text-size1 font-medium ml-6 outline-0 border-0 focus:outline-0 focus:border-0"
            placeholder="Enter your valid email"
            required
          />
          <button
            type="submit"
            className="font-bold text-size2 text-white bg-primary h-[57px] w-[57px]  rounded-3xl cursor-pointer relative z-50 justify-center items-center flex"
          >
            <Image src={'/Next page.png'} alt="next page" width={34} height={34} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Subscriberform
