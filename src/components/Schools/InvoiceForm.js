import React, { useState, useEffect } from 'react';

function InvoiceForm({ onSave, invoice = null, successMessage }) {
  const [formData, setFormData] = useState({
    item: '',
    dueDate: '',
    amount: ''
  });

  useEffect(() => {
    // If there is an invoice prop passed, set the form data to match the invoice
    if (invoice) {
      setFormData({
        item: invoice.item,
        dueDate: invoice.dueDate,
        amount: invoice.amount
      });
    }
  }, [invoice]);

  const zerakiItems = ['Zeraki Analytics', 'Zeraki Finance', 'Zeraki Timetable'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate default values
    const invoiceNumber = `INV${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const creationDate = new Date().toISOString().split('T')[0];
    const paidAmount = 0;
    const balance = formData.amount;
    const status = 'Pending';
    const daysUntilDue = Math.ceil((new Date(formData.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

    // Prepare full invoice data
    const fullInvoiceData = {
      ...formData,
      invoiceNumber,
      creationDate,
      paidAmount,
      balance,
      status,
      daysUntilDue
    };

    onSave(fullInvoiceData);
  };

  return (
    <div className='form'>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item:</label>
          <select name="item" value={formData.item} onChange={handleChange} required>
            <option value="">Select an item</option>
            {zerakiItems.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default InvoiceForm;
