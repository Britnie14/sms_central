// Contacts.js

// Import the necessary Firestore functions
import { db } from './firebaseConfig.js'; // Adjust the path to your firebaseConfig file
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

// Firestore collection reference
const contactsCollection = collection(db, "Contacts");

// Function to create a new contact
export const createContact = async (contactData) => {
  try {
    const docRef = await addDoc(contactsCollection, contactData);
    console.log("Contact created with ID: ", docRef.id);
    return docRef.id; // Return the ID of the created contact
  } catch (error) {
    console.error("Error adding contact: ", error);
    throw error;
  }
};

// Function to update a contact by ID
export const updateContact = async (id, updatedData) => {
  try {
    const contactDoc = doc(db, "Contacts", id);
    await updateDoc(contactDoc, updatedData);
    console.log("Contact updated with ID: ", id);
  } catch (error) {
    console.error("Error updating contact: ", error);
    throw error;
  }
};

// Function to patch (partially update) a contact by ID
export const patchContact = async (id, partialData) => {
  try {
    const contactDoc = doc(db, "Contacts", id);
    await updateDoc(contactDoc, partialData); // Use updateDoc to apply partial updates
    console.log("Contact patched with ID: ", id);
  } catch (error) {
    console.error("Error patching contact: ", error.message);
    throw error; // Re-throw the error for handling in the route
  }
};

// Function to delete a contact by ID
export const deleteContact = async (id) => {
  try {
    const contactDoc = doc(db, "Contacts", id);
    await deleteDoc(contactDoc);
    console.log("Contact deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting contact: ", error);
    throw error;
  }
};

// Function to fetch all contacts
export const fetchContacts = async () => {
  try {
    const snapshot = await getDocs(contactsCollection);
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
};

// Function to get a single contact by ID
export const getContactById = async (id) => {
  try {
    const contactDoc = doc(db, "Contacts", id);
    const docSnap = await getDoc(contactDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting contact: ", error);
    throw error;
  }
};
