import createEngine, { DefaultNodeModel, DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useEffect } from "react";

function BasicConnection() {
	// const [links, setLinks] = useState([]);
	// const [components, setComponents] = useState([]);
	let links = [],
		components = [];

	useEffect(() => {
		fetch("/api/state/cache", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				components: components,
				links: links,
			}),
		}).then((response) => {
			console.log("Response: ", response);
		});
	}, [links, components]);

	// create an instance of the engine with all the defaults
	const engine = createEngine();

	// Source
	const src = new DefaultNodeModel({
		name: "Source",
		id: "c1",
		color: "rgb(0,192,255)",
	});
	src.setPosition(100, 100);
	let srcPort = src.addOutPort("Out");

	// Destination
	const dest = new DefaultNodeModel({
		name: "Destination",
		id: "c2",
		color: "rgb(166,220,0)",
	});
	dest.setPosition(300, 100);
	let destPort = dest.addInPort("In");

	// link source and destination nodes
	const connectorLine = srcPort.link(destPort);

	// when we connect two nodes, update the ui state
	links.push({ src: src.options.id, dest: dest.options.id });
	components.push({ id: src.options.id, name: src.options.name });
	components.push({ id: dest.options.id, name: dest.options.name });

	console.log("links", links);
	console.log("components", components);

	// create a DiagramModel to contain everything,
	// add all the elements to it, and then add it to the engine.
	const model = new DiagramModel();
	model.addAll(src, dest, connectorLine);
	engine.setModel(model);

	model.registerListener({
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
