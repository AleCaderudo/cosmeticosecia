import express from "express";
import produtos from "./produtosRoutes.js";
import clientes from "./clientesRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("<strong>Cosmeticosecia</strong><br>"));

  app.use(express.json(), produtos, clientes);
};

export default routes;
