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
import SalespeopleList from "./SalespeopleList";
import CustomersList from "./CustomersList";
import SalesList from "./SalesList";


function App({models, manufacturers, autos}) {
	return (
		<>
			<Nav />
			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers/new" element={<ManufacturerForm />} />
					<Route path="/manufacturers" element={<ManufacturerList manufacturers={manufacturers}/>} />
					<Route path="/models/new" element={<VehicleModelForm />} />
					<Route path="/models" element={<VehicleModelsList models={models}/>} />
					<Route path="/automobiles/new" element={<AutomobileForm />} />
					<Route path="/automobiles" element={<AutomobileList autos={autos}/>} />
					<Route path="salespeople">
						<Route index element={<SalespeopleList />} />
					</Route>
					<Route path="customers">
						<Route index element={<CustomersList />} />
					</Route>
					<Route path="sales">
						<Route index element={<SalesList />} />
					</Route>
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
