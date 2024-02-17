import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Add = async ({params}) => {
  const {userId} = auth();
  if(!userId){
    redirect('/sign-in')
  }
  // const user = await getUserById(userId)
  const transformation = transformationTypes[params.id]
  return (
    <>
    <Header title={transformation.title} subTitle={transformation.subTitle} />
    {/* userId={user._id} */}
    <TransformationForm type={params.id}  />
    </>
  )
}

export default Add