const application = require("./application");
const cors = require("cors");
const api = require("./api");

application.use(cors());
application.use("/api/development", api);

if (process.env.NODE_ENV === "production") {
    application.use(express.static(__dirname + "/public/"));
    application.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 3000;
const serverResponse = () => console.log(`Server is running at PORT:${PORT}`);

application.listen(PORT, serverResponse());