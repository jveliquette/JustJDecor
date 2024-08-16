import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    first_name: '',
    last_name: '',
    employee_id: '',
};

function SalespersonForm(){
    const [salesperson, setSalesperson] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

    async function fetchSalespersonAndUpdateState() {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        try {
            const res = await fetch(salespeopleUrl);
            if (res.ok) {
                const { salesperson } = await res.json();
                setSalesperson(salesperson);
            } else {
                throw new Error('Error fetching salesperson from server');
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSalespersonAndUpdateState();
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
    }
        const { first_name:firstName, last_name:lastName, employee_id:employeeId } = formData;

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Salesperson</h1>
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
                                <input value={employeeId} onChange={handleInputChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee ID...</label>
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

    export default SalespersonForm;
