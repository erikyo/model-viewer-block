import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import apiFetch from "@wordpress/api-fetch";
import modelViewer from '@google/model-viewer'

window.addEventListener("load", async function () {
	//Endpoint URL
	const path = "/model-viewer-viewer/v1/model-viewer-settings/";

	//Get settings from the REST API endpoint
	const getSettings = async () => {
		let data = await apiFetch({
			path,
			method: "GET",
		});
		return data;
	};

	//Update settings via the REST API endpoint
	const updateSettings = async (data) => {
		let updatedData = apiFetch({
			path,
			data,
			method: "POST",
		});
		return updatedData;
	};

	render(
		<App
      getSettings={getSettings}
      updateSettings={updateSettings}
      />,
		document.getElementById("model-viewer-settings")
	);
});
