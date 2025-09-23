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
import { registerFormSchema } from "../lib/data"
import { useNavigate } from "react-router-dom"
import { pages } from "@/shared/constants/pages"
import { useMutation } from "@tanstack/react-query"
import { register } from "@/shared/api/requests/auth/auth.request" // 👈 register API funksiya

export function RegisterFormContent() {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess: () => {
            navigate(pages.login)
        },
        onError: (error) => {
            console.error("Register error:", error)
        }
    })

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        mutate(values) 
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="gap-1">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    {isPending ? "Registering..." : "Register"}
                </Button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Button onClick={() => navigate(pages.login)} variant="link" className="p-0 h-auto">
                    Sign in
                </Button>
            </p>
        </Form>
    )
}
