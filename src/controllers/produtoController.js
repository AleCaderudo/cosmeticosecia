import produto from "../models/Produto.js";
import { cliente } from "../models/Cliente.js";


class ProdutoController {
 
  static async listarProdutos (req, res) {
    try {
      const listarProdutos = await produto.find({});
      res.status(200).json(listarProdutos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarProdutoPorId (req, res) {
    try {
      const id = req.params.id;
      const produtoEncontrado = await produto.findById(id);
      res.status(200).json(produtoEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do produto` });
    }
  };

  static async atualizarProduto (req, res) {
    try {
      const id = req.params.id;
      await produto.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "produto atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };


  static async cadastrarProduto (req, res) {
    const novoProduto = req.body;
    try {
      const produtoCriado = await produto.create(req.body);
      res.status(201).json({ message: "criado com sucesso", produto: produtoCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar produto` });
    }
  };

      static async excluirProduto (req, res) {
        try {
          const id = req.params.id;
          await produto.findByIdAndDelete(id);
          res.status(200).json({ message: "Produto excluído com sucesso" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - Falha ao deletar` });
        }
      };

      static async listarProdutosPorCategoria (req, res) {
        const categoria = req.query.categoria;
        try {
          const listarProdutosPorCategoria = await produto.find({ categoria: categoria });
          res.status(200).json(listarProdutosPorCategoria);
      } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na busca` });
      }
    }

};

export default ProdutoController;
