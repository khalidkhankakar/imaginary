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
import { aspectRatioOptions, defaultValues } from "@/constants"
import { CustomField } from "./CustomField"

const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color:z.string().optional(),
  prompt:z.string().optional(),
  publicId:z.string()
})
// userId
const TransformationForm = ({action, data=null,type}) => {

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
        console.log(values)
      }
      const onSelectFieldHandler = (value, onChangeField)=>{
      }
      const onInputChangeHandler = (firstName, value, type,onChangeField)=>{

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
        render={({field})=> <Select                 onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
        value={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select image ratio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Aspect Ratio</SelectLabel>
            {
                Object.keys(aspectRatioOptions).map((key)=>(
                    <SelectItem key={key} value={key}>{aspectRatioOptions[key].label}</SelectItem>

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


        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default TransformationForm