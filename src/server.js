const application = require("./application");
const cors = require("cors");
const api = require("./api");

application.use(cors());
application.use("/api/development", api);

const PORT = process.env.PORT || 3000;
const serverResponse = () => console.log(`Server is running at PORT:${PORT}`);

application.listen(PORT, serverResponse());