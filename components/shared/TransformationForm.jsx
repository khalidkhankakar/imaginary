"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { aspectRatioOptions, debounce, deepMergeObjects, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { startTransition, useEffect, useState } from "react"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { getCldImageUrl } from "next-cloudinary"

const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color:z.string().optional(),
  prompt:z.string().optional(),
  publicId:z.string()
})
// userId
const TransformationForm = ({userId,action, data=null,type,creditBalance, config=null}) => {
  const transformationType = transformationTypes[type];

  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState(null)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transConfig, setTransConfig] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  
    const initialValues = data && action === 'update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color:data?.color,
        prompt:data?.prompt,
        publicId:data?.publicId,
    } : defaultValues;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:initialValues
      })
      function onSubmit(values) {
        // console.log(values)
        if(image) {
          const transformationUrl = getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transConfig
          })
          console.log(transformationUrl);
          setImage({...image, publicId:transformationUrl})
      }
      // console.log(image);
      }


      const onSelectFieldHandler = (value, onChangeField)=>{
        let imageSize = aspectRatioOptions[value];
        console.log(imageSize);
        setImage((prevState)=>({
          ...prevState,
          aspectRatio: imageSize.aspectRatio,
          width: imageSize.width,
          height: imageSize.height,
        }))
        setNewTransformation(transformationType.config);
        return onChangeField(value)
      }


      const onTransformHandler = async () => {
        setIsTransforming(true)
        setTransConfig(
          deepMergeObjects(newTransformation, transConfig)
        )
        setNewTransformation(null)
      }
    
      useEffect(() => {
        if(image && (type === 'restore' || type === 'removeBackground')) {
          setNewTransformation(transformationType.config)
        }
      }, [image, transformationType.config, type])

      const onInputChangeHandler = (fieldName, value, type,onChangeField)=>{
        debounce(() => {
          setNewTransformation((prevState) => ({
            ...prevState,
            [type]: {
              ...prevState?.[type],
              [fieldName === 'prompt' ? 'prompt' : 'to' ]: value 
            }
          }))
        }, 1000)();
          
        return onChangeField(value)
      }
  return (
    <div className='mx-12 mt-2 md:-3'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CustomField 
        control={form.control}
        name={'title'}
        formLabel={'Image title'}
        render={({field})=> <Input {...field} />}
        />
        
    {
        type === 'fill' && <CustomField 
        control={form.control}
        name={'aspectRatio'}
        formLabel={'Aspect Ratio'}
        render={({field})=> 
        <Select  
        onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
        value={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select image ratio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Aspect Ratio</SelectLabel>
            {
                Object.keys(aspectRatioOptions).map((key)=>(
                    <SelectItem key={key} value={aspectRatioOptions[key].aspectRatio}>{aspectRatioOptions[key].label}</SelectItem>

                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>}
        />
    }

    {
        (type === 'remove' || type === 'recolor') &&         <CustomField 
        control={form.control}
        name={'prompt'}
        formLabel={type=== 'remove'? 'Object to remove':'Object to recolor'}
        render={({ field }) => (
            <Input 
              value={field.value}
              className="input-field"
              onChange={(e) => onInputChangeHandler(
                'prompt',
                e.target.value,
                type,
                field.onChange
              )}
            />
          )}
        />
    }
        {
        ( type === 'recolor') &&  <CustomField 
        control={form.control}
        name={'color'}
        formLabel={'Replace Color'}
        render={({ field }) => (
            <Input 
              value={field.value}
              onChange={(e) => onInputChangeHandler(
                'color',
                e.target.value,
                'recolor',
                field.onChange
              )}
            />
          )}
        />
    }
        <div className="flex flex-col lg:flex-row items-center  lg:space-x-3 lg:space-y-0 space-x-3 ">
          <CustomField 
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader 
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

<TransformedImage image={image} type={type} title={form.getValues().title} isTransforming={isTransforming} setIsTransforming={setIsTransforming} transConfig={transConfig} hasDownload={false} />
</div>


<div className="flex flex-col gap-4">
          <Button 
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>
          <Button 
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>

    </div>
  )
}

export default TransformationForm