'use client'
import { Add_adress_Dialog } from '@/components/Diolog'
import { Button } from '@/components/ui/button'
import { AppDispatch, RootState } from '@/lib/configstore'
import { deleteadress, deleteadresslocally } from '@/lib/profileslice'
import Image from 'next/image'
import Link from 'next/link'
import { MdDelete, MdVerified } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProfilePage = () => {
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_imag) ||
    '/deafaltprofile_square.jpg'
  const profile = useSelector((state: RootState) => state.profile.profile)
  const setting = useSelector((state: RootState) => state.setting.setting)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch<AppDispatch>()
  // delete adress functionality
  const deleteadd = async (id: number) => {
    try {
      await dispatch(deleteadress(id)).unwrap()
      dispatch(deleteadresslocally(id))
      toast('Address delete successfully', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      })
    } catch (err) {
      toast(String(err), {
        action: { label: 'Undo', onClick: () => console.log('Undo') }
      })
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
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
        {/* container */}
        <main className="flex justify-center lg:justify-around items-center lg:items-stretch pt-6 flex-col md:flex-row gap-5 md:gap-12 lg:gap-24">
          {/* left div */}
          <div>
            {/* About me section */}
            <div>
              <h2 className="text-size4 md:text-size5 font-bold text-orange-500 tracking-wide">
                About Me
              </h2>
              <ul className="text-gray-700 mt-2 space-y-2">
                <li>
                  <strong className="inline-block mr-1">Short description:</strong>
                  <br />
                  {profile?.bio || "Now it's empty"}
                </li>
                <li>
                  <strong className="inline-block mr-1">Gender:</strong>
                  {profile?.gender || "Now it's empty"}
                </li>
                <li>
                  <strong className="inline-block mr-1">Date of Birth:</strong>
                  {profile?.birth_date
                    ? new Date(profile.birth_date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "Now it's empty"}
                </li>
              </ul>
            </div>
            {/* contact section */}
            <div className="">
              <h2 className="text-size4 md:text-size5 font-bold text-orange-500 tracking-wide">
                Contact
              </h2>
              <ul className="text-gray-700 mt-2 space-y-2">
                <li>
                  <strong className="inline-block mr-1">Email:</strong>
                  {user?.email || "Now it's empty"}
                </li>
                <li>
                  <strong className="inline-block mr-1">Phone:</strong>
                  {profile?.phone_num || "Now it's empty"}
                </li>
                <li>
                  <strong className="inline-block mr-1">Country:</strong>
                  {profile?.country || "Now it's empty"}
                </li>
              </ul>
            </div>
            <div className="mt-6 flex">
              <Link href={'/profile/editprofile'}>
                <Button className="bg-orange-500 px-6 py-4 rounded-lg shadow hover:bg-orange-600 transition cursor-pointer text-size5 text-white text-start">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:h-[200px] rounded-lg bg-primary lg:block hidden" />
          {/* Address page */}
          <div className="flex flex-col items-start w-full lg:block space-y-3">
            <Add_adress_Dialog />
            <h2 className="text-size4 md:text-size5 font-bold text-orange-500 tracking-wide my-2">
              Address
            </h2>
            <ul className="text-gray-700 mt-2 space-y-2">
              {Array.isArray(profile?.addresses) && profile?.addresses.length > 0
                ? profile.addresses.map((itm, ind) => (
                    <li key={itm.id} className="flex flex-col gap-2 lg:block space-y-2">
                      <strong className="inline-block mr-1">address{ind + 1}:</strong>
                      {`${itm.city},${itm.street},${itm.country}` || "Now it's empty"}
                      <div className="flex gap-1.5 my-1.5">
                        <Link
                          href={`/profile/editadress?i=${encodeURIComponent(itm.id)}`}
                          className="inline-block lg:mx-2"
                        >
                          <Button className="bg-orange-500 px-6 py-4 rounded-lg shadow hover:bg-orange-600 transition cursor-pointer text-size5 text-white">
                            Edit address {ind + 1}
                          </Button>
                        </Link>
                        <Button
                          className="bg-orange-500 px-6 py-4 rounded-lg shadow hover:bg-orange-600 transition cursor-pointer text-white w-fit"
                          onClick={() => deleteadd(itm.id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </li>
                  ))
                : 'You dont save any addresses'}
            </ul>
          </div>
          <div className="h-[200px] w-2 rounded-lg bg-primary anmn-1  lg:block hidden" />
          {/* right div */}
          <div className="flex flex-col justify-center items-start lg:block">
            {/* settings page */}
            <div>
              <h2 className="text-size4 md:text-size5 font-bold text-orange-500 tracking-wide">
                Settings
              </h2>
              <ul className="text-gray-700 mt-2 space-y-2">
                <li>
                  <strong className="inline-block mr-1">Theme:</strong>
                  {setting?.theme || "Now it's empty"}
                </li>
                <li>
                  <strong className="inline-block mr-1">Language:</strong>
                  {setting?.language || "Now it's empty"}
                </li>
                <li className="whitespace-break-spaces break-words">
                  <strong className="inline-block mr-1">Last Update:</strong>
                  <br />
                  {setting?.setting_update_time
                    ? new Date(setting.setting_update_time).toLocaleString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      })
                    : "Now it's empty"}
                </li>
              </ul>
              <Link href={'/profile/editsetting'} className="my-3 block w-full">
                <Button className="bg-orange-500 px-6 py-4 rounded-lg shadow hover:bg-orange-600 transition cursor-pointer text-size5 text-white">
                  Edit Setting
                </Button>
              </Link>
              <div className="flex justify-start items-center gap-2">
                <Link href={'/profile/changepawword'} className="my-3 block w-full">
                  <Button
                    className=" px-6 py-4 rounded-lg shadow transition cursor-pointer text-white"
                    variant={'secondary'}
                  >
                    Change Password
                  </Button>
                </Link>
                <Link href={'/profile/resetpawword'} className="my-3 block w-full">
                  <Button
                    className=" px-6 py-4 rounded-lg shadow transition cursor-pointer text-white"
                    variant={'secondary'}
                  >
                    Reset Password
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfilePage
