'use client'
import LoadingLoader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RootState } from '@/lib/configstore'
import { formdata_changepassword } from '@/type/editprofiletype'
import api from '@/utils/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const ChangePasswordpage = () => {
  const router = useRouter()
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_imag) ||
    '/deafaltprofile_square.jpg'
  const user = useSelector((state: RootState) => state.user.user)
  // loading state
  const [loading, setloading] = useState<boolean>(false)
  // Error state
  // formdata state
  const [formdata, setformdata] = useState<formdata_changepassword>({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })

  // handle change
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setformdata((data) => ({ ...data, [name]: value }))
    console.log(formdata)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    console.log(formdata)
    try {
      const response = await api.post<object>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/change-password/`,
        formdata,
        {
          validateStatus: () => true
        }
      )
      if (!(response.status == 200 || response.status == 201)) {
        setloading(false)
        console.log(response.data)
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
      toast(Object.values(response.data).flat()[0], {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice')
          }
        }
      })
      router.push('/profile')
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
    <div className="bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
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
              <label className="text-primary font-bold text-size3">Old password</label>
              <Input
                value={formdata.old_password || ''}
                name="old_password"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Write your current password"
                onChange={handlechange}
                type="text"
                required
              />
            </div>
            <label className="text-primary font-bold text-size3 block">New password</label>
            <Input
              value={formdata.new_password || ''}
              name="new_password"
              className="border-primary text-size2 focus-visible:ring-0 w-full"
              placeholder="Write your new password"
              onChange={handlechange}
              type="text"
              required
            />
            <label className="text-primary font-bold text-size3 block">Confirm Password</label>
            <Input
              value={formdata.confirm_password || ''}
              name="confirm_password"
              className="border-primary text-size2 focus-visible:ring-0 w-full"
              placeholder="Retype your new password"
              onChange={handlechange}
              type="text"
              required
            />
            <Button type="submit" className="tracking-wider cursor-pointer block">
              Changed Password
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ChangePasswordpage
