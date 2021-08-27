import createEngine, { DefaultNodeModel, DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useEffect } from "react";

function BasicConnection() {
	useEffect(() => {
		fetch("/api/state/cache", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				components: [
					{
						id: "c1", // unique identifier for first box created
						name: "Source", // name of the box/component
					},
					{
						id: "c2",
						name: "Destination",
					},
				],
				links: [
					{
						src: "c1", // source of the link
						dest: "c2", // destination
					},
				],
			}),
		}).then((response) => {
			console.log("Response: ", response);
		});
	}, []);
	// create an instance of the engine with all the defaults
	const engine = createEngine();

	// source
	const src = new DefaultNodeModel({
		name: "Source",
		color: "rgb(0,192,255)",
	});
	src.setPosition(100, 100);
	let srcPort = src.addOutPort("Out");

	// Destination
	const dest = new DefaultNodeModel({
		name: "Destination",
		color: "rgb(166,220,0)",
	});
	dest.setPosition(300, 100);
	let destPort = dest.addInPort("In");

	// link source and destination nodes
	const connectorLine = srcPort.link(destPort);

	// create a DiagramModel to contain everything,
	// add all the elements to it, and then add it to the engine.
	const model = new DiagramModel();
	model.addAll(src, dest, connectorLine);
	engine.setModel(model);

	model.registerListener({
		sourcePortChanged: function (e) {
			console.log("1234");
		},
		zoomUpdated: function (e) {
			console.log("canvas zoomed");
		},
		offsetUpdated: (e) => console.log("canvas dragged to pos: ", e.offsetX, e.offsetY),
		selectionChanged: (e) => console.log("linksUpdated", e),
		linksdragged: (e) => console.log("linksUpdated", e),
	});

	return <CanvasWidget className="canvas" engine={engine} />;
}

export default BasicConnection;
