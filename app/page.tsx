// app/page.tsx
import Banner from './components/Banner';
import Counterblock from './components/Counterblock';
import Deals from './components/Deals';
import Fac from './components/Fac';
import Mobile_banner from './components/Mobile_banner';
import P_category from './components/P_category';
import Partnerwithus from './components/Partnerwithus';
import Popular_r from './components/Popular_r';
import Taklabanner from './components/Taklabanner';

export default function Page() {
  return (
    <div className="space-y-8">
      <Mobile_banner />
      <Banner />
      <Deals />
      <P_category />
      <Popular_r />
      <Taklabanner />
      <Partnerwithus />
      <Fac />
      <Counterblock />
    </div>
  );
}
