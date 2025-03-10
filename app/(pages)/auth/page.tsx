'use client';

// auth page
import axios from "axios";
import Input from "@/app/components/input";
import { useCallback, useState } from "react";

const Auth = () => {
    const [email, setEmail]    = useState('');
    const [name, setName]    = useState('');
    const [password, setPassword]    = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentvariant) => currentvariant === 'login' ? 'register' : 'login');
    },[]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/auth/register', {
                email,
                name,
                password
            });
        } catch (error) {
            console.log(error);
        }
    },[email, name, password]);

    return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black h-full w-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="logo" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant === 'login' ? 'Sign in' : 'Register'}
                </h2>
                <div className="flex flex-col gap-4">
                    {variant === 'register' && (
                        <Input
                            id="name"
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
                            lable="username"
                            value={name}                    
                        />
                    )}
                    <Input
                    id="email"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
                    type="email"
                    lable="Email"
                    value={email}                    
                    />
                    <Input
                    id="password"
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
                    type="password"
                    lable="password"
                    value={password}                    
                    />
                </div>
                <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === 'login' ? 'Login' : 'Sign up'}
                </button>
                <p className="text-neutral-500 mt-12 text-center">
                    {variant === 'login' ? 'Firs time using Netflix?' : 'Already have an account?'}
                    <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                        {variant === 'login' ? 'Sign up now' : 'Login'}
                    </span>
                </p>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Auth;