import React from "react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

async function loadData(root) {
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

			root.render(
				<React.StrictMode>
					<BrowserRouter>
						<App manufacturers={manufacturersData.manufacturers} models={modelsData.models} autos={autosData.autos}/>
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
export default loadData;
