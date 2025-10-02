'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { pertnerformdata } from '@/type/applypertner'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'

const Applyrider = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileInputRef2 = useRef<HTMLInputElement | null>(null)
  const [formdata, setformdata] = useState<pertnerformdata>({
    name: '',
    phone_num: '',
    business_name: '',
    business_address: '',
    business_type: '',
    description: '',
    website: '',
    owner_photo: '',
    buesness_logo: ''
  })
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
  }
  const [preview, setPreview] = useState<string>('/default img.jpg')
  const [preview2, setPreview2] = useState<string>('/default img.jpg')

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
      setformdata((data) => ({ ...data, owner_photo: file }))
    }
  }
  // image change 2
  const handleImageChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2097152) {
        toast(
          "We're unable to process your icon as it exceeds the 2MB limit. Kindly upload a smaller file",
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
      setPreview2(url)
      setformdata((data) => ({ ...data, buesness_logo: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formdata.owner_photo || !(formdata.owner_photo instanceof File)) {
      toast('You are not upload your image please upload first', {
        action: {
          label: 'Undo',
          onClick: () => router.push('/applypartner')
        }
      })
      return
    }

    const data = new FormData()
    data.append('name', formdata.name)
    data.append('phone_num', formdata.phone_num)
    data.append('business_name', formdata.business_name)
    data.append('business_address', formdata.business_address)
    data.append('business_type', formdata.business_type)
    data.append('website', formdata.website)
    data.append('description', formdata.description)
    data.append('buesness_logo', formdata.buesness_logo)
    data.append('owner_photo', formdata.owner_photo)
    // fetch and upload to server
    toast('Form submited succesfully', {
      action: {
        label: 'Go home',
        onClick: () => router.push('/')
      }
    })
    for (const [k, v] of data.entries()) {
      console.log(`${k}:${v}`)
    }
    setformdata({
      name: '',
      phone_num: '',
      business_name: '',
      business_address: '',
      business_type: '',
      description: '',
      website: '',
      owner_photo: '',
      buesness_logo: ''
    })
    setPreview('/default img.jpg')
    setPreview2('/default img.jpg')
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:max-w-[740px]">
        <h2 className="text-center text-primary font-extrabold lg:text-size6 text-size5 tracking-wide my-4">
          Become a Business Partner Today
        </h2>
        {/* profile base */}
        <div className="space-y-3 flex items-start gap-4">
          {/* Image preview */}

          <div className="flex justify-between w-full lg:px-8  flex-col lg:flex-row">
            <div className="">
              <label className="text-accent font-bold text-size3 my-4 block">
                Upload your photo
              </label>
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
                📷 Upload img
              </Button>
            </div>
            <div>
              <label className="text-accent font-bold text-size3 my-4 block">
                Upload buesness logo
              </label>
              <Image
                src={preview2}
                alt="aplicant photo"
                width={112}
                height={112}
                className="my-2 w-22 h-22 rounded-full border-2 border-orange-500 object-cover"
              />
              {/* Upload button (camera icon style) */}
              <Button
                type="button"
                onClick={() => fileInputRef2.current?.click()}
                className="bg-orange-500 text-white p-2 shadow-md hover:bg-orange-600 transition cursor-pointer"
              >
                📷 Upload logo
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <input
              ref={fileInputRef2}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange2}
            />
          </div>
        </div>
        {/* contact section */}
        <section className="mt-2 space-y-2">
          <form
            method="POST"
            encType="multipart/formdata"
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
                placeholder="Update your Phone number"
                onChange={handlechange}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">Phone number</label>
              <Input
                value={formdata.phone_num || ''}
                name="phone_num"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Update your Phone number"
                onChange={handlechange}
                type="text"
              />
            </div>
            <label className="text-primary font-bold text-size3">business name</label>
            <Input
              value={formdata.business_name}
              required
              name="business_name"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Write your business_name"
              onChange={handlechange}
              type="text"
            />
            {/* buesness type */}
            <label className="text-primary font-bold text-size3">Select your buesness type</label>
            <Select
              value={formdata.business_type || ''}
              onValueChange={(val) => setformdata((data) => ({ ...data, business_type: val }))}
            >
              <SelectTrigger className="w-[180px] focus-visible:ring-0 border-[1px] border-primary">
                <SelectValue placeholder="Select your buesness type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gatget">gatget</SelectItem>
                <SelectItem value="food">food</SelectItem>
                <SelectItem value="cosmetic">cosmetic</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>{' '}
            {/* ---------- */}
            <label className="text-primary font-bold text-size3">Buesness description</label>
            <Input
              value={formdata.description}
              required
              name="description"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Write your buesness description"
              onChange={handlechange}
              type="text"
            />
            <label className="text-primary font-bold text-size3">Buesness Address</label>
            <Input
              value={formdata.business_address}
              required
              name="business_address"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Write your buesness address"
              onChange={handlechange}
              type="text"
            />
            <label className="text-primary font-bold text-size3">
              Buesness website Link (if have) *
            </label>
            <Input
              value={formdata.website}
              name="website"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Enter your buesness website link"
              onChange={handlechange}
              type="url"
            />
            <Button type="submit" className="tracking-widest cursor-pointer">
              Submit
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Applyrider
