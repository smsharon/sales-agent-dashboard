import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentModal from './PaymentModal';
import './UpcomingInvoices.css';

function UpcomingInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => setInvoices(response.data.upcomingInvoices))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handlePaymentSubmit = (invoiceId, paymentDetails) => {
    console.log(`Payment collected for invoice ${invoiceId}:`, paymentDetails);

    setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== invoiceId));
    
    closePaymentModal();
  };
  return (
    <div className="upcoming-invoices">
      <h3>Upcoming Invoices</h3>
      <table>
        <thead>
          <tr>
            <th>School Name</th>
            <th>Amount Due</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.schoolName}</td>
              <td>{invoice.amount}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openPaymentModal(invoice)}>Collect Payment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaymentModal
        invoice={selectedInvoice}
        isOpen={isModalOpen}
        onClose={closePaymentModal}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
}

export default UpcomingInvoices;
