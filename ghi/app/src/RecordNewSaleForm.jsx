import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//this code is trash need to redo

const initialFormState = {
    vin: '',
    salesperson: '',
    customer: '',
    price: '',
};

function RecordNewSaleForm(){
    const [autos, setAutomobile] = useState([]);
    const [salespeople, setSalesperson] = useState([]);
    const [customers, setCustomer] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

    async function fetchAutomobileAndUpdateState() {
        const automobileUrl = "http://localhost:8100/api/automobiles/"
        try {
            const res = await fetch(automobileUrl);
            if (res.ok) {
                const { autos } = await res.json();
                setAutomobile(autos)
            } else {
                throw new Error('Error fetching salespeople from server')
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAutomobileAndUpdateState();
    }, []);


    async function fetchSalespeopleAndUpdateState() {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        try {
            const res = await fetch(salespeopleUrl);
            if (res.ok) {
                const { salespeople } = await res.json();
                setSalesperson(salespeople);
            } else {
                throw new Error('Error fetching salespeople from server')
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSalespeopleAndUpdateState();
    }, []);

    async function fetchCustomerAndUpdateState() {
        const customersUrl = "http://localhost:8090/api/customers/"
        try {
            const res = await fetch(customersUrl);
            if (res.ok) {
                const { customers } = await res.json();
                setCustomer(customers);
            } else {
                throw new Error('Error fetching customer from server');
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCustomerAndUpdateState();
    }, []);

    function handleInputChange({ target }) {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function resetForm(e) {
        e.preventDefault();
        setFormData(initialFormState);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const salesUrl = "http://localhost:8090/api/sales/"
        try {
            const res = await fetch(salesUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                navigate('/sales/')
            }
        } catch (e) {
            console.log(e);
        }
    }

    const { vin, salesperson, customer, price } = formData;

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="vin">Automobile VIN</label>
                            <select className="form-control" required type="text" id="vin" name="vin" value={vin} onChange={handleInputChange}>
                                <option value="">Choose an automobile VIN...</option>
                                {autos
                                    .filter(automobile => !automobile.sold)
                                    .map(automobile => (
                                    <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="salesperson">Salesperson</label>
                            <select className="form-control" required type="text" id="salesperson" name="salesperson" value={salesperson} onChange={handleInputChange}>
                                <option value="">Choose a salesperson...</option>
                                {salespeople.map(salesperson => (
                                    <option key={salesperson.id} value={salesperson.href}>{salesperson.first_name} {salesperson.last_name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select className="form-control" required type="text" id="customer" name="customer" value={customer} onChange={handleInputChange}>
                                <option value="">Choose a customer...</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.href}>{customer.first_name} {customer.last_name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <input className="form-control" required type="text" id="price" name="price" value={price} onChange={handleInputChange} />
                    </div>
                        <div className="container btn-group text-center">
                            <button type="submit" className="btn btn-primary">Create</button>
                            <button type="reset" className="btn btn-danger" onClick={resetForm}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecordNewSaleForm;
