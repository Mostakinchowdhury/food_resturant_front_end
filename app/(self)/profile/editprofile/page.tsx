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
import { fetchprofile, updateprofile, updateprofilelocally } from '@/lib/profileslice'
import { formdata } from '@/type/editprofiletype'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
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

  // Image change handler
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setformdata((data) => ({ ...data, profile_image: file }))
      console.log(file + 'and ', url)
    }
    console.log(file)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData()
    data.append('phone_num', formdata.phone_num)
    data.append('country', formdata.country)
    data.append('gender', formdata.gender)
    data.append('bio', formdata.bio)

    let needfetch: boolean = false
    if (formdata.birth_date instanceof Date) {
      const date = formdata.birth_date
      const localDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      data.append('birth_date', localDate)
    }
    if (formdata.profile_image instanceof File) {
      data.append('profile_image', formdata.profile_image)
      needfetch = true
    }
    const id = formdata.id
    dispatch(updateprofile({ id, data }))
    if (needfetch || birthDateChanged) {
      dispatch(fetchprofile())
    } else {
      const { profile_image, birth_date, ...frmcopy } = formdata
      dispatch(updateprofilelocally({ ...frmcopy }))
    }
    toast('Form submited succesfully', {
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo')
      }
    })
    router.push('/profile')
  }
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
            encType="multipart/formdata"
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
