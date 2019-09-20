import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

//Wrapping App in Router components in order to use Routes within the application
ReactDOM.render(
	<Router>
		<App />
	</Router>
	, document.getElementById('root'));
