import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleModelsList from "./VehicleModelsList";
import VehicleModelForm from "./VehicleModelForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";


function App({models, manufacturers, autos}) {
	return (
		<>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturerList manufacturers={manufacturers}/>} />
					<Route path="/manufacturers/new" element={<ManufacturerForm />} />
					<Route path="/models" element={<VehicleModelsList models={models}/>} />
					<Route path="/models/new" element={<VehicleModelForm />} />
					<Route path="/automobiles" element={<AutomobileList autos={autos}/>} />
					<Route path="/automobiles/new" element={<AutomobileForm />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
