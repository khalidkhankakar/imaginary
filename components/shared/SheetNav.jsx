'use client'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./ModeToggle"
import { Menu } from "lucide-react"

export default function SheetNav() {
    const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-none bg-none"><Menu color="#F98A17"/></Button>
      </SheetTrigger>
      <SheetContent>
      <Link href={'/'} className='flex mt-3 items-center justify-center'>
        <Image src={'/assets/imaginary.svg'} width={200} height={20} alt="logo..." />
      </Link>
      <ul className='flex flex-col space-y-3 items-center justify-center mt-9'>
      {
          navLinks.map((nav)=>(
            <li key={nav.label}>
            <Link href={nav.route} className={`flex items-center border border-orange-1 m-auto w-56 justify-center h py-1 rounded-lg space-x-1 hover:bg-orange-1 transition-all duration-500 ${(pathname === nav.route) && 'bg-orange-1'}  `}>
              <Image src={nav.icon} width={50} height={50} className='h-5 w-5 ' />
              <p className='text-[16px]'>{nav.label}</p>
            </Link>
          </li>
          ))
        }
                      <li className={`flex items-center w-56  justify-around py-1 rounded-lg m-auto `}>
      <UserButton afterSignOutUrl='/' />
      <ModeToggle />
      </li>
              </ul>
      </SheetContent>
    </Sheet>
  )
}
