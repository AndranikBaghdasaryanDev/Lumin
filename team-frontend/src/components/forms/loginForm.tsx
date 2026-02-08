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
import { useToastStore } from "../../stores/toastStore.ts";
import { Button } from "../ui/Button.tsx";
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
    const {success: toastSuccess, error: toastError} = useToastStore();
    
    const navigate = useNavigate();
    const handleSave = async (data: LoginFormValues) => {
        try{
            await login(data.email, data.password);
            toastSuccess("Logged in successfully");
            reset();
            navigate("/dashboard");
        }catch(error: any) {
            toastError(error.message || "Login failed");
        }
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
                        Welcome back to Lumin
                    </h1>
                    <p className="text-center text-gray-500 text-base mb-10">
                        Login with your email and password
                    </p>

                    {/* ===== YOUR FORM (LOGIC UNTOUCHED) ===== */}
                    <form
                        onSubmit={handleSubmit(handleSave)}
                        className="space-y-6"
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
                            <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="font-medium">Keep me signed in</span>
                            </label>

                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
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
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={isLoading}
                            disabled={Object.keys(errors).length > 0}
                            className="w-full mt-4 h-12 rounded-2xl"
                            >
                            Login
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