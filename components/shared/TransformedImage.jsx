import React from 'react'
import { Button } from '../ui/button'
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/constants'

const TransformedImage = ({image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transConfig,
    hasDownload}) => {
  return (
    <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
        <h1 className='text-lg text-orange-1 font-semibold'>Transformed Photo</h1>

            <p className='w-fit py-1 px-2'>Download</p>
        </div>
        <div className='w-72 h-52 border '>

        {
            image?.publicId ? (
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={image?.publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl}
                  className="w-72 h-52"
                  background={'blue'}
                  onLoad={()=>(
                    isTransforming && setIsTransforming(false)
            )}
            onError={()=>(
                debounce(()=>(
                    isTransforming && setIsTransforming(false)

                ),8000)
            )}
            {...transConfig}
                />
              </div>
                ) : (
                    <div>Not photo</div>
                    )
                }


    </div>
    </div>
  )
}

export default TransformedImage