'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import { AppDispatch, RootState } from '@/lib/configstore'
import { updatesetting, updatesettinglocally } from '@/lib/settingslice'
import { formdata_setting } from '@/type/editprofiletype'
import { SelectTrigger, SelectValue } from '@radix-ui/react-select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProfilePage = () => {
  const router = useRouter()
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_image) ||
    '/deafaltprofile_square.jpg'
  const setting = useSelector((state: RootState) => state.setting.setting)
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)

  // formdata state
  const [formdata, setformdata] = useState<formdata_setting>({
    id: setting?.id || 0,
    language: setting?.language || '',
    theme: setting?.theme || ''
  })

  // handle change
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setformdata((data) => ({ ...data, [name]: value }))
    console.log(formdata)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formdata)
    dispatch(updatesetting(formdata))
    dispatch(updatesettinglocally(formdata))
    toast('Setting changed succesfully', {
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
          <Image
            src={profileimg}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500"
          />

          <div className="flex justify-center items-center  gap-1.5">
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
              <label className="text-primary font-bold text-size3">Language</label>
              <Input
                value={formdata.language || ''}
                name="language"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Update your Phone number"
                onChange={handlechange}
                type="text"
              />
            </div>
            <label className="text-primary font-bold text-size3 block">Theme</label>
            <Select
              value={formdata.theme || ''}
              onValueChange={(val) => setformdata((data) => ({ ...data, theme: val }))}
            >
              <SelectTrigger className="border-primary border-[1px] border-primarytext-size2 focus-visible:ring-0 notudbtn w-full px-4 cursor-pointer rounded-lg py-1 text-start">
                <SelectValue placeholder="Update theme" />
              </SelectTrigger>
              <SelectContent className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="deafalt">deafalt</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="tracking-wider cursor-pointer block">
              Changed Setting
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
