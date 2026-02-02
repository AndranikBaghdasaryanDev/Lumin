import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/validations/auth";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../ui/Error";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Loading } from "../ui/Loading.tsx";
import { Input } from "../reusable/input";
import { ButtonToggleVisibility } from "../reusable/buttonToggleVisibility";
import { LinkSocial } from "../reusable/linkSocial";
import { TermsPolicy } from "../reusable/termsPolicy";
import { Divider } from "../reusable/divider";
import { LogoLumin } from "../reusable/logoLumin";
type LoginFormValues = z.infer<typeof loginSchema>;


export const LoginForm = () => {
    const { isLoading, login }: any = useAuthStore()
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [error,setError] = useState({ status: false, message: "" });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    })
    
    const navigate = useNavigate();
    const handleSave = (data: LoginFormValues) => {
        login(data);
        reset();
        navigate("/dashboard");
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
                        Welcome back to Lumin
                    </h1>
                    <p className="text-center text-sm text-gray-500 mt-1 mb-6">
                        Login with your email and password
                    </p>

                    {/* ===== YOUR FORM (LOGIC UNTOUCHED) ===== */}
                    <form
                        onSubmit={handleSubmit(handleSave)}
                        className="space-y-4"
                    >
                        {error.status && <Error message={error.message || "Error"} />}
                        {isLoading && <Loading />}

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
                        <div >
                            {errors.password && <Error message={errors.password.message} />}
                            <Input
                                type={togglePasswordVisibility ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                {...register("password")}
                                error={errors.password?.message || ""}
                            />
                            <div className="relative">
                                <ButtonToggleVisibility
                                    type="button"
                                    onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
                                    src={togglePasswordVisibility ? "hide" : "show"}

                                />
                            </div>

                        </div>

                        {/* Remember + Register */}

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="rounded border-gray-300" />
                                Keep me signed in
                            </label>

                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </div>

                        {/* Divider */}
                        <Divider/>

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
                            Login
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