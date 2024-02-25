export const addProductToCart = (product, quantity) => {
  let itemObj = {
    id: product.id,
    img: product.img,
    description: product.description,
    quantity,
    price: product.price,
    discount: product.discount,
  }
  const oldItems = localStorage.getItem('cart');
  if (oldItems) {
    let parsedOldItems = JSON.parse(oldItems)
    let isFoundItem = false;
    parsedOldItems = parsedOldItems?.map((item) => {
      if (item.id == itemObj.id) {
        item.quantity = item.quantity + itemObj.quantity;
        isFoundItem = true;
      }
      return item
    });
    if (isFoundItem) {
      localStorage.setItem('cart', JSON.stringify(parsedOldItems))
    } else {
      let newItems = [...parsedOldItems, itemObj];
      localStorage.setItem('cart', JSON.stringify(newItems))
    }
  } else {
    localStorage.setItem('cart', JSON.stringify([{ ...itemObj }]))
  }
}

export const getCartProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        let cartItems = localStorage.getItem('cart');
        if (cartItems) {
          resolve(JSON.parse(cartItems))
        } else {
          resolve([])
        }
      }, 1000)
    } catch (error) {
      reject(error)
    }
  })
}