import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import RespondDialog from './RespondDialog'; // Adjust the import path as needed

interface VerifiedMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
  incidentType: string | null;
  barangay: string | null;
  colorCode: string | null;
  status: string;
  response: string | null;
}

const VerifiedSMS: React.FC = () => {
  const [messages, setMessages] = useState<VerifiedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<VerifiedMessage | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "sms_received"), where("status", "==", "Verified")),
      (snapshot) => {
        const messagesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as VerifiedMessage[];

        setMessages(messagesList);
        setLoading(false); // Set loading to false once data is fetched
      },
      (error) => {
        console.error("Error fetching verified messages:", error);
        setLoading(false); // Ensure loading is false on error
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleOpenDialog = (message: VerifiedMessage) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  const handleSelectContact = (contact: any) => { // Change 'Contact' to 'any' or define it according to your needs
    // Handle the selected contact and use the passed information
    console.log("Selected contact:", contact);
    console.log("Message:", selectedMessage?.message);
    console.log("Barangay:", selectedMessage?.barangay);
    console.log("Incident Type:", selectedMessage?.incidentType);
    console.log("Timestamp:", selectedMessage?.timestamp);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Verified SMS</h2>
      {messages.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Sender</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Message</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Timestamp</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Incident Type</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Barangay</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Color</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Status</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Response</th>
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="p-3 border-b border-gray-300">{message.sender}</td>
                <td className="p-3 border-b border-gray-300">{message.message}</td>
                <td className="p-3 border-b border-gray-300">{new Date(message.timestamp).toLocaleString()}</td>
                <td className="p-3 border-b border-gray-300">{message.incidentType}</td>
                <td className="p-3 border-b border-gray-300">{message.barangay}</td>
                <td className="p-3 border-b border-gray-300">{message.colorCode}</td>
                <td className="p-3 border-b border-gray-300">{message.status}</td>
                <td className="p-3 border-b border-gray-300">{message.response || "N/A"}</td>
                <td className="p-3 border-b border-gray-300">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleOpenDialog(message)}>
                    Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No verified messages found.</p>
      )}
      {selectedMessage && (
        <RespondDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSelect={handleSelectContact}
          message={selectedMessage.message}
          barangay={selectedMessage.barangay || ""}
          incidentType={selectedMessage.incidentType || null}
          timestamp={selectedMessage.timestamp}
          messageId={selectedMessage.id} // Now always a string
        />
      )}
    </div>
  );
};

export default VerifiedSMS;
