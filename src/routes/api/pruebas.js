const router = require('express').Router();

const Product = require('../../models/product.model')

router.get('/creacion', async (req, res) => {
    const product = await Product.create({
        name: 'Camisa',
        description: 'Para vestir',
        price: 29,
        stock: 10,
        department: 'moda',
        avaliable: false
    })
    res.json(product); //devuelve un json con el nuevo producto creado.
});

router.get('/recuperacion', async (req, res) => {
    const products = await Product.find({
        avaliable: true,
        //Dentro del find() solo puedo poner objetos clave: valor, por lo tanto uso estos operadores. Tmb creo un objeto dentro de'valor' para poder poner los operadores ya que en este caso en vez de ser  ':' seria '>' 
        stock: { $gt: 50 } //greather than. $gte es lo mismo
        // stock: { $lt: 50 } //lower than. $lte es lo mismo
        //Otros operadores: $eq = equals ; $in (si un valor esta dentro de un array de valores)
    }); //aqui le estoy diciendo que me recupere los que el avaliable sea true. Es como el select from WHERE de SQL.
    //EN MySQL seria así: SELECT * FROM products WHERE avaliable ) true AND stock >50

    res.json(products);
});

//Otra forma para añadir datos a la BBDD. Creando una instacia de Product.
router.get('/creacion_v2', async (req, res) => {
    const prod = new Product();
    prod.name = 'Sartén';
    prod.price = 35;
    prod.avaliable = true;
    prod.department = 'cocina';
    prod.stock = 38;
    await prod.save();
    res.json(prod);
});


router.get('/actualizar', async (req, res) => {
    //recuperar por id (forma tediosa):
    // const prod = await Product.findOne({ _id: '6489ef72c1b7e0b4d1fd5665' });
    //recuperar forma buena:
    const prod = await Product.findById('6489ef72c1b7e0b4d1fd5665');

    //ahora le puedo cambiar el precio por ejemplo. Lo edito:
    prod.price = 230;
    //ahora persisto el cambio en la BBDD:ç
    await prod.save();//el await aki es para asegurar que el save va antes
    res.json(prod);

});

router.get('/actualizar_v2', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate('6489ef72c1b7e0b4d1fd5665', {
        stock: 550,
        department: 'hogar'
    }, { new: true }); //el segundo parametro son los valores que quiero modificar, el tercer parametro es un parametro de configuración. el new true me devuelve ya el actualizado.
    res.json(updatedProduct);
});

router.get('/actualizar_v3', async (req, res) => {
    const result = await Product.updateMany({ avaliable: false }, {
        avaliable: true,
        stock: 100
    })
    res.json(result);
});

router.get('/borrar', async (req, res) => {
    const prodDeleted = await Product.findByIdAndDelete('6489ef72c1b7e0b4d1fd5665');
    //podemos añadir un filtrado de si se ha borrado el producto o no.
    if (prodDeleted) {
        res.json(prodDeleted);
    } else {
        res.json({ message: 'El producto no existe' })
    }
});

module.exports = router;