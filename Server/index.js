import express from 'express';

import {
  createUser, // Changed from createUsers to createUser
  updateUser, // Changed from updateUsers to updateUser
  deleteUser, // Changed from deleteUsers to deleteUser
  fetchUsers,
  getUserById // Changed from getUsersById to getUserById
} from './Users.js'; // Import Users functions

import {
  createContact,
  updateContact,
  deleteContact,
  fetchContacts,
  getContactById
} from './Contacts.js'; // Import Contacts functions

import {
  createIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
  fetchIncidentReports,
  getIncidentReportById
} from './IncidentReports.js'; // Import Incident Reports functions

import {
  createSmsReceived,
  updateSmsReceived,
  deleteSmsReceived,
  fetchSmsReceived,
  getSmsReceivedById
} from './sms_received.js'; // Import SMS received functions

import {
  createSmsVerification,
  updateSmsVerification,
  deleteSmsVerification,
  fetchSmsVerifications,
  getSmsVerificationById
} from './smsVerification.js'; // Import SMS verification functions

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// --- Users Routes ---

// POST route to create a new user
app.post('/users', async (req, res) => {
  try {
    const userId = await createUser(req.body); // Use createUser from Users.js
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// GET route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// GET route to fetch a specific user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id); // Use getUserById from Users.js
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// PUT route to update an existing user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateUser(id, req.body); // Use updateUser from Users.js
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// PATCH route to partially update an existing user by ID
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await patchUser(id, req.body); // Use patchUser from Users.js
    res.status(200).json({ message: 'User partially updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error partially updating user' });
  }
});

// DELETE route to delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id); // Use deleteUser from Users.js
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// --- Contacts Routes ---

// POST route to create a new contact
app.post('/contacts', async (req, res) => {
  try {
    const contactId = await createContact(req.body);
    res.status(201).json({ id: contactId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating contact' });
  }
});

// GET route to fetch all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await fetchContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// GET route to fetch a specific contact by ID
app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact' });
  }
});

// PUT route to update an existing contact by ID
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateContact(id, req.body);
    res.status(200).json({ message: 'Contact updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating contact' });
  }
});

// PATCH route to partially update an existing contact by ID
app.patch('/contacts/:id', async (req, res) => {
    const { id } = req.params;  // Extract the contact ID from the request parameters
    try {
        await patchContact(id, req.body);  // Call the patchContact function with the ID and partial data
        res.status(200).json({ message: 'Contact partially updated' });
    } catch (error) {
        // Send a detailed error message back to the client
        res.status(500).json({ error: 'Error partially updating contact', message: error.message });
    }
});

// DELETE route to delete a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteContact(id);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

// --- Incident Reports Routes ---

// POST route to create a new incident report
app.post('/incident-reports', async (req, res) => {
  try {
    const reportId = await createIncidentReport(req.body);
    res.status(201).json({ id: reportId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating incident report' });
  }
});

// GET route to fetch all incident reports
app.get('/incident-reports', async (req, res) => {
  try {
    const reports = await fetchIncidentReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching incident reports' });
  }
});

// GET route to fetch a specific incident report by ID
app.get('/incident-reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const report = await getIncidentReportById(id);
    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: 'Incident report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching incident report' });
  }
});

// PUT route to update an existing incident report by ID
app.put('/incident-reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateIncidentReport(id, req.body);
    res.status(200).json({ message: 'Incident report updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating incident report' });
  }
});

// PATCH route to partially update an existing incident report by ID
app.patch('/incident-reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateIncidentReport(id, req.body);
    res.status(200).json({ message: 'Incident report partially updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating incident report' });
  }
});

// DELETE route to delete an incident report by ID
app.delete('/incident-reports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteIncidentReport(id);
    res.status(200).json({ message: 'Incident report deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting incident report' });
  }
});

// --- SMS Received Routes ---

// POST route to create a new SMS received record
app.post('/sms-received', async (req, res) => {
  try {
    const smsId = await createSmsReceived(req.body);
    res.status(201).json({ id: smsId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating SMS received record' });
  }
});

// GET route to fetch all SMS received records
app.get('/sms-received', async (req, res) => {
  try {
    const smsRecords = await fetchSmsReceived();
    res.status(200).json(smsRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching SMS received records' });
  }
});

// GET route to fetch a specific SMS received record by ID
app.get('/sms-received/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const smsRecord = await getSmsReceivedById(id);
    if (smsRecord) {
      res.status(200).json(smsRecord);
    } else {
      res.status(404).json({ error: 'SMS received record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching SMS received record' });
  }
});

// PUT route to update an existing SMS received record by ID
app.put('/sms-received/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateSmsReceived(id, req.body);
    res.status(200).json({ message: 'SMS received record updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating SMS received record' });
  }
});

// PATCH route to partially update an existing SMS received record by ID
app.patch('/sms-received/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateSmsReceived(id, req.body);
    res.status(200).json({ message: 'SMS received record partially updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating SMS received record' });
  }
});

// DELETE route to delete an SMS received record by ID
app.delete('/sms-received/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSmsReceived(id);
    res.status(200).json({ message: 'SMS received record deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting SMS received record' });
  }
});

// --- SMS Verification Routes ---

// POST route to create a new SMS verification record
app.post('/sms-verifications', async (req, res) => {
  try {
    const verificationId = await createSmsVerification(req.body);
    res.status(201).json({ id: verificationId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating SMS verification record' });
  }
});

// GET route to fetch all SMS verification records
app.get('/sms-verifications', async (req, res) => {
  try {
    const verifications = await fetchSmsVerifications();
    res.status(200).json(verifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching SMS verification records' });
  }
});

// GET route to fetch a specific SMS verification record by ID
app.get('/sms-verifications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const verification = await getSmsVerificationById(id);
    if (verification) {
      res.status(200).json(verification);
    } else {
      res.status(404).json({ error: 'SMS verification record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching SMS verification record' });
  }
});

// PUT route to update an existing SMS verification record by ID
app.put('/sms-verifications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateSmsVerification(id, req.body);
    res.status(200).json({ message: 'SMS verification record updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating SMS verification record' });
  }
});

// PATCH route to partially update an existing SMS verification record by ID
app.patch('/sms-verifications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await updateSmsVerification(id, req.body);
    res.status(200).json({ message: 'SMS verification record partially updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating SMS verification record' });
  }
});

// DELETE route to delete an SMS verification record by ID
app.delete('/sms-verifications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSmsVerification(id);
    res.status(200).json({ message: 'SMS verification record deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting SMS verification record' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
