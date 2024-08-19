import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleModelsList from "./VehicleModelsList";
import VehicleModelForm from "./VehicleModelForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import ServiceAppointmentList from "./ServiceAppointmentList";
import ServiceHistory from "./ServiceHistoryList";
import { useState, useEffect } from "react";


function App() {
	const [manufacturers, setManufacturers] = useState([]);
	const [models, setModels] = useState([]);
	const [autos, setAutos] = useState([]);

	const fetchData = async () => {
		try {
			const [manufacturerResponse, modelsResponse, autosResponse] = await Promise.all([
				fetch('http://localhost:8100/api/manufacturers/'),
				fetch('http://localhost:8100/api/models/'),
				fetch('http://localhost:8100/api/automobiles/'),
			]);

			if (manufacturerResponse.ok && modelsResponse.ok && autosResponse.ok) {
				const manufacturersData = await manufacturerResponse.json();
				const modelsData = await modelsResponse.json();
				const autosData = await autosResponse.json();

				setManufacturers(manufacturersData.manufacturers);
				setModels(modelsData.models);
				setAutos(autosData.autos);
			} else {
				console.error("Failed to fetch data.")
			}
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addManufacturer = (newManufacturer) => setManufacturers(prev => [...prev, newManufacturer]);
	const addModel = (newModel) => setModels(prev => [...prev, newModel]);
	const addAuto = (newAuto) => setAutos(prev => [...prev, newAuto]);

	return (
		<>
			<Nav />
			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers/new" element={<ManufacturerForm addManufacturer={addManufacturer} />} />
					<Route path="/manufacturers" element={<ManufacturerList manufacturers={manufacturers}/>} />
					<Route path="/models/new" element={<VehicleModelForm addModel={addModel} />} />
					<Route path="/models" element={<VehicleModelsList models={models}/>} />
					<Route path="/automobiles/new" element={<AutomobileForm addAuto={addAuto} />} />
					<Route path="/automobiles" element={<AutomobileList autos={autos}/>} />
					<Route path="/technicians/new" element={<TechnicianForm />} />
					<Route path="/technicians" element={<TechnicianList />} />
					<Route path="/appointments/new" element={<ServiceAppointmentForm />} />
					<Route path="/appointments" element={<ServiceAppointmentList />} />
					<Route path="/appointments/history" element={<ServiceHistory />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
