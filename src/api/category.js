import { toast } from "react-toastify"
import instance from "./instance"


export const getCategoriesApi = async() => {
  try {
    const res = await instance.get('/e-commerce/categories');
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch categories")
  }
}