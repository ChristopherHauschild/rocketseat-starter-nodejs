// Lógica dos end-points

const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    // Atribuindo valor default para page
    const { page = 1 } = req.query;
    const products = await Product.paginate({}, { page, limit: 5 });

    return res.json(products);
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  },

  async update(req, res) {
    // new: true -> mongoose retorna o produto atualizado
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(product);
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
