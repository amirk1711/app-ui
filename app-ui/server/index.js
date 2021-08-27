const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/state/cache", async (req, res) => {
	console.log("Data at the server: ", req.body);
	res.setHeader("content-type", "application/json");
	res.status(204).send();
});

app.listen(port, (err) => {
	err
		? console.log(`Error in running server: ${err}`)
		: console.log(`Server is up and running on port: ${port}`);
});
