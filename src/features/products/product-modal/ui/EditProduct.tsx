import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { getOneProduct, updateProduct } from "@/shared/api/requests/products/products.request"
import { categories } from "@/shared/constants/mockData"
import { productSchema } from "../lib/data"
import { showToast } from "@/shared/lib/toastify"
import LoadingProduct from "@/components/animate/LoadingProduct"

type ProductFormValues = z.infer<typeof productSchema>

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch product by id
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id!),
    enabled: !!id,
  })

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      categoryId: "",
    },
    values: product?.data ?? undefined,
  })

  const mutation = useMutation({
    mutationFn: (values: ProductFormValues) => updateProduct(id!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["one-product", id] })
      showToast("Product updated successfully!", "success")
      navigate(-1)
    },
  })

  const onSubmit = (values: ProductFormValues) => {
    mutation.mutate(values)
  }

  if (isLoading) return (
    <div className="flex justify-center items-center h-[200px]">
      <LoadingProduct/>
    </div>
  )

  return (
    <div className="max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="bg-white" placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="https://image.url" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    className="bg-white"
                    placeholder="Price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center gap-1">
            <Button type="button" size={"sm"} variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending} size={"sm"}>
              {mutation.isPending ? "Update..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditProduct
