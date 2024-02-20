'use server'

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/connect";
import Image from "../database/models/image.models";
import User from "../database/models/user.models";


export const addImage = async (image, userId, path)=>{
    try {
        await connectToDatabase()
        const author = await User.findById(userId)
        if(!author){
            throw new Error('author not found')
        }
        const addedImage = await Image.create({
            ...image,
            author: author._id
        })
        revalidatePath(path)
        return JSON.parse(JSON.stringify(addedImage))
    } catch (error) {
        console.log(error);
    }
}


export const updateImage = async (image, userId, path)=>{
    try {
        await connectToDatabase()
        const imageToUpate = await Image.findById(image._id)
        if(!imageToUpate || imageToUpate.author.toHexString() !== userId){
            throw new Error('unauthorizaed and pic not found')
        }
        const updateImage = await Image.findByIdUpdate(
            imageToUpate._id,
            image,
            {new: true}
        )
        revalidatePath(path)
        return JSON.parse(JSON.stringify(updateImage))
    } catch (error) {
        console.log(error);
    }
}

export const populateUser = (query) =>{
    const data = query.popluate({
        path: 'author',
        model: User,
        select: '_id firstName lastName clerkId'
    })
    return data
}

export const getImage = async (imageId)=>{
    try {
        await connectToDatabase()
        const getUserAndImageData = await populateUser(Image.findById(imageId))

        return JSON.parse(JSON.stringify(getUserAndImageData))
    } catch (error) {
        console.log(error);
    }
}

