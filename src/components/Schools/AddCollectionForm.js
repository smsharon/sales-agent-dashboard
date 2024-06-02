import React, { useState } from 'react';
import axios from 'axios';

function AddCollectionForm({ schoolId, invoiceId, onCollectionAdded }) {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    status: 'Valid'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCollection = {
      ...form,
      collectionNumber: `COL${Date.now()}` // To Generate a unique collection number
    };

    axios.post(`http://localhost:5000/schools/${schoolId}/invoices/${invoiceId}/collections`, newCollection)
      .then(response => {
        onCollectionAdded(response.data);
        setForm({ amount: '', date: '', status: 'Valid' });
      })
      .catch(error => console.error('Error adding collection:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Valid">Valid</option>
          <option value="Bounced">Bounced</option>
        </select>
      </div>
      <button type="submit">Add Collection</button>
    </form>
  );
}

export default AddCollectionForm;
