import fs from "fs";

class ProductManager {
  #path;
  #products;
  constructor() {
    this.#path = "./products.json";
    this.#products = [];
  }
  getProducts = async () => {
    return JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const id =
      this.#products.length > 0
        ? this.#products[this.#products.length - 1].id + 1
        : 1;
    this.#products.push({
      id: id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(this.#products, null, "\t")
    );
  };

  deleteProduct = async (code) => {
    const products = await this.getProducts();
    const updatedProducts = products.filter((product) => product.code !== code);
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(updatedProducts, null, "\t")
    );
    return console.log("Producto Eliminado");
  };

  updateProduct = async (id, updatedData) => {
    const products = await this.getProducts();
    console.log(products);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updatedData,
      };

      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(products, null, "\t")
      );

      return true;
    }

    return false;
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  };
}

// const product = new ProductManager();
// await product.addProduct(
//   "Leche",
//   "Leche Entera Sachet 1L",
//   "$150",
//   "https://www.multifood.com.ar/images/000Z-006-003-00156189Z-006-003-001-LecheSachetEntera.png",
//   "2000",
//   "5"
// );
// await product.addProduct(
//   "Gaseosa",
//   "Gaseosa de Pomelo",
//   "$120",
//   "https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/1280x1280/products/962/2696/unnamed__06461.1656358317.jpg?c=2",
//   "2001",
//   "5"
// );
// await product.addProduct(
//   "Aceite",
//   "Aceite Natural 0,9L",
//   "$90",
//   "https://jumboargentina.vtexassets.com/arquivos/ids/687695/Aceite-De-Girasol-Natura-900-Ml-1-26543.jpg?v=637799421695770000",
//   "2002",
//   "3"
// );
// await product.addProduct(
//   "Huevo",
//   "Huevo Blanco 6u",
//   "$75",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHv6cwQ1hfREQ6yCIpKqRrsmYpwdZL_3C9DA&usqp=CAU",
//   "2003",
//   "8"
// )
// await product.addProduct(
//   "Fideo",
//   "Fideo Tallarin 500g",
//   "$175",
//   "https://carrefourar.vtexassets.com/arquivos/ids/181705/7790070318657_02.jpg?v=637468587775700000",
//   "2004",
//   "3"
// )

// const updatedLeche = {
//   title: "Leche Descremada",
//   price: "$120",
// };
// product.updateProduct(1, updatedLeche)

// const getProduct = await product.getProductById(1);
// console.log(getProduct);

// console.log(await product.deleteProduct("2001"))
export default ProductManager