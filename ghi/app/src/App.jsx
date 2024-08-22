import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Footer from "./Footer.jsx";
import RoomsList from "./RoomsList.jsx";
import IdeasPage from "./IdeasPage.jsx";
import WishList from "./WishList.jsx";
import Profile from "./Profile.jsx";
import ProjectsList from "./ProjectsList.jsx";
import ProjectDetails from "./ProjectDetails.jsx";

function App() {

	return (
		<div className="d-flex flex-column min-vh-100">
			<Nav />
			<div className="container mt-4 flex-grow-1">
				<Routes>
				<Route path="/" element={<MainPage />} />
					<Route path="/rooms" element={<RoomsList />} />
					<Route path="/projects/:id" element={<ProjectDetails />} />
					<Route path="/ideas" element={<IdeasPage />} />
					<Route path="/wishlist" element={<WishList />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/projects" element={<ProjectsList />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
