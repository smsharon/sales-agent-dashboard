import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import InvoiceList from './InvoiceList';
import CollectionList from './CollectionList';
import './SchoolDetails.css';

function SchoolDetails() {
  const { id } = useParams();
  const [school, setSchool] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch school details
    axios.get(`https://json-dashboard.vercel.app/schools/${id}`)
      .then(response => setSchool(response.data))
      .catch(error => console.error('Error fetching school details:', error));

    // Fetch invoices for the specific schoolId
    axios.get(`https://json-dashboard.vercel.app/invoices?schoolId=${id}`)
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, [id]);

  const calculateBalance = () => {
    if (!school || !invoices) return 0;

    const totalInvoices = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
    const totalCollections = invoices.reduce((sum, invoice) => {
      return sum + (invoice.collections ? invoice.collections.reduce((collSum, coll) => collSum + parseFloat(coll.amount), 0) : 0);
    }, 0);

    return totalInvoices - totalCollections;
  };

  if (!school || !invoices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="school-details-container">
      <div className="school-info">
        <h2>{school.name}</h2>
        <p><strong>Type:</strong> {school.type}</p>
        <p><strong>Product:</strong> {school.product}</p>
        <p><strong>County:</strong> {school.county}</p>
        <p><strong>Registration Date:</strong> {school.registrationDate}</p>
        <p><strong>Contact Information:</strong> {school.contactInfo}</p>
        <p><strong>School Balance:</strong> KES {calculateBalance()}</p>
      </div>
      <div className="financial-details">
        <InvoiceList schoolId={id} invoices={invoices} setInvoices={setInvoices} />
        <CollectionList schoolId={id} />
      </div>
    </div>
  );
}

export default SchoolDetails;
