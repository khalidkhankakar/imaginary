import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import SheetNav from './SheetNav'

const MobileNavigation = () => {
  return (
    <div className='flex items-center justify-between px-2 sm:px-0  sm:justify-around  bg-light-2 dark:bg-dark-3 border-b border-gray-300 dark:border-slate-300 shadow-lg  md:hidden py-3 '>
            <Link href={'/'} className='flex items-center justify-center'>
        <Image src={'/assets/imaginary.svg'} width={200} height={20} alt="logo..." />
      </Link>
      <div className='flex items-center space-x-1'>
      <UserButton afterSignOutUrl='/' />
      <SheetNav />
      </div>

    </div>
  )
}

export default MobileNavigation