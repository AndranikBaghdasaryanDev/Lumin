import { type z } from "zod";
import { registerSchema } from "../../lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../ui/Error";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../ui/Loading";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const { isLoading, register: registerUser }: any = useAuthStore();
    const [error, setError] = useState({ status: false, message: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const navigate = useNavigate();

    const handleSave = async (data: RegisterFormValues) => {
        try {
            setError({ status: false, message: "" });
            await registerUser(data);
            reset();
            navigate("/login");
        } catch (err: any) {
            setError({ status: true, message: err?.message || "Something went wrong." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            {/* Header Icons/Lang (Optional matching the photo) */}
            <div className="w-full max-w-[400px] flex justify-between mb-8">
                <div className="bg-white px-3 py-1 rounded-md border text-sm flex items-center gap-2 cursor-pointer">
                    🇺🇸 English <span>▾</span>
                </div>
                <div className="bg-white px-3 py-1 rounded-md border text-sm flex items-center gap-2 cursor-pointer">
                    <span>(?)</span> Help
                </div>
            </div>

            <div className="w-full max-w-[440px] bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-100">
                {/* Logo & Heading */}
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-blue-200 shadow-lg">
                        <span className="text-white font-bold text-xl">L</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
                    <p className="text-gray-500 text-sm mt-1">Join Lumin to start your journey</p>
                </div>

                {error?.status && <Error message={error.message} />}

                <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                    {/* Name Group */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                placeholder="First name"
                                {...register("firstName")}
                                className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errors.firstName ? "border-red-500" : "border-gray-200"}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last name"
                                {...register("lastName")}
                                className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errors.lastName ? "border-red-500" : "border-gray-200"}`}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            {...register("email")}
                            className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errors.email ? "border-red-500" : "border-gray-200"}`}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your Password"
                                {...register("password")}
                                className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errors.password ? "border-red-500" : "border-gray-200"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <img src={showPassword ? hide : show} className="w-5 h-5" alt="toggle" />
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                {...register("confirmPassword")}
                                className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <img src={showConfirmPassword ? hide : show} className="w-5 h-5" alt="toggle" />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-3">
                        <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
                            Login with Google
                        </button>
                        <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                            <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5 h-5" alt="fb" />
                            Login with Facebook
                        </button>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg mt-4 shadow-md shadow-blue-100 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Didn't have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                </p>
            </div>

            {/* Footer Links */}
            <p className="mt-8 text-xs text-gray-400 text-center">
                By proceeding, you agree to our <span className="text-blue-500 cursor-pointer">Terms of Service</span> and <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
            </p>
        </div>    );
};
