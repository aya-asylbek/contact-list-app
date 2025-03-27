import React from 'react';

function ViewContact({ contact }) {
  return (
    <div>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Notes: {contact.notes}</p>
      <p>Address: {contact.street}, {contact.city}, {contact.state} {contact.zip_code}</p>
      <p>Profession: {contact.profession}</p>
    </div>
  );
}

export default ViewContact;
