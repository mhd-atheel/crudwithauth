"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const Create = ({ params }: any) => {
    const router = useRouter()
  const [loading, setLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    userid: "",
  });
  
  // fetch a record using userId  and set value into the input values
  const fetchRecord = async () => {
    setLoading(true);
    const response = await axios.get(`/api/records/recordbyid/${params.id}`);
    console.log(response);
    // console.log(response.data.user._id);
    setData({
      ...data,
      name: response.data.name,
      email: response.data.email,
      age: response.data.age,
      phone: response.data.phone,
      userid:response.data.userid
    });
    await setLoading(false);
    
  };
   
  // update function
  const onUpdate= async () => {
    try {
        setEditLoading(true);
      const response = await axios.put(`/api/records/recordbyid/${params.id}`,
       data);
      console.log("Update success", response.data);
      router.push("/");
      setEditLoading(false);
    } catch (error: any) {
      console.log("Update Faild failed", error.message);
    } finally {
        setEditLoading(false);
    }
  };



  React.useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div className="flex justify-center items-center m-auto h-screen bg-white">
      <div className="w-6/12 h-96 rounded-3xl justify-center items-center flex-col flex ">
        {loading === true ? (
          <p className='px-6 py-4 whitespace-no-wrap text-black'>Loading...</p>
        ) : (
          <>
            <h6 className="text-left text-3xl font-bold  text-slate-900 mt-3 mb-3">
              Edit the Record
            </h6>
            <input
              className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
              type="text"
              name="name"
              id=""
              placeholder="Enter Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              className="p-3 m-3 mt-0 rounded-md w-5/12 text-black  border-black bg-slate-300"
              type="text"
              name="email"
              id=""
              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
              type="text"
              name="age"
              id=""
              placeholder="Enter Age"
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
            />
            <input
              className="p-3 m-3 mt-0 rounded-md w-5/12 text-black border-black bg-slate-300"
              type="text"
              name="phone"
              id=""
              placeholder="Enter Phone Number"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <button onClick={onUpdate} className="p-3 rounded-md w-5/12 bg-slate-900 mt-5 font-bold">
              {" "}
              {editLoading == false ? (
                <h6 className="text-center text-lg ">Edit</h6>
              ) : (
                <h6 className="text-center text-lg ">Loading...</h6>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Create;
