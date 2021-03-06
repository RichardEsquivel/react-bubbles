import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth.js';

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};
	//?
	const saveEdit = e => {
		e.preventDefault();
		axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(response => {
				updateColors(colors.map(color => response.data.id === color.id ? response.data : color))
				setEditing(false);
			})
			.catch(error => console.log(error.response));

	};
	//filter allows us to create a new array with all id values that aren't the one just clicked by user
	const deleteColor = (color) => {
		axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(() => {
				updateColors(colors.filter(({ id }) => id !== color.id))
				setEditing(false)
			})
			.catch(error => console.log(error));
	};


	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className="delete" onClick={() => deleteColor(color)}>
								x
              </span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
            <input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
            <input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;