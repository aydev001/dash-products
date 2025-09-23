import LoadingProduct from "@/components/animate/LoadingProduct"
import { getProducts } from "@/shared/api/requests/products/products.request"
import { useQuery } from "@tanstack/react-query"
import TableProducts from "./TableProducts"
import ErrorFallback from "@/components/animate/ErrorFalback"

const ProductsList = () => {

  const { data: resProducts, isPending, error} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const products = resProducts?.data

  if(error) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <ErrorFallback/>
      </div>
    )
  }

  return (
    <div>
      {isPending ?
        <div className="flex justify-center items-center h-[80vh]">
          <LoadingProduct />
        </div>
        :
        <div>
          <TableProducts products={products}/>
        </div>
        }
    </div>
  )
}

export default ProductsList
