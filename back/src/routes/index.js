import express from "express";
import produtos from "./produtosRoutes.js";
import clientes from "./clientesRoutes.js";
const path = require('path');

const routes = (app) => {
  app.route("/").get((req, res) => res.sendFile('index.html', {root: path.join(__dirname, 'public')});

  app.use(express.json(), produtos, clientes);
};

export default routes;
