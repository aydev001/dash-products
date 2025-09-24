import type { AxiosResponse } from "axios"
import httpClient from "../../httpClient"
import { API_ENDPOINTS } from "../../urls"
import type { IProductsResponce } from "./products.model"

export const getProducts = async () : Promise<AxiosResponse<IProductsResponce[]>> => {
    const res = await httpClient.get(API_ENDPOINTS.products)
    return res 
}

export const getOneProducts = async (id:number) : Promise<AxiosResponse<IProductsResponce>> => {
    const res = await httpClient.get(`${API_ENDPOINTS.products}/${id}`)
    return res 
}