import createEngine, { DefaultNodeModel, DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useEffect } from "react";

function BasicConnection() {
	useEffect(() => {
		fetch("/api/state/cache", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => console.log("Success!", data));
	}, []);
	// create an instance of the engine with all the defaults
	const engine = createEngine();

	// source
	const src = new DefaultNodeModel({
		name: "Sorce",
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
