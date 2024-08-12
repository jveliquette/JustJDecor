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

async function loadData() {
	try {
		const [manufacturerResponse, modelsResponse] = await Promise.all([
			fetch('http://localhost:8100/api/manufacturers/'),
            fetch('http://localhost:8100/api/models/')
		]);

		if (manufacturerResponse.ok && modelsResponse.ok) {
			const manufacturersData = await manufacturerResponse.json();
			const modelsData = await modelsResponse.json();

			root.render(
				<React.StrictMode>
					<BrowserRouter>
						<App manufacturers={manufacturersData.manufacturers} models={modelsData.models} />
					</BrowserRouter>
				</React.StrictMode>
			);
		} else {
			console.error(response);
		}
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}
loadData();
