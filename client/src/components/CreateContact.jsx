import React, { useState } from 'react';

function CreateContact({ onCreateContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }

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
        <div>
          <label htmlFor="name">
            Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">
            Email <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profession">Profession</label>
          <input
            id="profession"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default CreateContact;
