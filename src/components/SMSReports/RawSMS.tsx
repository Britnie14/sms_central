import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Adjust the path if necessary
import { collection, onSnapshot } from "firebase/firestore";

interface DeclinedMessage {
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

const RawSMS: React.FC = () => {
  const [messages, setMessages] = useState<DeclinedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const responseCollection = collection(db, "sms_received");

    const unsubscribe = onSnapshot(responseCollection, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DeclinedMessage[];

      const declinedMessages = messagesList.filter(
        (message) => message.status === "Declined"
      );

      setMessages(declinedMessages);
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Clean up listener when component unmounts
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Declined SMS Messages</h2>
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
              <th className="p-3 border-b border-gray-300 text-left font-semibold">Response</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="p-3 border-b border-gray-300">{message.sender}</td>
                <td className="p-3 border-b border-gray-300">{message.message}</td>
                <td className="p-3 border-b border-gray-300">{new Date(message.timestamp).toLocaleString()}</td>
                <td className="p-3 border-b border-gray-300">{message.incidentType || "N/A"}</td>
                <td className="p-3 border-b border-gray-300">{message.barangay || "N/A"}</td>
                <td className="p-3 border-b border-gray-300">{message.colorCode || "N/A"}</td>
                <td className="p-3 border-b border-gray-300">{message.actionRespond || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No declined messages found.</div>
      )}
    </div>
  );
};

export default RawSMS;
