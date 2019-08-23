import express from "express";

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    return res.send("asheauishei");
});

server.listen(3333);
