import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const Pm = new ProductManager();


app.get("/products", async (request, response) => {
  const limit = request.query.limit;
  if (limit) {
    const limitProduct = +(limit);
    const products = await Pm.getProducts();
    const productsLimit = products.slice(0, limitProduct);;
    response.json(productsLimit)
  }
  else{
    const products = await Pm.getProducts();
    response.json(products)
  }
});

app.get("/products/:id", async (request, response) => {
  const id = parseFloat(request.params.id);
  const products = await Pm.getProductById(id);
  console.log(typeof id);
  if (!products) return response.send({ error: "Curso Inexistente" });
  response.send(products);
});

app.listen(8080, () => console.log("Server up..."));
