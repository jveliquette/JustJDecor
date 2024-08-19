import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    automobile: '',
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
            console.log(formData, "This is form data")
            const res = await fetch(salesUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                const selectedAuto = autos.find(auto => auto.id === parseInt(formData.automobile));
                const vin = selectedAuto.vin;
                const updateAutoUrl = `http://localhost:8100/api/automobiles/${vin}/`;
                await fetch(updateAutoUrl, {
                    method: 'PUT',
                    body: JSON.stringify({ sold: true}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                navigate('/sales/')
            }
        } catch (e) {
            console.log(e);
        }
    }

    const { automobile, salesperson, customer, price } = formData;
    console.log(automobile, "This is vin")
    console.log(salesperson, "This is salesperson")
    console.log(customer, "This is customer")
    console.log(price, "This is price")

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="automobile">Automobile VIN</label>
                            <select className="form-control" required type="text" id="automobile" name="automobile" value={automobile} onChange={handleInputChange}>
                                <option value="">Choose an automobile VIN...</option>
                                {autos
                                    .filter(automobile => !automobile.sold)
                                    .map(automobile => (
                                    <option key={automobile.href} value={automobile.id}>{automobile.vin}</option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="salesperson">Salesperson</label>
                            <select className="form-control" required type="text" id="salesperson" name="salesperson" value={salesperson} onChange={handleInputChange}>
                                <option value="">Choose a salesperson...</option>
                                {salespeople.map(salesperson => (
                                    <option key={salesperson.href} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                ))}
                            </select>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select className="form-control" required type="text" id="customer" name="customer" value={customer} onChange={handleInputChange}>
                                <option value="">Choose a customer...</option>
                                {customers.map(customer => (
                                    <option key={customer.href} value={customer.id}>{customer.first_name} {customer.last_name}</option>
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
