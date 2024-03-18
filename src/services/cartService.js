import { toast } from "react-toastify";

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
      localStorage.setItem('cart', JSON.stringify(parsedOldItems));
      toast.info('The product is added before, quantity was updated', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } else {
      let newItems = [...parsedOldItems, itemObj];
      localStorage.setItem('cart', JSON.stringify(newItems))
      toast.success('Product added to Cart successfully', {
        position: "top-center",
        pauseOnFocusLoss: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  } else {
    localStorage.setItem('cart', JSON.stringify([{ ...itemObj }]))
    toast.success('Product added to Cart successfully', {
      position: "top-center",
      pauseOnFocusLoss: false,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
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