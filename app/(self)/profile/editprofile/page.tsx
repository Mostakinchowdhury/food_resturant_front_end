'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AppDispatch, RootState } from '@/lib/configstore'
import {
  changeprofile,
  fetchprofile,
  updateprofile,
  updateprofilelocally
} from '@/lib/profileslice'
import { formdata } from '@/type/editprofiletype'
import api from '@/utils/api'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProfilePage = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_image) ||
    '/deafaltprofile_square.jpg'
  const profile = useSelector((state: RootState) => state.profile.profile)
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const [formdata, setformdata] = useState<formdata>({
    id: profile?.id || 0,
    phone_num: profile?.phone_num || '',
    country: profile?.country || '',
    gender: profile?.gender || '',
    birth_date: profile?.birth_date ? new Date(profile.birth_date) : null,
    bio: profile?.bio || '',
    profile_image: profile?.profile_image || ''
  })

  const [open, setOpen] = useState<boolean>(false)
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
  const [preview, setPreview] = useState<string>(profileimg)
  const [birthDateChanged, setBirthDateChanged] = useState(false)
  const [needfetch, setneedfetch] = useState<boolean>(false)

  // Image change handler
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      const formData = new FormData()
      formData.append('profile_image', file)
      try {
        const res = await api.patch(`profiles/${profile?.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status < 200 || res.status > 299) {
          toast('Fail to changed profile image', {
            action: {
              label: 'Go to profile',
              onClick: () => router.push('/profile')
            }
          })
        }
        console.log('____HYGTH_____')
        console.log(res.data)
        console.log('____HYGTH_____')
        toast('Profile image changed succesfully', {
          action: {
            label: 'Go to profile',
            onClick: () => router.push('/profile')
          }
        })
        dispatch(changeprofile(url))
      } catch (error: any) {
        if (error.response) {
          console.log('🛑 Server Error:', error.response.data) // Django কী error পাঠিয়েছে
          console.log('🔢 Status:', error.response.status)
        } else if (error.request) {
          console.log('🚫 No response received:', error.request)
        } else {
          console.log('❌ Error setting up request:', error.message)
        }

        toast(`Server Error: cheak consol`, {
          action: {
            label: 'Check Console',
            onClick: () => console.log(error.response?.data)
          }
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formdata)
    const data = new FormData()
    data.append('phone_num', formdata.phone_num)
    data.append('country', formdata.country)
    data.append('gender', formdata.gender)
    data.append('bio', formdata.bio)

    if (formdata.birth_date instanceof Date) {
      const date = formdata.birth_date
      const localDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      data.append('birth_date', localDate)
    }
    const id = formdata.id
    try {
      await dispatch(updateprofile({ id, data }))

      if (!needfetch && !birthDateChanged) {
        const { profile_image, birth_date, ...frmcopy } = formdata
        dispatch(updateprofilelocally({ ...frmcopy }))
      }
      toast('Form submited succesfully', {
        action: {
          label: 'Go to profile',
          onClick: () => router.push('/profile')
        }
      })
    } catch (e) {
      toast('Something went wrong', {
        action: {
          label: 'try again',
          onClick: () => handleSubmit
        }
      })
    }
  }

  useEffect(() => {
    if (needfetch || birthDateChanged) {
      setneedfetch(false)
      dispatch(fetchprofile())
    }
  }, [needfetch, birthDateChanged])
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:max-w-md">
        {/* profile base */}
        <div className="text-center">
          {/* Image preview */}
          <div className="relative w-28 h-28 mx-auto">
            <Image
              src={preview}
              alt="Profile"
              width={112}
              height={112}
              className="w-28 h-28 rounded-full border-4 border-orange-500 object-cover"
            />
            {/* Upload button (camera icon style) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-orange-500 text-white rounded-full p-2 shadow-md hover:bg-orange-600 transition cursor-pointer"
            >
              📷
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex justify-center items-center gap-1.5 mt-2">
            {(user?.is_staff || user?.is_superuser) && (
              <MdVerified className="block" size={24} color="blue" />
            )}
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.first_name} {user?.last_name}
            </h1>
          </div>

          <p className="text-gray-600">
            {user?.is_superuser
              ? 'Application Admin'
              : user?.is_staff
              ? 'Application Manager'
              : 'General User'}
          </p>
        </div>
        {/* contact section */}
        <section className="mt-10 space-y-2">
          <form
            method="POST"
            encType="multipart/form-data"
            className=" mt-10 space-y-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">Phone_num</label>
              <Input
                value={formdata.phone_num || ''}
                name="phone_num"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Update your Phone number"
                onChange={handlechange}
                type="text"
              />
            </div>
            <Select
              value={formdata.gender || ''}
              onValueChange={(val) => setformdata((data) => ({ ...data, gender: val }))}
            >
              <SelectTrigger className="w-[180px] focus-visible:ring-0 border-[1px] border-primary">
                <SelectValue placeholder="Update Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>{' '}
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3"> Update Bio</label>
              <Textarea
                className="border-primary text-size2 focus-visible:ring-0  w-full"
                value={formdata.bio}
                name="bio"
                onChange={handlechange}
              />
            </div>
            <label className="text-primary font-bold text-size3">Country</label>
            <Input
              value={formdata.country || ''}
              name="country"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Update your country name"
              onChange={handlechange}
              type="text"
            />
            <label className="text-primary font-bold text-size3">Date of Birth</label>
            <div className="flex flex-col gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className=" justify-between font-normal border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                  >
                    {formdata.birth_date
                      ? formdata.birth_date.toLocaleString('en-GB', {
                          dateStyle: 'full',
                          timeStyle: 'short'
                        })
                      : 'Select date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formdata.birth_date || undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setformdata((data) => ({ ...data, birth_date: date || null }))
                      setOpen(false)
                      setBirthDateChanged(true)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit" className="tracking-wider cursor-pointer">
              Submit
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
