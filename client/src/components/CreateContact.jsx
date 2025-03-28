import React, { useState } from 'react';

function CreateContact({ onCreateContact }) {
  const [name, setName] = useState('');//  contacts 1 st table name
  const [email, setEmail] = useState('');// contacts 1 st table email
  const [phone, setPhone] = useState('');// contacts 1 st table phone
  const [notes, setNotes] = useState('');// contacts 1 st table notes
  // contact_details 2nd table joined by sql command to 1 st table contacts in server.js
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [profession, setProfession] = useState('');
  //check for error handling
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //checking required fields ,all other are optional
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }

    //Returning all for new contact

    const newContact = { 
      name, 
      email, 
      phone, 
      notes,
      street, 
      city, 
      state, 
      zip_code: zipCode, 
      profession 
    };

    //fetching data
    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create contact');
      }

      const createdContact = await response.json();
      onCreateContact(createdContact);

      // Clear all fields
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setProfession('');

      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Create New Contact</h2>
      {success && <div className="success">Contact created successfully!</div>}
      {error && <div className="error">Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name, Email, Phone, Notes Fields from 1st table */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        {/* Address Fields + profession-> from my 2nd table contact_details*/}
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default CreateContact;