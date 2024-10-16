// Import the necessary Firestore functions
import { db } from './firebaseConfig.js'; // Adjust the path to your firebaseConfig file
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

// Firestore collection reference
const incidentReportsCollection = collection(db, "incidentReports");

// Function to create a new incident report
export const createIncidentReport = async (reportData) => {
  try {
    const docRef = await addDoc(incidentReportsCollection, reportData);
    console.log("Incident report created with ID: ", docRef.id);
    return docRef.id; // Return the ID of the created report
  } catch (error) {
    console.error("Error adding incident report: ", error);
    throw error;
  }
};

// Function to update an incident report by ID
export const updateIncidentReport = async (id, updatedData) => {
  try {
    const reportDoc = doc(db, "incidentReports", id);
    await updateDoc(reportDoc, updatedData);
    console.log("Incident report updated with ID: ", id);
  } catch (error) {
    console.error("Error updating incident report: ", error);
    throw error;
  }
};

// Function to patch (partially update) an incident report by ID
export const patchIncidentReport = async (id, partialData) => {
  try {
    const reportDoc = doc(db, "incidentReports", id);
    await updateDoc(reportDoc, partialData); // Update only the fields provided in partialData
    console.log("Incident report partially updated with ID: ", id);
  } catch (error) {
    console.error("Error partially updating incident report: ", error);
    throw error;
  }
};

// Function to delete an incident report by ID
export const deleteIncidentReport = async (id) => {
  try {
    const reportDoc = doc(db, "incidentReports", id);
    await deleteDoc(reportDoc);
    console.log("Incident report deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting incident report: ", error);
    throw error;
  }
};

// Function to fetch all incident reports
export const fetchIncidentReports = async () => {
  try {
    const snapshot = await getDocs(incidentReportsCollection);
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return reports;
  } catch (error) {
    console.error("Error fetching incident reports: ", error);
    throw error;
  }
};

// Function to get a single incident report by ID
export const getIncidentReportById = async (id) => {
  try {
    const reportDoc = doc(db, "incidentReports", id);
    const docSnap = await getDoc(reportDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting incident report: ", error);
    throw error;
  }
};
