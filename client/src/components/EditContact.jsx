import React, { useState, useEffect } from 'react';

function EditContact({ contact, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    profession: ''
  });


  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        notes: contact.notes || '',
        street: contact.street || '',
        city: contact.city || '',
        state: contact.state || '',
        zip_code: contact.zip_code || '',
        profession: contact.profession || ''
      });
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name and Email are required!');
      return;
    }
    
    onUpdate({ ...formData, id: contact.id });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <input
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          name="zip_code"
          placeholder="Zip Code"
          value={formData.zip_code}
          onChange={handleChange}
        />
        <input
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditContact;