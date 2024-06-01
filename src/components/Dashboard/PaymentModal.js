import React, { useState, useEffect } from 'react';
import './PaymentModal.css';

function PaymentModal({ invoice, isOpen, onClose, onSubmit }) {
  const [paymentDetails, setPaymentDetails] = useState({
    amountPaid: '',
    paymentMethod: '',
    paymentDate: ''

  });

  useEffect(() => {
    setPaymentDetails({ paymentMethod: '', amountPaid: '', paymentDate: '', });
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails, 
      [name]: value 
    }));
  };

  const handleSubmit = () => {
    if (invoice) {
      onSubmit(invoice.id, paymentDetails);
    }
  };

  if (!isOpen || !invoice) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Collect Payment</h3>
        <form onSubmit={handleSubmit}>
          <label>
            School Name:
            <input type="text" value={invoice.schoolName} readOnly />
          </label>
          <label>
            Amount Due:
            <input type="text" value={invoice.amount} readOnly />
          </label>
          <label>
            Amount Paid:
            <input type="number" name="paymentAmount" value={paymentDetails.amountPaid}
            onChange={handleChange} required />
          </label>
          <label>
          Payment Method:
            <input type="text" name="paymentMethod" value={paymentDetails.paymentMethod}
            onChange={handleChange} required />
          </label>
          <label>
            Payment Date:
            <input type="date" name="paymentDate" value={paymentDetails.paymentDate}
            onChange={handleChange} required />
          </label>
          <div className="payment-modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
