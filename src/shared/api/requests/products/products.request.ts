import type { AxiosResponse } from "axios"
import httpClient from "../../httpClient"
import { API_ENDPOINTS } from "../../urls"
import type { IProductsResponce } from "./products.model"


export const getProducts = async (): Promise<AxiosResponse<IProductsResponce[]>> => {
  const res = await httpClient.get(API_ENDPOINTS.products)
  return res
}


export const getOneProduct = async (id: string): Promise<AxiosResponse<IProductsResponce>> => {
  const res = await httpClient.get(`${API_ENDPOINTS.products}/${id}`)
  return res
}


export const createProduct = async (
  data: Omit<IProductsResponce, "id"> // id server tomonidan berilsa
): Promise<AxiosResponse<IProductsResponce>> => {
  const res = await httpClient.post(API_ENDPOINTS.products, data)
  return res
}


export const updateProduct = async (
  id: string,
  data: Partial<IProductsResponce> // faqat o'zgartiriladigan maydonlar
): Promise<AxiosResponse<IProductsResponce>> => {
  const res = await httpClient.put(`${API_ENDPOINTS.products}/${id}`, data)
  return res
}


export const deleteProduct = async (id: string): Promise<AxiosResponse<void>> => {
  const res = await httpClient.delete(`${API_ENDPOINTS.products}/${id}`)
  return res
}
