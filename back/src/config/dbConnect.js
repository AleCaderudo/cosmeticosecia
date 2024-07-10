import mongoose, {mongo} from "mongoose";

async function conectaNaDatabase() {
    mongoose.connect('mongodb+srv://ale:ale@cluster0.gcyrpva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      
    return mongoose.connection;
  };
  
  export default conectaNaDatabase;
  