import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProduct } from "@/shared/api/requests/products/products.request"
import { Button } from "@/shared/ui/button"
import { showToast } from "@/shared/lib/toastify"

const DeleteProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => deleteProduct(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["one-product", id] })
      showToast("Product deleted successfully!", "success")
      navigate(-1)
    },
  })

  return (
    <div className="space-y-2">
      <h2 className="text-md">Are you sure you want to delete this product?</h2>
      <div className="flex gap-2 justify-end">
        <Button size={"sm"}
          variant="destructive"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
        <Button size={"sm"} variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default DeleteProduct
