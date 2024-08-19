import { useState, useEffect } from 'react';

function SalesList() {
    const [sales, setSales ] = useState([]);

    async function fetchSales() {
        const salesUrl = "http://localhost:8090/api/sales/"
        try {
            const res = await fetch(salesUrl);
            if (res.ok) {
                const { sales } = await res.json()
                setSales(sales);
            } else {
                throw new Error('Error fetching sales from server')
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div className="container">
            <h1 className="text-left">Sales</h1>
            <div className="row" style={{justifyContent: 'space-between'}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sales.map(sales => {
                        return (
                        <tr key={sales.id}>
                            <td>{ sales.salesperson.employee_id }</td>
                            <td>{ `${sales.salesperson.first_name} ${sales.salesperson.last_name}` }</td>
                            <td>{ `${sales.customer.first_name} ${sales.customer.last_name} `}</td>
                            <td>{ sales.automobile.vin }</td>
                            <td>${ sales.price }</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesList;
