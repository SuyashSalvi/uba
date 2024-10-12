'use server'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { profileSchema, validateWithZodSchema, imageSchema, projectSchema } from './schema';
import { uploadImage } from './firestore';
// import { uploadImage } from './supabase';
import { error } from 'console';
import db from './db';

// getAuthUser action
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};
  


// createProfileAction action
export const createProfileAction = async (
    prevState: any,
    formData: FormData
  ) => {
    try {
      const cur_user = await currentUser();
      if (!cur_user) throw new Error('Please login to create new account!')
      const rawData = Object.fromEntries(formData);
       const validateFields = profileSchema.parse(rawData)
       
       await db.user.create({
        data: {
          clerkId: cur_user.id,
          email: cur_user.emailAddresses[0].emailAddress,
          profileImage: cur_user.imageUrl ?? '',
          ...validateFields,
        } 
       });
      //  await clerkClient.users.updateUserMetadata(cur_user.id, {
      //     privateMetadata:{
      //       hasProfile: true,
      //     }
      //  })
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

  export const fetchProjectDetails = (id: string) => {
    return db.project.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  };




  export const fetchProjects = async () => {
    const user = await getAuthUser();
    const projects = await db.project.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  
    // const rentalsWithBookingSums = await Promise.all(
    //   rentals.map(async (rental) => {
    //     const totalNightsSum = await db.booking.aggregate({
    //       where: {
    //         propertyId: rental.id,
    //         paymentStatus: true,
    //       },
    //       _sum: {
    //         totalNights: true,
    //       },
    //     });
  
    //     const orderTotalSum = await db.booking.aggregate({
    //       where: {
    //         propertyId: rental.id,
    //         paymentStatus: true,
    //       },
    //       _sum: {
    //         orderTotal: true,
    //       },
    //     });
  
    //     return {
    //       ...rental,
    //       totalNightsSum: totalNightsSum._sum.totalNights,
    //       orderTotalSum: orderTotalSum._sum.orderTotal,
    //     };
    //   })
    // );
    
    return projects;
    // return rentalsWithBookingSums;
  };


  export async function deleteProjectAction(prevState: { projectId: string }) {
    const { projectId } = prevState;
    const user = await getAuthUser();
  
    try {
      await db.project.delete({
        where: {
          id: projectId,
          userId: user.id,
        },
      });
  
      revalidatePath('/projects');
      return { message: 'Project deleted successfully' };
    } catch (error) {
      return renderError(error);
    }
  }


  export const createProjectAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    console.log("createProjectAction")
    try {
      const rawData = Object.fromEntries(formData);
      const file = formData.get('image') as File;
      console.log(rawData);
  
      const validatedFields = validateWithZodSchema(projectSchema, rawData);
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      const fullPath = await uploadImage(validatedFile.image);
      
      console.log(validatedFields)
      await db.project.create({
        data: {
          ...validatedFields,
          image: fullPath,
          userId: user.id,
        },
      });
    } catch (error) {
      return renderError(error);
    }
    redirect('/');
  };


  export const updateProjectImageAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    const propertyId = formData.get('id') as string;
  
    try {
      const image = formData.get('image') as File;
      const validatedFields = validateWithZodSchema(imageSchema, { image });
      const fullPath = await uploadImage(validatedFields.image);
  
      await db.project.update({
        where: {
          id: propertyId,
          userId: user.id,
        },
        data: {
          image: fullPath,
        },
      });
      revalidatePath(`/rentals/${propertyId}/edit`);
      return { message: 'Property Image Updated Successful' };
    } catch (error) {
      return renderError(error);
    }
  };


  export const updateProjectAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    const propertyId = formData.get('id') as string;
  
    try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(projectSchema, rawData);
      await db.project.update({
        where: {
          id: propertyId,
          userId: user.id,
        },
        data: {
          ...validatedFields,
        },
      });
  
      revalidatePath(`/rentals/${propertyId}/edit`);
      return { message: 'Update Successful' };
    } catch (error) {
      return renderError(error);
    }
  };