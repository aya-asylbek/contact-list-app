import { useState, useEffect } from 'react';
import './App.css';
import Contacts from './components/Contacts'; 
import ViewContact from './components/ViewContact'; 
import CreateContact from './components/CreateContact'; 
import EditContact from './components/EditContact';


function App() {
  const [contacts, setContacts] = useState([]); // State to hold all contacts 
  const [isLoading, setIsLoading] = useState(true); // State to check if data is loading
  const [error, setError] = useState(null); // State to hold error messages
  const [viewingContact, setViewingContact] = useState(null); // State to check the selected contact for details by id
  const [editingContact, setEditingContact] = useState(null);//to edit 
  // Fetch contacts from backend (my file in backend server.js)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  
 //delete button adding (will be on each ID)
 const handleDelete = async (contactID) => {
  try {
    const response = await fetch(`http://localhost:5000/contacts/${contactID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    setContacts(contacts.filter((contact) => contact.id !== contactID));
  } catch (err) {
    setError(err.message);
  }
};

  //call to backend to view contacts/by id `http://localhost:5000/contactID`
  //ind.contact use join + contact_details,save response {obj} and render response to a view contact
  //  contact to be viewed by specific ID

  const handleViewContact = async (contactID) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${contactID}`);//by id
      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }
      const contact = await response.json();
      setViewingContact(contact);
      setEditingContact(null); // reset set of editing 
    } catch (err) {
      setError(err.message);
    }
  };
  
//create contact
  const handleCreateContact = (newContact) => {
    setContacts([...contacts, newContact]); // Add new contact to the list
  };

 // Updating contact
 const handleUpdateContact = async (updatedContact) => {
  console.log(updatedContact); 
  try {
    const response = await fetch(`http://localhost:5000/contacts/${updatedContact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    });
    
    if (!response.ok) throw new Error('Update failed');
    
    const data = await response.json();
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? data : contact
    ));
    setEditingContact(null); // Закрываем режим редактирования
  } catch (error) {
    setError(error.message);
  }
};


  // Show error or loading message
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  if (isLoading) {
    return <div className="loading">Loading contacts...</div>;
  }


  return (
    <div>
      <h1>Contact List App</h1>
      
      {editingContact ? ( // Режим редактирования
        <EditContact 
          contact={editingContact}
          onUpdate={handleUpdateContact}
          onCancel={() => setEditingContact(null)}
        />
      ) : viewingContact ? ( // Режим просмотра
        <ViewContact 
          contact={viewingContact}
          onEdit={() => setEditingContact(viewingContact)}
          onBack={() => setViewingContact(null)}
        />
      ) : ( // Основной режим
        <>
          <button onClick={() => setViewingContact(null)}>Back to Contacts</button>
          <Contacts
            contacts={contacts}
            onViewContact={handleViewContact}
            onDeleteContact={handleDelete}
            onEditContact={setEditingContact}
          />
          <CreateContact onCreateContact={handleCreateContact} />
        </>
      )}
    </div>
  );
}

export default App;






//   return (
//     <div>
//       <h1>Contact List App</h1>

//       {/* Button to 'Create Contact' view */}
//       <button onClick={() => setViewingContact(null)}>Back to Contacts</button>

//       {/* Show different views based on what we're doing */}
//       {viewingContact ? (
//         <ViewContact contact={viewingContact} /> // Show single contact view by id 
//       ) : (
//         <>
//           <Contacts
//             contacts={contacts}
//             onViewContact={handleViewContact}//view contact details
//             onDeleteContact={handleDelete} // Pass handleDelete
//             />
//           <CreateContact onCreateContact={handleCreateContact} /> {/* Form to create new contact */}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

