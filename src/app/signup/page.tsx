"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {

    // for routing other pages
    const router = useRouter();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);


    //signup method 
    const onSignup = async () => {
        try {
            setLoading(true);
            // using axios for server side requests 
            const response = await axios.post("/api/users/signup", data);
            console.log("Signup success", response.data);
            // route home screen after signup success
            router.push("/");
            setLoading(false);
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center items-center m-auto h-screen bg-slate-900">
            <div className="w-6/12 h-96 rounded-3xl justify-center items-center flex-col flex ">
                
                <h6 className="text-left text-2xl font-bold my-4 text-white mt-3">
                    Register to get started
                </h6>
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Your name"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                />
                {nameValid === true ? (
                    <h6 className="text-left text-xs text-red-600 ">please add name </h6>
                ) : (
                    <span></span>
                )}
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black"
                    type="text"
                    name="email"
                    id=""
                    placeholder="Email"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <div className="justify-start items-start flex ">
                    {emailValid === true ? (
                        <h6 className="text-left text-xs text-red-600">please add email</h6>
                    ) : (
                        <span></span>
                    )}
                </div>
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black"
                    type="text"
                    name=""
                    id=""
                    placeholder="Password"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {passwordValid === true ? (
                    <h6 className="text-left text-xs text-red-600 ">
                        please add password
                    </h6>
                ) : (
                    <span></span>
                )}
                <button
                    className="p-3 rounded-md w-5/12 bg-orange-400 mt-5 font-bold"
                    onClick={onSignup}
                >
                 {loading ==false ?(
                    <h6 className="text-center text-lg ">
                        Register
                    </h6>
                ) : (
                    <h6 className="text-center text-lg ">
                        Loading...
                    </h6>
                )}
                </button>
                <div className="justify-start items-start flex ">
                    <h6 className="text-left text-sm text-white mt-5">
                        Already have an account?{" "}
                        <span
                            className="font-bold text-orange-400 cursor-pointer"
                            onClick={() => router.push("/login")}
                        >
                            {" "}
                            Login
                        </span>
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default Signup;