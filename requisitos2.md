### Desarrollar la API que me permita crear un nuevo producto

- POST /api/products 

- PRUEBAS:
    - Pruebo si la URL funciona (status 200 y que devuelva JSON)
    - Pruebo si la respuesta tiene _id
    - Pruebo si los datos del objeto en la respuesta son los mismos que yo he insertado


### Desarrollar la API que me permita actualizar un producto en concreto

- PUT /api/products/PRODUCTID

- PRUEBAS:
    - Pruebo si la URL funciona (status 200 y que devuelva JSON)
    - Pruebo si las modificaciones se llevan a cabo


### Desarrollar la API que me permita borrar un producto concreto

- DELETE /api/products/PRODUCTID

- PRUEBAS:
    - Pruebo si la URL funciona (status 200 y que devuelva JSON)
    - Compruebo si el producto sigue en la Base de Datos


###
- POST /api/users/register (username, email, password) (el role no hace falta pk lo pone por defecto.)
- POST /api/users/login


- PUT /api/users/:userId/product/:productId
- GET /api/users/:userId