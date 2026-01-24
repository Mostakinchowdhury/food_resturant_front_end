import { TopPartnersResponse } from '@/type/apply_p';
import axios from 'axios';
import { Route } from 'next';
import Link from 'next/link';

const Popular_r = async () => {
  const shops = await axios.get<TopPartnersResponse>(
    `${process.env.OVERVIEW}tp`,
  );

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-size2 text-black md:text-size5">
        Popular Shops
      </h3>
      {/* mapping with popular resturant */}
      <div className="overflow-x-auto scroll-smooth flex gap-3 scroll-hide w-full px-3">
        {shops.data.top_partners.map(item => (
          <Link
            href={`/shops/${encodeURIComponent(item.id)}` as Route}
            key={item.id}
            className={`w-${'122'}px h-${'156'}px`}
          >
            <div
              style={{
                backgroundImage: item.buesness_logo_url
                  ? `url(${item.buesness_logo_url})`
                  : `url('/img.png')`,
              }}
              className="w-[122px] h-[156px] lg:w-[238px] lg:h-[266px] bg-no-repeat bg-center bg-cover"
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular_r;
