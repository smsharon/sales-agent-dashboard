import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CollectionList.css'; 

function CollectionList({ schoolId }) {
    const { id } = useParams();
    const [school, setSchool] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        // Fetch school details
        axios.get(`https://json-dashboard.vercel.app/schools/${id}`)
            .then(response => {
                setSchool(response.data);
                // Extract invoices from school
                if (response.data.invoices) {
                    setInvoices(response.data.invoices);
                    // Extract collections from invoices
                    const collections = response.data.invoices.flatMap(invoice => invoice.collections || []);
                    setCollections(collections);
                }
            })
            .catch(error => console.error('Error fetching school details:', error));
    }, [id]);

    const handleStatusChange = (collectionId, status) => {
        // Find the corresponding invoice for the collection
        const updatedInvoices = invoices.map(invoice => {
            if (invoice.collections) {
                invoice.collections = invoice.collections.map(collection => {
                    if (collection.id === collectionId) {
                        return { ...collection, status };
                    }
                    return collection;
                });
            }
            return invoice;
        });

        setInvoices(updatedInvoices);

        // Update the collections state to reflect the changes
        const updatedCollections = updatedInvoices.flatMap(invoice => invoice.collections || []);
        setCollections(updatedCollections);
    };

    return (
        <div className="collection-list-container">
            <h2 className="collection-list-heading">Collections Management</h2>
            <table className="collection-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Collection Number</th>
                        <th>Date of Collection</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map(collection => (
                        <tr key={collection.id}>
                            <td>
                                {/* Find the corresponding invoice for the collection */}
                                {invoices.map(invoice => {
                                    if (invoice.collections && invoice.collections.some(col => col.id === collection.id)) {
                                        return invoice.invoiceNumber;
                                    }
                                    return null;
                                })}
                            </td>
                            <td>{collection.collectionNumber}</td>
                            <td>{collection.date}</td>
                            <td>{collection.status}</td>
                            <td>{collection.amount}</td>
                            <td>
                                <button onClick={() => handleStatusChange(collection.id, 'Valid')}>Mark as Valid</button>
                                <button onClick={() => handleStatusChange(collection.id, 'Bounced')}>Mark as Bounced</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CollectionList;
