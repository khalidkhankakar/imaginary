import React from 'react'

const Header = ({title,
    subTitle}) => {
  return (
    <header className='mx-12 md:mt-12 mt-6 space-y-3'>
        <h1 className='font-semibold text-orange-1 leading-5 text-xl md:text-2xl tracking-wider '>{title}</h1>
        <p className='text-[12px] md:text-[14px] tracking-wide '>{subTitle}</p>
    </header>
  )
}

export default Header