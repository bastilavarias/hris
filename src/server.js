const application = require("./application");

const PORT = process.env.PORT || 3000;
const serverResponse = () => console.log(`Server is running at PORT:${PORT}`);

application.listen(PORT, serverResponse());
