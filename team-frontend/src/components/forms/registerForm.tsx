import type z from "zod";
import { registerSchema } from "../../lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { Error } from "../ui/Error";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../reusable/input";
import { ButtonToggleVisibility } from "../reusable/buttonToggleVisibility";
import { LinkSocial } from "../reusable/linkSocial";
import { TermsPolicy } from "../reusable/termsPolicy";
import { Divider } from "../reusable/divider";
import { Loading } from "../ui/Loading.tsx";
import { useAuthStore } from "../../stores/authStore";
import { LogoLumin } from "../reusable/logoLumin";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    const {isLoading}:any = useAuthStore();
    const [error, setError] = useState({ status: false, message: "" });
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [toggleConfirmPasswordVisibility, setToggleConfirmPasswordVisibility] = useState(false);

    const handleSave = (data: RegisterFormValues) => {
        console.log("Register Data:", data);
        reset();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ===== CENTER ===== */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl px-6 sm:px-8 py-8">

                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <LogoLumin/>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
                        Create your Lumin account
                    </h1>
                    <p className="text-center text-sm text-gray-500 mt-1 mb-6">
                        Sign up with your email and password
                    </p>

                    {/* ===== REGISTER FORM ===== */}
                    <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                        {error.status && <Error message={error.message || "Error"} />}
                        {isLoading && <Loading />}

                        {/* First Name */}
                        <div>
                            {errors.firstName && <Error message={errors.firstName.message} />}
                            <Input
                                type="text"
                                label="First Name"
                                placeholder="Enter your first name"
                                error={errors.firstName?.message || ""}
                                {...register("firstName")}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            {errors.lastName && <Error message={errors.lastName.message} />}
                            <Input
                                type="text"
                                label="Last Name"
                                placeholder="Enter your last name"
                                error={errors.lastName?.message || ""}
                                {...register("lastName")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            {errors.email && <Error message={errors.email.message} />}
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
error={errors.email?.message || ""}
                                {...register("email")}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            {errors.password && <Error message={errors.password.message} />}
                            <Input
                                type={togglePasswordVisibility ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                error={errors.password?.message || ""}
                                {...register("password")}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
                                    src={togglePasswordVisibility ? "hide" : "show"}
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            {errors.confirmPassword && <Error message={errors.confirmPassword.message} />}
                            <Input
                                type={toggleConfirmPasswordVisibility ? "text" : "password"}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                error={errors.confirmPassword?.message || ""}
                                {...register("confirmPassword")}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setToggleConfirmPasswordVisibility(!toggleConfirmPasswordVisibility)}
                                    src={toggleConfirmPasswordVisibility ? "hide" : "show"}
                                />
                            </div>
                        </div>

                        {/* Terms + Login */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="rounded border-gray-300" />
                                I agree to terms
                            </label>

                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </div>

                        {/* Divider */}
                        <Divider />

                        {/* Social */}
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            text="Continue with Google"
                        />
                        <LinkSocial 
                            type="button"
                            to="#"
                            disabled={true}
                            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                            text="Continue with Facebook"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className="w-full h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 cursor-not-allowed"
                        >
                            Register
                        </button>
</form>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="text-xs text-gray-400 text-center py-4 px-4">
                <TermsPolicy />
            </footer>
        </div>
    )
}