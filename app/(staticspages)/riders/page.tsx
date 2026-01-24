'use client';

import Blurload from '@/components/Blurload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplyRider, RidersResponse } from '@/type/applyrider';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { IoCheckmarkDoneCircleSharp, IoLocationSharp } from 'react-icons/io5';
import { MdCancel, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { toast } from 'sonner';
import Mypagination from '@/components/pagination/Mypagination';

const ShopsPage = () => {
  const btn = useRef<HTMLButtonElement | null>(null);
  const [shops, setShops] = useState<ApplyRider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setpage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.current?.click();
    }
  };

  useEffect(() => {
    fetchRider('');
  }, [page]);

  const fetchRider = async (search: string) => {
    setLoading(true);
    try {
      const res = await axios.get<RidersResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}riders?search=${encodeURIComponent(search)}&page=${page}`,
      ); // DRF endpoint
      const data = res.data;
      setShops(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      toast(`Error fetching riders:${error as string}`);
    }
    setLoading(false);
  };

  return (
    <div className="py-4 mx-auto">
      <h1 className="font-extrabold text-size5 lg:text-size7 text-primary my-3 text-center">
        Riders List
      </h1>

      {/* Search Input */}
      <div className="flex gap-2 items-center justify-center bg-gray-100 rounded-2xl">
        <Input
          type="text"
          placeholder="Search by name or address or phone number..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKey}
          className="w-full pl-8 rounded-lg focus:outline-none focus-visible:outline-0 focus-visible:border-0 focus-visible:ring-0 border-0 focus:border-0 focus:ring-0 focus:outline-0 shadow-none lg:text-2xl lg:placeholder:text-2xl font-semibold text-txt2"
        />
        <Button
          className="focus-visible:outline-0 focus-visible:border-0 focus-visible:ring-0 active:bg-amber-800 hover:bg-amber-400 py-[26px] tracking-wider text-lg lg:text-2xl lg:py-8 px-8"
          onClick={() => fetchRider(searchTerm)}
          ref={btn}
        >
          Search
        </Button>
      </div>

      {loading ? (
        <Blurload text="Collecting..." />
      ) : shops.length === 0 ? (
        <p className="text-center my-6">No Riders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
          {shops.map(riders => (
            <div
              key={riders.id}
              className="rounded-xl p-2 flex flex-col items-center shadow hover:shadow-lg transition bg-gray-100 py-4"
            >
              <Link href={`/riders/${riders.id}`}>
                {riders.photo_url ? (
                  <Image
                    src={riders.photo_url}
                    alt={riders.name + ' photo'}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover mb-4 w-[300px] h-[300px] border-2 border-accent"
                  />
                ) : (
                  //
                  <Image
                    src={'/shoppic.jpg'}
                    alt={riders.name + ' photo'}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover mb-4 w-[300px] h-[300px] border-2 border-accent"
                  />
                )}
              </Link>
              <h2 className="text-lg font-bold flex items-center gap-1.5">
                <span>
                  <MdOutlineDriveFileRenameOutline />
                </span>
                <span>{riders.name}</span>
              </h2>
              <p className="text-sm font-medium flex items-center gap-2 text-txt2">
                <span>
                  <span>
                    <IoLocationSharp />
                  </span>
                </span>
                <span>{riders.working_area_address}</span>
              </p>
              <p className="text-gray-600 mb-1 flex items-center gap-1.5">
                <span>
                  <FaPhoneSquareAlt />
                </span>
                <span className="font-semibold">Phone:</span> {riders.phone_num}
              </p>
              <p
                className={`mt-2 font-medium flex items-center gap-2 ${
                  riders.status === 'PENDING'
                    ? 'text-yellow-500'
                    : riders.status === 'APPROVED'
                      ? 'text-green-500'
                      : 'text-red-500'
                }`}
              >
                <span>
                  {riders.status === 'PENDING' ? (
                    <GrStatusGoodSmall />
                  ) : riders.status === 'APPROVED' ? (
                    <IoCheckmarkDoneCircleSharp />
                  ) : (
                    <MdCancel />
                  )}
                </span>
                {riders.status}
              </p>
            </div>
          ))}
        </div>
      )}
      <Mypagination page={page} setpage={setpage} totalpages={totalPage} />
    </div>
  );
};

export default ShopsPage;
