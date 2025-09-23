import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/shared/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { loginFormSchema } from "../lib/data"
import { useNavigate } from "react-router-dom"
import { pages } from "@/shared/constants/pages"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/redux-store"
import { login } from "@/shared/api/requests/auth/auth.request"
import { loginSuccess } from "@/store/auth-slice/authSlice"

export function LoginFormContent() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(loginSuccess({user : data.user}))
            navigate(pages.dashboard)
        },
        onError: (err: any) => {
            console.error("Login failed:", err.message)
        }
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="gap-1">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="gap-1">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="******" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-1" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign in to Dashboard"}
                </Button>
            </form>

            {error && (
                <p className="mt-2 text-center text-sm text-red-500">
                    {(error as Error).message}
                </p>
            )}

            <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <Button
                    onClick={() => navigate(pages.register)}
                    variant="link"
                    className="p-0 h-auto"
                >
                    Sign up
                </Button>
            </p>
        </Form>
    )
}
