import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleModelsList from "./VehicleModelsList";

function App({models, manufacturers}) {
	return (
		<>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturerList manufacturers={manufacturers}/>} />
					<Route path="/manufacturers/new" element={<ManufacturerForm />} />
					<Route path="/models" element={<VehicleModelsList models={models}/>} />
				</Routes>
			</div>
		</>
	);
}

export default App;
