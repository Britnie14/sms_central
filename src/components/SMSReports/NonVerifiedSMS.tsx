import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; 
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import ConfirmationDialog from "./ConfirmationDialog";

interface NonVerifiedMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
  incidentType: string | null;
  barangay: string | null;
  colorCode: string | null;
  status: string;
  actionRespond: string;
}

const barangays = [
  "Bagacay",
  "Central",
  "Cogon",
  "Dancalan",
  "Dapdap",
  "Lalud",
  "Looban",
  "Mabuhay",
  "Madlawon",
  "Poctol",
  "Porog",
  "Sabang",
  "Salvacion",
  "San Antonio",
  "San Bernardo",
  "San Francisco",
  "Kapangihan",
  "San Isidro",
  "San Jose",
  "San Rafael",
  "San Roque",
  "Buhang",
  "San Vicente",
  "Santa Barbara",
  "Sapngan",
  "Tinampo"
];

const NonVerifiedSMS: React.FC = () => {
  const [messages, setMessages] = useState<NonVerifiedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [selectedMessageDetails, setSelectedMessageDetails] = useState<NonVerifiedMessage | null>(null);

  useEffect(() => {
    const responseCollection = collection(db, "sms_received");

    const unsubscribe = onSnapshot(responseCollection, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NonVerifiedMessage[];

      const filteredMessages = messagesList.filter(
        (message) =>
          message.status === "Non Verified" || message.status === "Verifying"
      );

      setMessages(filteredMessages);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleVerify = async (id: string, incidentType: string, colorCode: string, barangay: string) => {
    const messageRef = doc(db, "sms_received", id);
    await updateDoc(messageRef, {
      status: "Verifying",
      incidentType,
      colorCode,
      barangay,
    });
    setDialogOpen(false);
  };

  const handleDecline = async (id: string) => {
    const messageRef = doc(db, "sms_received", id);
    await updateDoc(messageRef, { status: "Declined" });
  };

  const openDialog = (message: NonVerifiedMessage) => {
    setSelectedMessageDetails(message);
    setSelectedMessageId(message.id);
    setDialogOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Non-Verified SMS</h2>
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
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Actions</th>
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
                <td className="p-3 border-b border-gray-300">{message.actionRespond}</td>
                <td className="p-3 border-b border-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openDialog(message)}
                      className={`bg-blue-500 text-white px-4 py-2 rounded ${message.status === "Verifying" ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={message.status === "Verifying"}
                    >
                      Verify
                    </button>
                    <button onClick={() => handleDecline(message.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No non-verified messages found.</div>
      )}

      {/* Confirmation Dialog */}
      {selectedMessageDetails && (
        <ConfirmationDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleVerify}
          message={selectedMessageDetails.message}
          incidentType={selectedMessageDetails.incidentType || ""}
          selectedMessageId={selectedMessageId}
          barangay={selectedMessageDetails.barangay || ""}
          barangays={barangays} // Pass the barangays array
        />
      )}
    </div>
  );
};

export default NonVerifiedSMS;
