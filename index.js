const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.NODE_ENV === "prod" ? 80 : process.env.PORT || 5000;
const app = require("./app");
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}....`);
});