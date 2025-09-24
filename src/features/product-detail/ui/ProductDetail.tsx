import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { getOneProducts } from "@/shared/api/requests/products/products.request"
import type { IProductsResponce } from "@/shared/api/requests/products/products.model"
import ErrorFallback from "@/components/animate/ErrorFalback"
import LoadingProduct from "@/components/animate/LoadingProduct"
import { Edit, Trash } from "lucide-react"
import { categories } from "@/shared/constants/mockData"

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["one-product", id],
    queryFn: () => getOneProducts(Number(id)),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingProduct/>
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-center">
        <ErrorFallback/>
      </p>
    )
  }

  const product: IProductsResponce | undefined = data?.data
  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Mahsulot topilmadi</p>
  }

  return (
    <div className="space-y-4 mb-2">
      <Card className="rounded-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>View product information</CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size={"sm"} className="text-sm" variant="secondary" asChild>
              <Link to={"/dashboard"}>← Back to Table</Link>
            </Button>
            <Button size={"sm"} className="text-sm" variant="default">
                <Edit/>
                <span>Update</span>
            </Button>
            <Button size={"sm"} className="text-sm" variant="destructive">
                <Trash/>
                <span>Delete</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex justify-center items-center bg-muted rounded-md h-60">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-56 object-contain"
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-emerald-600 font-bold text-xl">
              ${product.price}
            </p>
            <p className="text-muted-foreground text-sm">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoBox label="Product ID" value={`#${product.id}`} />
              <InfoBox label="Category" value={categories.find(item => item.id == product.categoryId)?.title as string} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 border rounded-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  )
}
