import React, { useState } from 'react';
//import axios from 'axios';

function CollectionForm({ invoiceId, onCloseForm, handleAddCollection }) {
  const [collectionData, setCollectionData] = useState({
    collectionNumber: '',
    date: '',
    amount: '',
    paymentStatus: 'full', // default to full payment
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic...
    const formData = {
      // Populate formData with form values
      collectionNumber: collectionData.collectionNumber,
      date: collectionData.date,
      amount: collectionData.amount,
      paymentStatus: collectionData.paymentStatus
    };
    // Call handleAddCollection function from props with formData
    handleAddCollection(formData);
    // Reset form fields
    setCollectionData({
      collectionNumber: '',
      date: '',
      amount: '',
      paymentStatus: 'full'
    });
    onCloseForm();
  };

  return (
    <div className="collection-form">
      <h3>Add Collection</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="collectionNumber" value={collectionData.collectionNumber} onChange={handleChange} placeholder="Collection Number" />
        <input type="date" name="date" value={collectionData.date} onChange={handleChange} />
        <input type="number" name="amount" value={collectionData.amount} onChange={handleChange} placeholder="Amount" />
        <select name="paymentStatus" value={collectionData.paymentStatus} onChange={handleChange}>
          <option value="full">Full Payment</option>
          <option value="partial">Partial Payment</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CollectionForm;
