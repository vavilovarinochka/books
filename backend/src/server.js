const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes");
const checkInvoiceStatus = require("./utils/checkInvoiceStatus");
require("dotenv").config();
const path = require("path");

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 8080;

const corsOptions = {
    origin: "*",
};
const corsConfig = cors(corsOptions);

app.use(express.json());
app.use(corsConfig);

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", apiRouter);

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use((_, res) => {
    res.status(404).send("Route Not Found.");
});
app.use((err, _, res, next) => {
    res.status(500).send("500. Internal server error.");
});

checkInvoiceStatus();
// setInterval(() => checkInvoiceStatus(), 300000);
setInterval(() => checkInvoiceStatus(), 300000);

app.listen(SERVER_PORT, () =>
    console.log(`Server is listening on http://localhost:${SERVER_PORT}`)
);
