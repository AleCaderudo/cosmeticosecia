import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    codigo: { type: Number, required: true },
    avaliacao: { type: String },
    categoria: { type: String },
    descricao: { type: String },
    imagem: { type: String },
    informacao: {type: String },
    preco: { type: Number },
}, { versionKey: false });

const produto = mongoose.model("produtos", produtoSchema);

export default produto;
