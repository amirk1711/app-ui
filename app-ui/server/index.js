const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/api/state/cache", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	return res.status(204).json({
		data: {
			success: true,
		},
	});
});

app.listen(port, (err) => {
	err
		? console.log(`Error in running server: ${err}`)
		: console.log(`Server is up and running on port: ${port}`);
});
