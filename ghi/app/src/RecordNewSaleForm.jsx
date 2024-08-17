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
    const [automobile, setAutomobile] = useState([]);
    const [salesperson, setSalesperson] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

    async function fetchAutomobileAndUpdateState() {
        const automobileUrl = "http://localhost:8100/api/automobiles/"
        console.log(automobileUrl, "This is automobile url")
        try {
            const res = await fetch(automobileUrl);
            if (res.ok) {
                const { automobile } = await res.json();
                setAutomobile(automobile)
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
                const { customer } = await res.json();
                setCustomer(customer);
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
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        try {
            const res = await fetch(salespeopleUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                navigate('/salespeople/')
            }
        } catch (e) {
            console.log(e);
        }
    }function handleInputChange({ target }) {
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

    const { vin:vin, first_name:firstName, last_name:lastName, price:price } = formData;

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="vin">Automobile VIN</label>
                            <select className="form-control" type="text" id="vin" name="vin" value={vin} onChange={handleInputChange}>
                                <option value="">Choose an automobile VIN...</option>
                                {automobile.map(auto => {
                                    console.log(automobile, "This is automobile")
                                    return (
                                    <option key={auto.vin} value={auto.vin}>{automobile.vin}</option>
                                )
                            })}
                            </select>
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
