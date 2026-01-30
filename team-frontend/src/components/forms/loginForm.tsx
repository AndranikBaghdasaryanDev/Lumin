import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/validations/auth";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../ui/Error";
import { useState } from "react";
import show from "../../assets/show.svg"
import hide from "../../assets/hide.svg"
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Loading } from "../ui/Loading";
import { Input } from "../reusable/input";
import { Button } from "../reusable/button";
type LoginFormValues = z.infer<typeof loginSchema>;


export const LoginForm = () => {
    const {isLoading,login}:any = useAuthStore()
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [error, setError] = useState({status:false,message:""});
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
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
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
          L
        </div>
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
            {...register("email")}
            classNameInput={`w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            classNameLabel="block text-sm font-medium text-gray-700 mb-1"
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
            classNameInput={`w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            classNameLabel="block text-sm font-medium text-gray-700 mb-1"
          />
          <div className="relative">
            <Button
            type="button"
            onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
            classNameButton="absolute bottom-1/2 right-3 -translate-y-1/2 bg-transparent p-0 border-0 cursor-pointer" 
            src={togglePasswordVisibility ? hide : show}
            classNameImg="w-5 h-5"
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
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <Button 
            type="button"
            disabled={true}
            classNameButton="w-full h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-40 cursor-not-allowed"
            classNameImg="w-5 h-5"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            text="Continue with Google"
        >
          
        </Button>

        <Button 
            type="button"
            disabled={true}
            classNameButton="w-full h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-40 cursor-not-allowed"
            classNameImg="w-5 h-5"
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            text="Continue with Facebook"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  </main>

  {/* ===== FOOTER ===== */}
  <footer className="text-xs text-gray-400 text-center py-4 px-4">
    By continuing, you agree to our
    <span className="text-blue-600 cursor-pointer"> Terms </span>
    and
    <span className="text-blue-600 cursor-pointer"> Privacy Policy</span>
  </footer>
</div>

    )
}