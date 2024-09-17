'use server'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { profileSchema, validateWithZodSchema, imageSchema } from './schema';
// import { uploadImage } from './supabase';
import { error } from 'console';
import db from './db';

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};
  

export const createProfileAction = async (
    prevState: any,
    formData: FormData
  ) => {
    try {
      const user = await currentUser();
      if (!user) throw new Error('Please login to create new account!')
      const rawData = Object.fromEntries(formData);
       const validateFields = profileSchema.parse(rawData)
       
       await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          profileImage: user.imageUrl ?? '',
          ...validateFields,
        } 
       });
       await clerkClient.users.updateUserMetadata(user.id, {
          privateMetadata:{
            hasProfile: true,
          }
       })
    } catch (error) {
        
      return { message: error instanceof Error? error.message: "Error occured!"}
    }
    redirect('/');
  };

  export const fetchProfileImage = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const profile = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    });
  
    return profile?.profileImage;
  };

  export const fetchProfile = async () => {
    const user = await getAuthUser();
    const profile = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!profile) redirect('/profile/create');
    return profile;
  };

  const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  };

  export const updateProfileAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
  
    try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(profileSchema, rawData);
  
      await db.user.update({
        where: {
          clerkId: user.id,
        },
        data: validatedFields,
      });
  
      revalidatePath('/profile');
      return { message: 'Profile updated successfully' };
    } catch (error) {
      return renderError(error);
    }
  };

  export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
      const image = formData.get('image') as File;
      const validatedFields = validateWithZodSchema(imageSchema, { image });
      // const fullPath = await uploadImage(validatedFields.image);
  
      // await db.profile.update({
      //   where: {
      //     clerkId: user.id,
      //   },
      //   data: {
      //     profileImage: fullPath,
      //   },
      // });
      // revalidatePath('/profile');
      return { message: 'Profile image updated successfully' };
    } catch (error) {
      return renderError(error);
    }
  };