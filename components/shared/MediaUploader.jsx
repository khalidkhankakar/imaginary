'use client'
import { dataUrl, getImageSize } from '@/constants';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

const MediaUploader = ({  
  onValueChange,
  setImage,
  image,
  publicId,
  type}) => {

  const onUploadSuccessHandler = (result) => {
    setImage((prevState) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    onValueChange(result?.info?.public_id)

    // toast({
    //   title: 'Image uploaded successfully',
    //   description: '1 credit was deducted from your account',
    //   duration: 5000,
    //   className: 'success-toast' 
    // })
  }

  //   const onUploadErrorHandler = () => {
  //     toast({
  //       title: 'Something went wrong while uploading',
  //       description: 'Please try again',
  //       duration: 5000,
  //       className: 'error-toast' 
  //     })
  //   }
  return (
    <CldUploadWidget
      uploadPreset="3k_imaginary"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
    //   onError={onUploadErrorHandler}
    >
 {({ open }) => (
        <div className="flex flex-col gap-4">
          <h1 className='text-lg text-orange-1 font-semibold'>Original</h1>
          {publicId ? (
            <>
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage 
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl}
                className="w-72 h-52"
              />
            </div>
          </>
          ): (
            <>
              <div onClick={() => open()} className='w-72 h-52 border dark:border-slate-300 border-gray-300 rounded-lg flex justify-center items-center '>
                <p className='text-sm cursor-pointer'>Add Image</p>
              </div>
              </>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader