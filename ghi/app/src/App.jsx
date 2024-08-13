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
					<Route path="/technicians/new" element={<TechnicianForm />} />
					<Route path="/technicians" element={<TechnicianList />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
