import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User,UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  })

  // from useAuthStore get the signup variable req for auth
  const {signup, isSigningUp} = useAuthStore();
  const validateForm = ()=>{

    if(!formData.fullName.trim()) return toast.error("Full Name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
              toast.error("Invalid email format");
              return false;
    }

    if(formData.password.length < 6) return toast.error("Passoword must be at least 6 characters");

    return true;

  }

  //prevent the refresh of the page
  const handleSubmit = (e)=>{
    e.preventDefault(); 

    const success = validateForm()
    if(success) signup(formData);
  }

  return (
    <div className="h-75% grid lg:grid-cols-2">

      {/* left side of the form */}
      <div className="flex flex-col justify-center items-center p-10 sm:p-12">
        <div className="w-full max-w-md space-y-8">

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap 2 group">
                <div className='size - 12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    {/* Icon of message */}
                    <MessageSquare className="size-6 text-primary"/>
                </div>
                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                <p className="text-base-content/60">Good to have you in our family!</p>
              </div>
            </div>

            {/* input fields */}
            <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center gap-2 pointer-events-none z-10">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="input input-bordered w-full pl-10 outline-none focus:outline-none focus:ring-0"
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                  {/* email field */}
                  <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center gap-2 pointer-events-none z-10">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        className="input input-bordered w-full pl-10 outline-none focus:outline-none focus:ring-0"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                  </div>
                </div>

                {/*password*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>

                  <div className="relative">
                    {/* Left lock icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Input */}
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10 pr-10 outline-none focus:outline-none focus:ring-0"
                      placeholder="*************"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />

                    {/* Right eye toggle */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled = {isSigningUp}>
                  {
                    isSigningUp?(<><Loader2 className="size-5 animate-spin"/> Loading..</>):("Create Account")
                  }
                </button>
            </form>

            <div className="text-center">
              <p className="text-base-content/60"> Already have an account? 
              <Link to="/login" className="link link-primary"> Sign in</Link>
              </p>
            </div>
        </div>
      </div>

      {/* Right side  it is a component to make it resuable*/}
      
        
      <AuthImagePattern
        title = "Join our community"
        subtitle = "Connect with  friends, share moments, and stay in touch with your loved ones."
      />



      
    </div>
  )
}

export default SignUpPage
