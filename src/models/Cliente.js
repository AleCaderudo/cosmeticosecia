import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String },
  pass: { type: String },
  nome: { type: String, },
  celular: { type: String },
  cpf: { type: String },
  data: { type: String }
}, { versionKey: false });

const cliente = mongoose.model("clientes", clienteSchema);

export { cliente, clienteSchema };
