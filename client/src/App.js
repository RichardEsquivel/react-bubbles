import React, { useState } from "react";
import { Route, Link, Redirect } from 'react-router-dom';

import BubblePage from './components/BubblePage.js';

import Login from "./components/Login";
import "./styles.scss";


const ProtectedRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={props => {
		if (localStorage.getItem('token')) {
			return <Component {...props} />;
		} else {
			return <Redirect to="/login" />;
		}
	}} />;
}

function App() {
	const [colorList, setColorList] = useState([]);
	return (
		<div className="App">
			<Route exact path="/login" component={Login} />
			{/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
		*/}
			<ProtectedRoute path="/bubble-page" component={BubblePage} />
		</div>
	);
}

export default App;
