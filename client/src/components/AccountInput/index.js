import React from "react";
import { Formik } from "formik";

const AccountInput = ({ onSubmit }) => (
	<Formik
		initialValues={{ email: "", password: "" }}
		onSubmit={values => onSubmit(values)}
		render={props => (
			<form onSubmit={props.handleSubmit}>
				<input
					type="text"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.email}
					name="email"
				/>
				{props.errors.email && <div id="feedback">{props.errors.email}</div>}
				<input
					type="password"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.password}
					name="password"
				/>
				{props.errors.password && (
					<div id="feedback">{props.errors.password}</div>
				)}
				<button type="submit">Submit</button>
			</form>
		)
		}
	/>
);

export default AccountInput;
