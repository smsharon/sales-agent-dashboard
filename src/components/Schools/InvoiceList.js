import React, { useState } from 'react';
import axios from 'axios';
import InvoiceForm from './InvoiceForm';
import CollectionForm from './CollectionForm'; 
import './InvoiceList.css'

function InvoiceList({ schoolId, invoices, setInvoices }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false); 

  const handleSaveInvoice = (invoice) => {
    invoice.schoolId = schoolId;
    if (invoice.id) {
      axios.put(`https://json-dashboard.vercel.app/invoices/${invoice.id}`, invoice)
        .then(() => {
          setInvoices(prevInvoices =>
            prevInvoices.map(inv => (inv.id === invoice.id ? invoice : inv))
          );
          setModalSuccessMessage('Invoice updated successfully!');
        })
        .catch(error => {
          console.error('Error updating invoice:', error);
        });
    } else {
      axios.post('https://json-dashboard.vercel.app/invoices', invoice)
        .then(response => {
          setInvoices(prevInvoices => [...prevInvoices, response.data]);
          setModalSuccessMessage('Invoice added successfully!');
        })
        .catch(error => {
          console.error('Error adding new invoice:', error);
        });
    }
    setShowModal(false);
  };

  const handleDeleteInvoice = (invoiceId) => {
    axios.delete(`https://json-dashboard.vercel.app/invoices/${invoiceId}`)
      .then(() => {
        setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== invoiceId));
        setModalSuccessMessage('Invoice deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting invoice:', error);
      });
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
    setModalSuccessMessage('');
  };

  const handleToggleCollectionForm = (invoiceId) => {
    setShowCollectionForm(true); 
    setSelectedInvoiceId(invoiceId); 
  };

  // Function to update invoice status based on collection results
const updateInvoiceStatus = (invoiceId) => {
  const invoiceToUpdate = invoices.find(invoice => invoice.id === invoiceId);
  if (invoiceToUpdate) {
    // Check if any collection associated with the invoice has bounced
    const hasBouncedCollection = invoiceToUpdate.collections.some(collection => collection.status === 'Bounced');
    // Update invoice status based on collection results
    const updatedInvoice = {
      ...invoiceToUpdate,
      status: hasBouncedCollection ? 'Incomplete' : 'Paid'
    };
    // Update the invoices state
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice => (invoice.id === invoiceId ? updatedInvoice : invoice))
    );
  }
};

// Function to handle adding a collection
const handleAddCollection = (collectionData) => {
  axios.post('https://json-dashboard.vercel.app/collections', collectionData)
    .then(response => {
      const updatedInvoices = invoices.map(invoice => {
        if (invoice.id === selectedInvoiceId) {
          return {
            ...invoice,
            collections: [...(invoice.collections || []), response.data] 
          };
        }
        return invoice;
      });
      setInvoices(updatedInvoices);
      setShowCollectionForm(false); // Hide collection form after adding collection
      setModalSuccessMessage('Collection added successfully!');
      // Update invoice status based on collection results
      updateInvoiceStatus(selectedInvoiceId);
    })
    .catch(error => {
      console.error('Error adding collection:', error);
      
    });
};

  return (
    <div className="invoice-list-container">
      <h3>Invoices</h3>
      <button onClick={() => { setShowModal(true); setModalSuccessMessage(''); }}>Add Invoice</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {modalSuccessMessage && <div className="success-message">{modalSuccessMessage}</div>}
            <InvoiceForm onSave={handleSaveInvoice} invoice={selectedInvoice} />
          </div>
        </div>
      )}
      {showCollectionForm && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setShowCollectionForm(false)}>&times;</span>
      <CollectionForm invoiceId={selectedInvoiceId} onCloseForm={() => setShowCollectionForm(false)} handleAddCollection={handleAddCollection} />
    </div>
  </div>
)}

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Item</th>
            <th>Creation Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Paid Amount</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Days Until Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.item}</td>
              <td>{new Date(invoice.creationDate).toLocaleDateString()}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.paidAmount}</td>
              <td>{invoice.balance}</td>
              <td>{invoice.status}</td>
              <td>{invoice.daysUntilDue}</td>
              <td className="actions">
                <button onClick={() => handleEditInvoice(invoice)}>Edit</button>
                <button onClick={() => handleToggleCollectionForm(invoice.id)}>Add Collection</button> {/* Pass invoice id to handleToggleCollectionForm */}
                <button className="delete-button" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default InvoiceList;
