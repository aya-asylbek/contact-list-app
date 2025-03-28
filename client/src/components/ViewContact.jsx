function ViewContact({ contact, onEdit, onBack }) {
  return (
    <div>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Notes: {contact.notes}</p>
      <p>Address: {contact.street}, {contact.city}, {contact.state} {contact.zip_code}</p>
      <p>Profession: {contact.profession}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
export default ViewContact;
