import { social } from '@/type/home'
import Image from 'next/image'
import Link from 'next/link'

const Social = () => {
  const socialmedia: social[] = [
    {
      name: 'facebook',
      path: '/Facebook.png',
      size: 45,
      link: 'https://www.facebook.com/mostakin.chowdhury.58'
    },
    {
      name: 'instagram',
      path: '/Instagram.png',
      size: 45,
      link: 'https://www.instagram.com/mostakinc/?igsh=MWdqOTRsOTl1aDhzZw%3D%3D#'
    },
    {
      name: 'tiktok',
      path: '/TikTok.png',
      size: 45,
      link: 'https://www.tiktok.com/@dnd_programer?_t=ZS-8zoRGDmie3k&_r=1'
    },
    {
      name: 'youtube',
      path: '/youtube2.png',
      size: 42,
      link: 'https://www.youtube.com/@return_flow'
    }
  ]
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {socialmedia.map((item: social) => (
        <Link
          href={item.link}
          key={item.name}
          style={{
            WebkitMaskImage: 'linear-gradient(#000, transparent)',
            maskImage: 'linear-gradient(#000, transparent)'
          }}
        >
          <Image
            src={item.path}
            alt={item.name}
            width={item.size}
            height={item.size}
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  )
}

export default Social
