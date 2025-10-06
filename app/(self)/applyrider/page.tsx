'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { riderformdata } from '@/type/applyrider'
import api from '@/utils/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

const Applyrider = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [formdata, setformdata] = useState<riderformdata>({
    name: '',
    email: '',
    working_area_address: '',
    permanent_address: '',
    phone_num: '',
    photo: ''
  })
  const [loading, setloading] = useState<boolean>(false)
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    let value = e.target.value
    if (name == 'phone_num') {
      value = value = value
        .split('')
        .filter((ch) => /[0-9+]/.test(ch))
        .join('')
    }
    setformdata((data) => ({ ...data, [name]: value }))
    console.log(formdata)
  }
  const [preview, setPreview] = useState<string>('/default img.jpg')

  // Image change handler
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2097152) {
        toast(
          "We're unable to process your image as it exceeds the 2MB limit. Kindly upload a smaller file",
          {
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo')
            }
          }
        )
        return
      }
      const url = URL.createObjectURL(file)
      setPreview(url)
      setformdata((data) => ({ ...data, photo: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    if (!formdata.photo || !(formdata.photo instanceof File)) {
      setloading(false)
      toast('You are not upload your image please upload first', {
        action: {
          label: 'Undo',
          onClick: () => router.push('/applyrider')
        }
      })
      return
    }

    const data = new FormData()
    data.append('name', formdata.name)
    data.append('phone_num', formdata.phone_num)
    data.append('permanent_address', formdata.permanent_address)
    data.append('working_area_address', formdata.working_area_address)
    data.append('photo', formdata.photo)
    data.append('email', formdata.email)
    // fetch and upload to server
    try {
      const res = await api.post(`riders/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status < 200 || res.status > 299) {
        setloading(false)
        toast('Sorry fail to add your request please contact with us', {
          action: {
            label: 'Contact us',
            onClick: () => router.push('/get_help')
          }
        })
        return
      }
      setloading(false)
      toast('Congratulation your request submited succesfully', {
        action: {
          label: 'Go Home',
          onClick: () => router.push('/')
        }
      })
    } catch (error: any) {
      setloading(false)

      if (error.response) {
        console.log('🛠 Server responded with error:')
        console.log('Status:', error.response.status)
        console.log('Data:', error.response.data)
      } else if (error.request) {
        console.log('🚫 No response from server:')
        console.log(error.request)
      } else {
        console.log('❌ Request setup error:', error.message)
      }

      toast(
        `${
          `~${Object.keys(error.response?.data || {}).flat()[0]}~:${
            Object.values(error.response?.data || {}).flat()[0]
          }` || error.message
        }`,
        {
          action: {
            label: 'Contact us',
            onClick: () => router.push('/get_help')
          }
        }
      )
    }
    setformdata({
      name: '',
      email: '',
      working_area_address: '',
      permanent_address: '',
      phone_num: '',
      photo: ''
    })
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:max-w-md">
        <h2 className="text-center text-primary font-extrabold lg:text-size6 text-size5 tracking-wide my-4">
          Join Our Team as a Rider
        </h2>
        {/* profile base */}
        <div className="space-y-3  items-start gap-4">
          {/* Image preview */}
          <label className="text-accent font-bold text-size3 my-4 block">Upload your photo</label>
          <Image
            src={preview}
            alt="aplicant photo"
            width={112}
            height={112}
            className="my-2 w-28 h-18 border-2 border-orange-500 object-cover"
          />
          {/* Upload button (camera icon style) */}
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-orange-500 text-white p-2 shadow-md hover:bg-orange-600 transition cursor-pointer"
          >
            📷 Upload imag
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {/* contact section */}
        <section className="mt-2 space-y-2">
          <form
            method="POST"
            encType="multipart/form-data"
            className="mt-2 space-y-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">Name</label>
              <Input
                value={formdata.name || ''}
                name="name"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write your name"
                onChange={handlechange}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">Email</label>
              <Input
                value={formdata.email || ''}
                name="email"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write your email"
                onChange={handlechange}
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">Phone number</label>
              <Input
                value={formdata.phone_num || ''}
                name="phone_num"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write your Phone number"
                onChange={handlechange}
                type="text"
              />
            </div>
            <label className="text-primary font-bold text-size3">Working Area Address</label>
            <Input
              value={formdata.working_area_address}
              required
              name="working_area_address"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Write your working area address"
              onChange={handlechange}
              type="text"
            />
            {/* permanent adrerss */}
            <label className="text-primary font-bold text-size3">Permanent Address</label>
            <Input
              value={formdata.permanent_address}
              required
              name="permanent_address"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Write your permanent address"
              onChange={handlechange}
              type="text"
            />
            <Button type="submit" className="tracking-wider cursor-pointer">
              {loading ? 'Creating...' : 'Submit'}
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Applyrider
