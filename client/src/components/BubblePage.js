import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth.js';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
	const [colorList, setColorList] = useState([]);
	//utilize axios with Auth invocation to get bubble-page
	useEffect(() => {
		axiosWithAuth().get('http://localhost:5000/api/colors')
			.then(response => {
				setColorList(response.data);
			})
			.catch(error => console.log(error.response));

	}, []);
	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;