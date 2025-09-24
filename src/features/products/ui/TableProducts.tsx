import type { IProductsResponce } from "@/shared/api/requests/products/products.model"
import { categories } from "@/shared/constants/mockData"
import { pages } from "@/shared/constants/pages"
import { Button } from "@/shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Eye, Pencil, Plus, Trash } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

interface TableProps {
    products: IProductsResponce[] | undefined
}

const TableProducts = ({ products }: TableProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="rounded-sm border shadow-sm p-4 bg-white mb-[5px]">
            <div className="pb-4 flex justify-between items-center gap-1 border-b">
                <div>
                    <h2 className="font-semibold text-lg">Product Inventory</h2>
                    <p className="text-muted-foreground text-sm">Manage your products with full CRUD operators</p>
                </div>
                <Button onClick={() => navigate(pages.products.new, {state: { background: location }})}>
                    <Plus/>
                    <span>Add New Product</span>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">#</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-center w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-semibold w-[50px] text-center">
                                {index + 1}
                            </TableCell>
                            <TableCell className="flex items-center min-w-max w-full gap-3 float-start mt-1">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-10 h-10 object-cover rounded-md border"
                                />
                                <div className="flex-1">
                                    <p className="font-medium truncate max-sm:w-[100px]">{product.title}</p>
                                    <span className="text-xs text-gray-500">ID: #{product.id}</span>
                                </div>
                            </TableCell>

                            <TableCell className="font-semibold">
                                ${product.price.toFixed(2)}
                            </TableCell>

                            <TableCell>
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                                    {categories.find(item => item.id === product.categoryId)?.title}
                                </span>
                            </TableCell>

                            <TableCell className="flex gap-1 justify-end items-center float-start">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => navigate(pages.products.detail(product.id))}
                                >
                                    <Eye className="w-4 h-4 text-blue-500" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => navigate(pages.products.edit(product.id), {state: { background: location }})}
                                >
                                    <Pencil className="w-4 h-4 text-green-600" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => navigate(pages.products.delete(product.id), {state: { background: location }})}
                                >
                                    <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TableProducts
