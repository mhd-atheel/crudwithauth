"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Create = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        userid: "",
    });
    React.useEffect(() => {
        fetchProfile()
    }, [])

    // fetch user id 
    const fetchProfile = async () => {
        const response = await axios.get("/api/users/profile");
        console.log(response);
        console.log(response.data.user._id);
        setData({
            ...data,
            userid: response.data.user._id,
        })
    }

    // create new record function
    const onCreate = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/records/create", data);
            console.log("Date Created success", response.data);
            router.push("/");
            setLoading(false)
        } catch (error: any) {
            console.log("Created failed", error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="flex justify-center items-center m-auto h-screen bg-white">
            <div className="w-6/12 h-96 rounded-3xl justify-center items-center flex-col flex ">

                <h6 className="text-left text-3xl font-bold  text-slate-900 mt-3 mb-3">
                    Create New Record
                </h6>
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black  border-black bg-slate-300"
                    type="text"
                    name="email"
                    id=""
                    placeholder="Enter Email"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
                    type="text"
                    name="age"
                    id=""
                    placeholder="Enter Age"
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                />
                <input
                    className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
                    type="text"
                    name="phone"
                    id=""
                    placeholder="Enter Phone Number"
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />

                <button
                    className="p-3 rounded-md w-5/12 bg-slate-900 mt-5 font-bold"
                    onClick={onCreate}
                >  {loading == false ? (
                    <h6 className="text-center text-lg ">
                        Create
                    </h6>
                ) : (
                    <h6 className="text-center text-lg ">
                        Loading...
                    </h6>
                )}
                </button>

            </div>
        </div>
    )
}

export default Create;