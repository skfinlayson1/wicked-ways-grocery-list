const http = require("http");

const app = require("./app");

const port = normalizePort(process.env.PORT || 8080);
app.set("port", port)

const server = http.createServer(app);
server.listen(port);

function normalizePort(port) {
    const parsedPort = parseInt(port, 10);

    if (isNaN(parsedPort)) {
        return port;
    } else if (parsedPort >= 0) {
        return parsedPort;
    } else {
        return false;
    }
}

server.on("listening", () => {
    console.log("Server is listening on port: " + port);
})