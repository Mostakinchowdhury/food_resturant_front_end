// Typenav

import { poppins } from '@/components/Navbar';
import Products from '@/components/menu/Products';
import Search from '@/components/menu/Search';
import Typenav from '@/components/menu/Typenav';
import Mypagination from '@/components/pagination/Mypagination';
import ServerMypagination from '@/components/pagination/ServerMypagination';
import { product_type } from '@/type/item';

export const revalidate = 100;
export const metadata = {
  title: 'Restaurant Offers',
  description: 'Find the best restaurant offers and discounts',
};
export default async function ResturantPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    search?: string;
    tag?: string;
    page?: number;
  };
}) {
  const srcp = await searchParams;
  const category = srcp.category || 'All';
  const qcategory = srcp.category || '';
  const page = srcp.page || 1;
  const serch = srcp.search || '';
  const tag = srcp.tag || '';
  let url = `${process.env.BACKEND_URL}products/?search=${serch}&page=${page}&page_size=2`;
  if (qcategory) {
    url += `&category=${qcategory}`;
  }
  if (tag) {
    url += `&tag=${tag}`;
  }
  const respons = await fetch(url);
  let data: product_type[] = [];
  let totalpages = 1;
  const results: string = await respons.text();
  try {
    data = JSON.parse(results).results;
    totalpages = JSON.parse(results).total_pages;
  } catch {
    data = [];
  }
  if (!respons.ok) {
    return (
      <p className="text-red-700 text-center">
        Something went wrong in server please contact with us
      </p>
    );
  }
  try {
    return (
      <div className={`${poppins.className || ''} space-y-7`}>
        <Search />
        <Typenav />
        <Products category={category} products={data} />
        {/* ==========================  pagination by using Link components==================== */}
        <ServerMypagination page={page} totalpages={totalpages} from="menu" />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load data {JSON.stringify(error)}
      </div>
    );
  }
}
