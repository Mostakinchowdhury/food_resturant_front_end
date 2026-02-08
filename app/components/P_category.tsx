import { top6cattype } from '@/type/overview';
import axios from 'axios';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const P_category = async () => {
  const result = await axios.get<top6cattype>(`${process.env.OVERVIEW}tc`);
  return (
    <div className="space-y-6">
      {/* section title */}
      <h3 className="font-bold text-txt text-size2 lg:text-size5">
        Dayfey’s Popular Categories <span className="hidden lg:inline">🤩</span>
      </h3>
      {/* foods container */}
      <section className="gridbox1">
        {result.data.top_categories.map(item => (
          <div key={item.id} className="rounded-2xl overflow-hidden">
            {/* food img */}
            <Link
              href={
                ('/menu?category=' + encodeURIComponent(item.name)) as Route
              }
            >
              <div className="relative bg-no-repeat bg-center bg-cover w-full h-[161px] lg:[203px] overflow-hidden">
                <Image
                  src={item.image_url ?? '/img.png'}
                  alt={item.name}
                  fill
                  className="absolute inset-0 object-cover"
                />
              </div>
            </Link>
            {/* food detail */}
            <div className="bg-txt2 lg:py-4 py-3 px-4 lg:px-5 flex flex-col items-start justify-center gap-1">
              <h3 className="font-bold text-primary text-size0 md:text-size3">
                {item.name}
              </h3>
              <h4 className="font-normal text-size0 text-white md:">
                {'Many shops'}
              </h4>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default P_category;
