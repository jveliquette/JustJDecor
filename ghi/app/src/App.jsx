import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";

function App(props) {
	if (props.manufacturers === undefined) {
		return null;
	}
	return (
		<>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers}/>} />
					<Route path="/manufacturers/new" element={<ManufacturerForm />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
