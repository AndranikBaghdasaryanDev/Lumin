import type z from "zod";
import { registerSchema } from "../../lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { Error } from "../ui/Error";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    const handleSave = (data: RegisterFormValues) => {
        console.log("Register Data:", data);
        reset();
    }

    return <>
        <form onSubmit={handleSubmit(handleSave)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">

            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            {/* First Name */}
            <div className="mb-4">
                {errors.firstName && <Error message={errors.firstName.message} />}
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                    type="text"
                    placeholder="Enter first name"
                    autoComplete="given-name"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("firstName")}
                />
            </div>

            {/* Last Name */}
            <div className="mb-4">
                {errors.lastName && <Error message={errors.lastName.message} />}
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                    type="text"
                    placeholder="Enter last name"
                    autoComplete="family-name"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("lastName")}
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                {errors.email && <Error message={errors.email.message} />}
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
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
                    placeholder="Enter password"
                    autoComplete="new-password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("password")}
                />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                {errors.confirmPassword && <Error message={errors.confirmPassword.message} />}
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                    {...register("confirmPassword")}
                />
            </div>

            <button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
                Register
            </button>

        </form>
    </>
}