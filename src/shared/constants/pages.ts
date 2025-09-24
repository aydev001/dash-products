export const pages = {
    home : "/",
    login : "/login",
    register : "/register",
    dashboard : "/dashboard",
    products : {   
        new : "/products/new",
        detail : (id: string) => `/products/${id}/detail`,
        edit : (id: string) => `/products/${id}/edit`,
        delete : (id: string) => `/products/${id}/delete`
    }
}