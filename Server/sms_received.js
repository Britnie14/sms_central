// Import the necessary Firestore functions
import { db } from './firebaseConfig.js'; // Adjust the path to your firebaseConfig file
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

// Firestore collection reference
const smsReceivedCollection = collection(db, "sms_received");

// Function to create a new SMS received record
export const createSmsReceived = async (smsData) => {
  try {
    const docRef = await addDoc(smsReceivedCollection, smsData);
    console.log("SMS received record created with ID: ", docRef.id);
    return docRef.id; // Return the ID of the created record
  } catch (error) {
    console.error("Error adding SMS received record: ", error);
    throw error;
  }
};

// Function to update an SMS received record by ID
export const updateSmsReceived = async (id, updatedData) => {
  try {
    const smsDoc = doc(db, "sms_received", id);
    await updateDoc(smsDoc, updatedData);
    console.log("SMS received record updated with ID: ", id);
  } catch (error) {
    console.error("Error updating SMS received record: ", error);
    throw error;
  }
};

// Function to patch (partially update) an SMS received record by ID
export const patchSmsReceived = async (id, partialData) => {
  try {
    const smsDoc = doc(db, "sms_received", id);
    await updateDoc(smsDoc, partialData); // Update only the fields provided in partialData
    console.log("SMS received record partially updated with ID: ", id);
  } catch (error) {
    console.error("Error partially updating SMS received record: ", error);
    throw error;
  }
};

// Function to delete an SMS received record by ID
export const deleteSmsReceived = async (id) => {
  try {
    const smsDoc = doc(db, "sms_received", id);
    await deleteDoc(smsDoc);
    console.log("SMS received record deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting SMS received record: ", error);
    throw error;
  }
};

// Function to fetch all SMS received records
export const fetchSmsReceived = async () => {
  try {
    const snapshot = await getDocs(smsReceivedCollection);
    const smsRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return smsRecords;
  } catch (error) {
    console.error("Error fetching SMS received records: ", error);
    throw error;
  }
};

// Function to get a single SMS received record by ID
export const getSmsReceivedById = async (id) => {
  try {
    const smsDoc = doc(db, "sms_received", id);
    const docSnap = await getDoc(smsDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null; // Document not found
    }
  } catch (error) {
    console.error("Error getting SMS received record: ", error);
    throw error;
  }
};
