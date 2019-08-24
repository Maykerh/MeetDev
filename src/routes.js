import { Router } from "express";

const routes = new Router();

routes.get("/teste", (req, res) => {
    return res.send("funcionando...");
});

module.exports = routes;
