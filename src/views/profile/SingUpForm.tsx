import { CgRename } from 'react-icons/cg'
import { MdOutlineEmail } from 'react-icons/md'
import { TbPasswordFingerprint } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import type { createUserFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../services/AuthApi';
import { toast } from 'react-toastify';

export default function SingUpForm() {
    const navigate = useNavigate();
    const initialValues: createUserFormData = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    const { register, getValues, handleSubmit } = useForm<createUserFormData>({
        defaultValues: initialValues
    });

    const mutation = useMutation({
        mutationFn: createUser,
        onError: (error: any) => {
            toast.error(error.message || "Login failed");
        },
        onSuccess: () => {
            toast.success("Login successful");
            navigate("/auth/login");
        }
    });

    const handleLogin = (formData: createUserFormData) => {
        mutation.mutate(formData);
    }
    
  return (
    <div className="flex justify-center items-center bg-white p-3 w-full">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[1200px] h-[70vh] mt-[100px]">

            {/* LEFT: Create Account */}
            <div className="flex flex-col items-center justify-center text-center w-full md:w-[55%] p-10 relative z-10">
            <h1 className="text-[45px] font-medium text-[#5614f0] mb-4">
                Create Account
            </h1>
            <p className="text-gray-500 mb-8">
                use your name and email to register
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-[400px] space-y-4">

                {/* Name */}
                <div className="relative">
                <CgRename className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    required
                    className="w-full bg-gray-100 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5614f0]"
                />
                </div>

                {/* Email */}
                <div className="relative">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
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
                        {...register("password", { 
                            required: true,
                            minLength: 8
                        })}
                        required
                        className="w-full bg-gray-100 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5614f0]"
                    />
                </div>

                {/* Repeat Password */}
                <div className="relative">
                <TbPasswordFingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                    id="password1"
                    type="password"
                    placeholder="Repeat Password"
                    {...register("passwordConfirmation", { 
                        required: true,
                        minLength: 8,
                        validate: (value) => {
                            const password = getValues('password');
                            if(value !== password) {
                                toast.error("Passwords do not match");
                                return "Passwords do not match";
                            }
                            return true;
                        }
                    })}
                    required
                    className="w-full bg-gray-100 pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5614f0]"
                />
                </div>

                <button
                type="submit"
                className="w-full py-2 rounded-full bg-[#5614f0] text-white hover:bg-[#200563] transition"
                >
                SIGN UP
                </button>
            </form>
            </div>

            {/* RIGHT: Welcome Back */}
            <div className="bg-[#5614f0] text-white flex flex-col items-center justify-center w-full md:w-1/2 p-10 rounded-r-2xl">
            <h1 className="text-5xl font-extrabold mb-4">To Access!</h1>
            <p className="text-lg mb-8 text-center">
                To stay connected, please login with your account.
            </p>

            <button className="border border-white text-white rounded-full px-10 py-2 shadow-sm hover:bg-[#200563] transition">
                <Link to="/auth/login" className="text-white no-underline">
                SIGN IN
                </Link>
            </button>
            </div>

        </div>
        </div>

  )
}
