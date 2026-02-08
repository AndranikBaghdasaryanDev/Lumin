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
import { Button } from "../ui/Button.tsx";

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">

            {/* ===== CENTER ===== */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl px-8 sm:px-10 py-12 border border-gray-100/50">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <LogoLumin/>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
                        Create your Lumin account
                    </h1>
                    <p className="text-center text-gray-500 text-base mb-10">
                        Sign up with your email and password
                    </p>

                    {/* ===== REGISTER FORM ===== */}
                    <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
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
                            <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="font-medium">I agree to terms</span>
                            </label>

                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
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
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={isLoading}
                            disabled={Object.keys(errors).length > 0}
                            className="w-full mt-4 h-12 rounded-2xl"
                            >
                            Register
                        </Button>

                    </form>
                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="text-xs text-gray-400 text-center py-6 px-4">
                <TermsPolicy />
            </footer>
        </div>
    )
}