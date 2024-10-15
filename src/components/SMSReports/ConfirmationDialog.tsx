import React, { useEffect, useState } from "react";

interface IncidentColor {
  type: string;
  color: string;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, incidentType: string, colorCode: string, barangay: string) => Promise<void>;
  message: string;
  selectedMessageId: string | null; // Holds the message ID
  barangay: string; // Existing barangay
  barangays: string[]; // Array of barangays
  incidentType: string; // Incident type
}

const incidentColors: IncidentColor[] = [
  { type: "Non-Emergency Incidents", color: "Green" },
  { type: "Warnings or Potential Threats", color: "Yellow" },
  { type: "Medical Emergencies", color: "Blue" },
  { type: "Critical or Life-Threatening Incidents", color: "Red" },
  { type: "Police Assistance Button", color: "Cyan Blue" },
];

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  selectedMessageId,
  barangay,
  barangays,
  incidentType, // Destructure incidentType
}) => {
  const [selectedBarangay, setSelectedBarangay] = useState<string>(barangay);
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>(incidentType); // Use the passed incidentType
  const [selectedColor, setSelectedColor] = useState<string>(
    incidentColors.find((item) => item.type === incidentType)?.color || ""
  ); // Initialize color based on incidentType

  useEffect(() => {
    setSelectedBarangay(barangay);
    setSelectedIncidentType(incidentType); // Update selectedIncidentType
  }, [barangay, incidentType]);

  const handleConfirm = async () => {
    await onConfirm(selectedMessageId!, selectedIncidentType, selectedColor, selectedBarangay); // Use selectedIncidentType
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h3 className="text-lg font-bold mb-2">Confirm Action</h3>
        <p>Are you sure you want to verify this message?</p>
        <p><strong>Message:</strong> {message}</p>

        <div className="mt-4">
          <label htmlFor="incidentType" className="block font-semibold">Incident Type:</label>
          <select
            id="incidentType"
            value={selectedIncidentType}
            onChange={(e) => {
              setSelectedIncidentType(e.target.value);
              const selectedIncident = incidentColors.find((item) => item.type === e.target.value);
              setSelectedColor(selectedIncident ? selectedIncident.color : "");
            }}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Select Incident Type</option>
            {incidentColors.map((incident) => (
              <option key={incident.type} value={incident.type}>
                {incident.type}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="barangay" className="block font-semibold">Barangay:</label>
          <select
            id="barangay"
            value={selectedBarangay}
            onChange={(e) => setSelectedBarangay(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            {barangays.map((barangay) => (
              <option key={barangay} value={barangay}>
                {barangay}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Color Code: {selectedColor}</p>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
