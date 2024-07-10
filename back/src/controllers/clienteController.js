import { cliente } from "../models/Cliente.js";

class ClienteController {

  static async listarClientes (req, res) {
    try {
      const listaClientes = await cliente.find({});
      res.status(200).json(listaClientes);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarClientePorId (req, res) {
    try {
      const id = req.params.id;
      const clienteEncontrado = await cliente.findById(id);
      res.status(200).json(clienteEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do cliente` });
    }
  };

  static async cadastrarCliente (req, res) {
    try {
      const novoCliente = await cliente.create(req.body);
      res.status(201).json({ message: "criado com sucesso", cliente: novoCliente });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar cliente` });
    }
  }

  static async atualizarCliente (req, res) {
    try {
      const id = req.params.id;
      await cliente.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "cliente atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  static async excluirCliente (req, res) {
    try {
      const id = req.params.id;
      await cliente.findByIdAndDelete(id);
      res.status(200).json({ message: "cliente excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
};

export default ClienteController;