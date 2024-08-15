import { useState, useEffect } from 'react';

function CustomersList() {
    const [customers, setCustomers ] = useState([]);

    async function fetchCustomers() {
        const customersUrl = "http://localhost:8090/api/customers/"
        try {
            const res = await fetch(customersUrl);
            if (res.ok) {
                const { customers } = await res.json();
                setCustomers(customers);
            } else {
                throw new Error('Error fetching customers from server')
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="container">
            <h1 className="text-left">Customers</h1>
            <div className="row" style={{justifyContent: 'space-between'}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map(customers => {
                        return (
                        <tr key={customers.id}>
                            <td>{ customers.first_name }</td>
                            <td>{ customers.last_name }</td>
                            <td>{ customers.phone_number }</td>
                            <td>{ customers.address }</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomersList;
