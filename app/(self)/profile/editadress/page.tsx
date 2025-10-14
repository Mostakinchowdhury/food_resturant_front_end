'use client'
import Blurload from '@/components/Blurload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AppDispatch, RootState } from '@/lib/configstore'
import { fetchprofile, updateadress, updateadresslocally } from '@/lib/profileslice'
import { fetchuser } from '@/lib/userslice'
import { formdata_adress } from '@/type/editprofiletype'
import countries from '@/utils/countrylist'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProfilePage = ({ searchParams }: { searchParams: { i?: string } }) => {
  const router = useRouter()
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_imag) ||
    '/deafaltprofile_square.jpg'
  const adress = useSelector((state: RootState) => state.profile.profile?.addresses)?.find(
    (i) => i.id == parseInt(searchParams.i || '0')
  )
  const profile = useSelector((state: RootState) => state.profile.profile)
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)

  // formdata state
  const [formdata, setformdata] = useState<formdata_adress>({
    id: adress?.id || 0,
    city: adress?.city || '',
    street: adress?.street || '',
    country: adress?.country || ''
  })
  // loading state

  const [loading, setLoading] = useState<boolean>(true)
  // handle change
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setformdata((data) => ({ ...data, [name]: value }))
    console.log(formdata)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formdata)
    try {
      dispatch(updateadress(formdata))
      dispatch(updateadresslocally(formdata))
      toast('Address changed succesfully', {
        action: {
          label: 'profile',
          onClick: () => router.push('/profile')
        }
      })
      router.push('/profile')
    } catch {
      toast('Something went wrong', {
        action: {
          label: 'profile',
          onClick: () => router.push('/profile')
        }
      })
    }
  }

  useEffect(() => {
    if (!searchParams.i) {
      toast('Sorry adress id not found Redirecting to profile in 2s', {
        action: {
          label: 'profile',
          onClick: () => router.push('/profile')
        },
        duration: 2000
      })
      // setTimeout(() => {
      //   router.push('/profile')
      // }, 2000)
    }
    // if (!adress) {
    //   toast('Sorry adress not found Redirecting to profile in 2s', {
    //     action: {
    //       label: 'profile',
    //       onClick: () => router.push('/profile')
    //     },
    //     duration: 2000
    //   })
    //   setTimeout(() => {
    //     router.push('/profile')
    //   }, 2000)
    // }
  }, [])
  const load = async () => {
    if (!user || !profile) {
      try {
        dispatch(fetchprofile())
        dispatch(fetchuser())
      } catch (e) {
        toast('something problem in here')
      } finally {
        console.log(adress)
        setLoading(false)
      }
    } else {
      toast('profile and user Already exist')
      console.log(adress)
      setLoading(false)
    }
    console.log(profile)
  }
  useEffect(() => {
    load()
  }, [adress, user])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <Blurload />
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
          {/* add create diolog */}
          <form method="POST" className=" mt-10 space-y-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">City</label>
              <Input
                value={formdata.city || ''}
                name="city"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Update your city"
                onChange={handlechange}
                type="text"
              />
            </div>
            <label className="text-primary font-bold text-size3 block">Street</label>
            <Input
              value={formdata.street || ''}
              name="street"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Update your street"
              onChange={handlechange}
              type="text"
            />
            <label className="text-primary font-bold text-size3 block">country</label>
            <Input
              value={formdata.country || ''}
              name="country"
              list="countries"
              className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
              placeholder="Update your country"
              onChange={handlechange}
              type="text"
            />
            <datalist id="countries">
              <datalist id="countries">
                {countries.map((c, idx) => (
                  <option key={idx} value={c} />
                ))}
              </datalist>
            </datalist>
            <Button type="submit" className="tracking-wider cursor-pointer block">
              Changed Adress
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
