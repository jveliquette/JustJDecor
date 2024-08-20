import { useState, useEffect } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalespeople ] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    async function fetchSalespeople() {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        try {
            const res = await fetch(salespeopleUrl);
            if (res.ok) {
                const { salespeople } = await res.json();
                setSalespeople(salespeople);
            } else {
                throw new Error('Error fetching salespeople from server')
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSalespeople();
    }, []);

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

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

    const filteredSales = sales.filter(sale => selectedSalesperson === '' || sale.salesperson.href === selectedSalesperson);

    return (
        <div className="container">
            <h1 className="text-left">Salesperson History</h1>
            <div className="row" style={{justifyContent: 'space-between'}}>
            <select className="form-select" aria-label="Salesperson History" onChange={handleSalespersonChange} value={selectedSalesperson}>
                <option value="">Select a salesperson</option>
                {salespeople.map(salesperson => (
                        <option key={salesperson.id} value={salesperson.href}>{salesperson.first_name} {salesperson.last_name}</option>
                ))}
            </select>
            </div>
            <div className="row" style={{justifyContent: 'space-between'}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSales.map(sale => (
                        <tr key={sale.id}>
                            <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                            <td>{ `${sale.customer.first_name} ${sale.customer.last_name} `}</td>
                            <td>{ sale.automobile.vin }</td>
                            <td>${ sale.price }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalespersonHistory;
