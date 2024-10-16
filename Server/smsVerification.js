// Import the necessary Firestore functions
import { db } from './firebaseConfig.js'; // Adjust the path to your firebaseConfig file
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

// Firestore collection reference
const smsVerificationCollection = collection(db, "sms_verification");

// Function to create a new SMS verification record
export const createSmsVerification = async (smsData) => {
  try {
    const docRef = await addDoc(smsVerificationCollection, smsData);
    console.log("SMS verification record created with ID: ", docRef.id);
    return docRef.id; // Return the ID of the created record
  } catch (error) {
    console.error("Error adding SMS verification record: ", error);
    throw error;
  }
};

// Function to update an SMS verification record by ID
export const updateSmsVerification = async (id, updatedData) => {
  try {
    const smsDoc = doc(db, "sms_verification", id);
    await updateDoc(smsDoc, updatedData);
    console.log("SMS verification record updated with ID: ", id);
  } catch (error) {
    console.error("Error updating SMS verification record: ", error);
    throw error;
  }
};

// Function to patch (partially update) an SMS verification record by ID
export const patchSmsVerification = async (id, partialData) => {
  try {
    const smsDoc = doc(db, "sms_verification", id);
    await updateDoc(smsDoc, partialData); // Update only the fields provided in partialData
    console.log("SMS verification record partially updated with ID: ", id);
  } catch (error) {
    console.error("Error partially updating SMS verification record: ", error);
    throw error;
  }
};

// Function to delete an SMS verification record by ID
export const deleteSmsVerification = async (id) => {
  try {
    const smsDoc = doc(db, "sms_verification", id);
    await deleteDoc(smsDoc);
    console.log("SMS verification record deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting SMS verification record: ", error);
    throw error;
  }
};

// Function to fetch all SMS verification records
export const fetchSmsVerifications = async () => {
  try {
    const snapshot = await getDocs(smsVerificationCollection);
    const smsRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return smsRecords;
  } catch (error) {
    console.error("Error fetching SMS verification records: ", error);
    throw error;
  }
};

// Function to get a single SMS verification record by ID
export const getSmsVerificationById = async (id) => {
  try {
    const smsDoc = doc(db, "sms_verification", id);
    const docSnap = await getDoc(smsDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null; // Document not found
    }
  } catch (error) {
    console.error("Error getting SMS verification record: ", error);
    throw error;
  }
};
