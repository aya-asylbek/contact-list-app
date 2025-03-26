import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const[contacts, setContacts] = useState([]);//state to hold my contacts
  const [isLoading, setIsLoading] = useState(true);//state checking if data loading
  const [error, setError] = useState(null);//state to show me error

  //fetching data contacts from backend 
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);//updating contacts state
        setIsLoading(false);//data fetched,loading is done 
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  if (isLoading) {
    return <div className="loading">Loading contacts...</div>;
  }

  
    return (
      <div>
        <h1>Contact List App</h1>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
                <p>{contact.notes}</p>
              </li>
            ))}
          </ul>
      </div>
    );
  }
  
export default App;

