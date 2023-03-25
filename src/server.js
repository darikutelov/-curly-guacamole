const http = require("http");
require("dotenv").config();

const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT;

const app = require("./app");
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} ...`);
  });
}

startServer();
