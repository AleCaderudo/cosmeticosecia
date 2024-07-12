import "dotenv/config";
import app from "./src/app.js";

app.get("/", (req, res) => res.send("Express on Vercel"));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log("servidor escutando!");
});
