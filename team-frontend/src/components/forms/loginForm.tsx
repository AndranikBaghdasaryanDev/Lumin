import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/validations/auth";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../ui/Error";

type LoginFormValues = z.infer<typeof loginSchema>;


export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    })

    const handleSave = (data: LoginFormValues) => {
        console.log("Login Data:", data);
        reset();
    }
    return (
        <form onSubmit={handleSubmit(handleSave)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">

            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {/* Email */}
            <div className="mb-4">
                {errors.email && <Error message={errors.email.message} />}
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("email")}
                />
            </div>

            {/* Password */}
            <div className="mb-6">
                {errors.password && <Error message={errors.password.message} />}
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("password")}
                />
            </div>

            <button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
                Login
            </button>

        </form>

    )
}