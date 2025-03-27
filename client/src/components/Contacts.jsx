import React from 'react';

function Contacts({ contacts, onViewContact,onDeleteContact }) {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <h3>{contact.name}</h3>
            <button onClick={() => onViewContact(contact.id)}>View</button>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button> {/* Delete button from each id */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;