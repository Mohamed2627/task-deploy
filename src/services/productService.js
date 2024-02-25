import { DATA } from "./data";

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(DATA)
      }, 1000)
    } catch (error) {
      reject(error)
    }
  })
}