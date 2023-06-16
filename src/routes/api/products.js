const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('owner'); // .find() es como SELECT * de SQL.
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }

    // res.json([]);
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    // const productId= req.params.productId;
    const { productId } = req.params; //igual pero con destructuring(forma pro)

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }); //new true es para que me devuelva el objeto actualizado.
        res.json(updatedProduct);

    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        res.json(deleteProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

module.exports = router;