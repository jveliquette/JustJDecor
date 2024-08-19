import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
};

function CustomerForm(){
    const [customer, setCustomer] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

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
    }, [])

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
        const customersUrl = "http://localhost:8090/api/customers/"
        try {
            const res = await fetch(customersUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                navigate('/customers/')
            }
        } catch (e) {
            console.log(e);
        }
    }
        const { first_name:firstName, last_name:lastName, address:address, phone_number:phoneNumber } = formData;

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Customer</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input value={firstName} onChange={handleInputChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" />
                                <label htmlFor="first_name">First name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={lastName} onChange={handleInputChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" />
                                <label htmlFor="last_name">Last name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={address} onChange={handleInputChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone number...</label>
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

export default CustomerForm;
