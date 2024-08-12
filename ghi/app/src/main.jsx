import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

async function loadManufacturers() {
	const response = await fetch('http://localhost:8100/api/manufacturers/');
	if (response.ok) {
		const data = await response.json();
		root.render(
			<React.StrictMode>
				<BrowserRouter>
					<App manufacturers={data.manufacturers} />
				</BrowserRouter>
			</React.StrictMode>
		);
	} else {
		console.error(response);
	}
}
loadManufacturers();
