import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2} from 'lucide-react';

const LoginPage = () => {

const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  email:"",
  password:""
});


const {login, isLoggingIn} = useAuthStore();
const handleSubmit = async (e)=>{
  e.preventDefault();
  login(formData);
}

  return (
    <div className="h-[91vh] grid lg:grid-cols-2">

      {/* left side of the form */}
      <div className="flex flex-col justify-center items-center p-3 sm:p-10">
        <div className="h-full w-full max-w-md space-y-8">

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap 2 group">
                <div className='size - 12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    {/* Icon of message */}
                    <MessageSquare className="size-6 text-primary"/>
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                <p className="text-base-content/60">Good to have you in our family!</p>
              </div>
            </div>

            {/* input fields */}
            <form onSubmit={handleSubmit} className="space-y-6">

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

                <button type="submit" className="btn btn-primary w-full" disabled = {isLoggingIn}>
                  {
                    isLoggingIn?(<><Loader2 className="size-5 animate-spin"/> Loading..</>):("log In")
                  }
                </button>
            </form>

            <div className="text-center">
              <p className="text-base-content/60"> Dont have an account? 
              <Link to="/signup" className="link link-primary"> Create an account</Link>
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

export default LoginPage
