'use client'
import { navLinks } from '@/constants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <div className='col-span-3 dark:bg-dark-3 bg-light-2 min-h-screen hidden md:flex flex-col '>
      <Link href={'/'} className='flex mt-9 items-center justify-center'>
        <Image src={'/assets/IMAGINARY.svg'} width={200} height={20} alt="logo..." />
      </Link>
      <ul className='flex flex-col space-y-3 items-center justify-center mt-9'>
        {
          navLinks.slice(0,6).map((nav)=>(
            <li key={nav.label}>
            <Link href={nav.route} className={`flex items-center border border-orange-1 lg:w-56 md:w-40 justify-center h py-1 rounded-lg space-x-2 hover:bg-orange-1 transition-all duration-500 ${(pathname === nav.route) && 'bg-orange-1'}  `}>
              <Image src={nav.icon} width={50} height={50} className='h-5 w-5 ' />
              <p className='lg:text-[16px] md:text-[15px]'>{nav.label}</p>
            </Link>
          </li>
          ))
        }
              <li className={`flex items-center w-56  justify-around py-1 rounded-lg m-auto `}>
      <UserButton afterSignOutUrl='/' />
      <ModeToggle />
      </li>
      </ul>

      <ul className='flex flex-col space-y-3 items-center justify-center my-5 '>
      {
          navLinks.slice(6).map((nav)=>(
            <li key={nav.label}>
            <Link href={nav.route} className={`flex   items-center border border-orange-1 lg:w-56 md:w-40 justify-center h py-1 rounded-lg space-x-2 hover:bg-orange-1 transition-all duration-500 ${(pathname === nav.route) && 'bg-orange-1'}  `}>
              <Image src={nav.icon} width={50} height={50} className='h-5 w-5 ' />
              <p className='text-[16px]'>{nav.label}</p>
            </Link>
          </li>
          ))
        }
        </ul>
    </div>
  )
}

export default Sidebar