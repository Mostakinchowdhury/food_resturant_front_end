import { faq_nav, faq_steps } from '@/lib/home_store'
import Image from 'next/image'
import Link from 'next/link'

const Fac = async ({ searchParams }: { searchParams: { fac?: string } }) => {
  const facID = parseInt(searchParams?.fac || '1')
  const question: string = faq_nav.find((i) => i.id === facID)?.title || 'How does Order.UK work?'
  return (
    <section className="lg:bg-bg5 bg-white p-4 lg:space-y-5 space-y-3 box-border">
      {/* section heading  */}
      <h3 className="font-bold text-[26px] text-black lg:text-size5">Know more about us!</h3>
      {/* segment of page */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-w-[1px] lg:divide-[rgba(255,255,255,0.1)]">
        {/* faq navbar */}
        <nav className="flex flex-col gap-2 lg:bg-txt2 bg-transparent lg:justify-center lg:items-center lg:p-4 lg:rounded-tl-2xl lg:rounded-bl-2xl p-8 text-center">
          {faq_nav.map((item) => (
            <Link href={`/?fac=${encodeURIComponent(item.id)}`} key={item.id}>
              <p
                className={`font-bold text-size3 text-black p-4 rounded-3xl lg:text-white ${
                  facID === item.id ? 'bg-primary lg:text-txt' : 'bg-transparent'
                }`}
              >
                {item.title}
              </p>
            </Link>
          ))}
        </nav>

        {/* steps part */}
        <div className="bg-txt2 flex flex-col gap-2.5 p-6 justify-between items-center lg:rounded-tr-2xl lg:rounded-br-2xl rounded-2xl lg:rounded-tl-[0px] lg:rounded-bl-[0px]">
          {/* steps cards */}
          <div className="flex flex-col lg:flex-row gap-4 p-10 lg:p-2 overflow-x-auto scroll-hide w-full">
            {faq_steps
              .filter((i) => i.fac.toLowerCase() === question.toLowerCase())
              .map((item) => (
                <div
                  className="p-3 flex flex-col justify-between items-center bg-bg5 rounded-lg text-center gap-3 min-w-[238px]"
                  key={item.id}
                >
                  <h3 className="font-bold text-txt2 text-size3">{item.h}</h3>
                  <Image src={item.path} alt={'steps image'} width={128} height={128} />
                  <p className="font-medium text-size2 text-black">{item.p}</p>
                </div>
              ))}
          </div>
          <p className="text-white text-size2 font-normal text-center w-full overflow-x-auto scroll-hide">
            {faq_nav.find((i) => i.id === facID)?.description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Fac
