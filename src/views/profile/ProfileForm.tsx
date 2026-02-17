import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import type { loginFormData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/AuthApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export function ProfileForm() {
    const navigate = useNavigate();
    const initialValues: loginFormData = {
        email: "",
        password: ""
    };

    const { register, handleSubmit } = useForm<loginFormData>({
        defaultValues: initialValues
    });

    const mutation = useMutation({
        mutationFn: login,
        onError: (error: any) => {
            toast.error(error.message || "Login failed");
        },
        onSuccess: () => {
            toast.success("Login successful");
            navigate("/");
        }
    });

    const handleLogin = (formData: loginFormData) => {
        mutation.mutate(formData);
    }

  return (
    <div className="flex justify-center items-center mt-5 bg-white p-3 w-full">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[1200px] h-[70vh] mt-[50px]">

            {/* LEFT: Welcome Back */}
            <div className="bg-[#5614f0] text-white flex flex-col items-center justify-center w-full md:w-1/2 p-10 relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">Welcome Back!</h1>
            <p className="text-lg mb-8 text-center">
                or create an account with your email.
            </p>

            <button className="border border-white text-white rounded-full px-10 py-2 shadow-sm hover:bg-[#200563] transition">
                <Link to="/auth/signup" className="no-underline text-white">
                SIGN UP
                </Link>
            </button>
            </div>

            {/* RIGHT: Login */}
            <div className="bg-violet-100 text-center flex flex-col items-center justify-center w-full md:w-1/2 p-10 relative z-10">
            <h1 className="text-[45px] font-medium text-[#5614f0] mb-4">
                Login
            </h1>
            <p className="text-gray-500 mb-8">
                use your email to login
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-[400px] space-y-4">
                {/* Email */}
                <div className="relative">
                    <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", { 
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                        required
                        className="w-full bg-gray-100 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5614f0]"
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <TbPasswordFingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        required
                        className="w-full bg-gray-100 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5614f0]"
                    />
                    {/*<Link to='/auth/forgot-password' className="text-gray-500">Forgot Password</Link>*/}
                </div>

                <input
                    type="submit"
                    value="Login"
                    className="w-full py-2 rounded-full bg-[#5614f0] text-white hover:bg-[#200563] transition"
                />
            </form>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center gap-4 mt-8">
                <button className="bg-white rounded-full p-3 shadow">
                <FaTwitter />
                </button>
                <button className="bg-white rounded-full p-3 shadow">
                <FaFacebook />
                </button>
                <button className="bg-white rounded-full p-3 shadow">
                <FaLinkedin />
                </button>
            </div>
            </div>
        </div>
        </div>

  )
}
