import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json()
    console.log(products)
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log(storedCart);
    for (const id in storedCart) {
        const addedProduct = products.find(product => product.id === id)
        // console.log(addedProduct);
        if (addedProduct) {
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            console.log(addedProduct)
            savedCart.push(addedProduct)
        }
    }

    return savedCart;
}

export default cartProductsLoader;