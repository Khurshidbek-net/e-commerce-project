import { useQuery } from "@tanstack/react-query"
import { getProductById, getProductsApi } from "../api"


export const useProducts = () => {
  return useQuery({
    queryFn: getProductsApi,
    queryKey: ["products"]
  })
}

export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id
  })
}