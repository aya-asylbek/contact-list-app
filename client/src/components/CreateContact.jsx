// src/components/CreateContact.js
import React, { useState } from 'react';

function CreateContact({ onCreateContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, email, phone, notes };

//I am sending new contact to my server

    onCreateContact(newContact);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <div>
      <h2>Create New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default CreateContact;
