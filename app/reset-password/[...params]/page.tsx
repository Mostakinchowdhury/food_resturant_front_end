'use client';
import LoadingLoader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { logout } from '@/lib/authcreateslice';
import { AppDispatch } from '@/lib/configstore';
import { formdata_resetpassword } from '@/type/editprofiletype';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ChangePasswordpage = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';
  const router = useRouter();
  // const profileimg =
  //   useSelector((state: RootState) => state.profile.profile?.profile_image) ||
  //   '/deafaltprofile_square.jpg'
  // const user = useSelector((state: RootState) => state.user.user)
  // loading state
  const [loading, setloading] = useState<boolean>(false);
  // Error state
  // formdata state
  const [formdata, setformdata] = useState<formdata_resetpassword>({
    password: '',
    confirm_password: '',
    token: token,
    uidb64: uid,
  });

  // dispatch

  const dispatch = useDispatch<AppDispatch>();

  // handle change
  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setformdata(data => ({ ...data, [name]: value }));
    console.log(formdata);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    console.log(formdata);
    try {
      const response = await axios.post<object>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/reset-password-confirm/`,
        formdata,
        {
          validateStatus: () => true,
        },
      );
      if (!(response.status == 200 || response.status == 201)) {
        setloading(false);
        console.log(response.data);
        toast(Object.values(response.data).flat()[0], {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice');
            },
          },
        });
        return;
      }
      setloading(false);
      toast(Object.values(response.data).flat()[0], {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice');
          },
        },
      });
      dispatch(logout());
      router.push('/sign');
    } catch (error) {
      setloading(false);
      console.log();
      if (error instanceof Error) {
        toast(error.message, {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice');
            },
          },
        });
      } else {
        toast('Sorry something went wrong please contact with us', {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice');
            },
          },
        });
      }
    }
  };
  if (loading) {
    return <LoadingLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center rounded-xl p-3 md:p-5 lg:px-18">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:max-w-md">
        <h1 className="text-center text-size5 text-primary font-bold border-b-3 px-2 w-fit mx-auto">
          Reset Your Password
        </h1>
        {/* contact section */}
        <section className="mt-10 space-y-2">
          <form
            method="POST"
            encType="multipart/formdata"
            className=" mt-10 space-y-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-primary font-bold text-size3">
                Password
              </label>
              <Input
                value={formdata.password || ''}
                name="password"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Write your new password"
                onChange={handlechange}
                type="text"
                required
              />
            </div>
            <label className="text-primary font-bold text-size3 block">
              Confirm Password
            </label>
            <Input
              value={formdata.confirm_password || ''}
              name="confirm_password"
              className="border-primary text-size2 focus-visible:ring-0 w-full"
              placeholder="Retype your new password"
              onChange={handlechange}
              type="text"
              required
            />
            <Button
              type="submit"
              className="tracking-wider cursor-pointer block"
            >
              Reset Password
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePasswordpage;
