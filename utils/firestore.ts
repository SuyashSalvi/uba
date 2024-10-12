import { v4 as uuidv4 } from 'uuid'; // For unique file names
import { storage, db } from "@/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";



const bucket = process.env.FIREBASE_PROJECT_ID; // Typically your Firebase project ID

export const uploadImage = async (image: File) => {
  const newName = `${Date.now()}-${uuidv4()}-${image.name}`;

  // Create a storage reference
  const storageRef = ref(storage, `${bucket}/${newName}`);

  try {
    // Upload the image to Firebase Storage
    const snapshot = await uploadBytes(storageRef, image);

    // Get the public URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save the image URL in Firestore along with metadata
    const docRef = doc(db, "projects", uuidv4()); // Generate a unique ID for the document
    await setDoc(docRef, {
      imageUrl: downloadURL,
      fileName: newName,
      uploadedAt: new Date(),
    });

    console.log('Image uploaded and Firestore document created');

    return downloadURL; // Return the public URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Image upload failed');
  }
};
