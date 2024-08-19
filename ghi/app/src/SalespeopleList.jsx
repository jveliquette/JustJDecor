import { useState, useEffect } from 'react';

function SalespeopleList() {
    const [salespeople, setSalespeople ] = useState([]);

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

    return (
        <div className="container">
            <h1 className="text-left">Salespeople</h1>
            <div className="row" style={{justifyContent: 'space-between'}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salespeople.map(salespeople => {
                        return (
                        <tr key={salespeople.id}>
                            <td>{ salespeople.employee_id }</td>
                            <td>{ salespeople.first_name }</td>
                            <td>{ salespeople.last_name }</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalespeopleList;
