'use client'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

import axios from 'axios'
export default function Home() {
  const router = useRouter();
  interface MyData {
    _id: number;
    name: string;
    email: string;
    age: Number;
    phone: string;
  }

  const [data, setData] = React.useState({
    id: "",
    username: ""

  })
  const [record, setRecord] = React.useState<MyData[]>([])

  useEffect(() => {
    fetchProfile()

  }, [])
 

  // fetch user profile details
  const fetchProfile = async () => {
    const response = await axios.get("/api/users/profile");
    console.log(response);
    console.log(response.data.user._id);
    await fetchUsers(response.data.user._id)
    setData({
      id: response.data.user._id,
      username: response.data.user.username
    })
  }
 
  // fetch specific user record
  const fetchUsers = async (user: any) => {
    const response = await axios.post("/api/records/record",
      { "userid": user }
    )
    console.log(response.data);
    setRecord(response.data);
  }

  // delete a record fuction
  const onDelete= async (id: any,user: any) => {
    try {
        
      const response = await axios.delete(`/api/records/recordbyid/${id}`);
      console.log("Delete success", response.data);
      router.push("/");
      await fetchUsers(user)
      
    } catch (error: any) {
      console.log("Delete Faild failed", error.message);
    } 
  };
 

// logout funtion
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        router.push('/login')
    } catch (error:any) {
        console.log(error.message);
    }
}
  



  return (
    <main className="flex min-h-screen flex-col items-center    m-auto  bg-white">
      <div className='h-[50px] w-full bg-slate-900 flex flex-row  items-center justify-between pl-10 px-10' >
        <h1 className='text-white text-lg font-bold '>Faggin Apps</h1>
        <h1 className='text-white text-lg font-bold '>{data.username} </h1>
        <div className='flex flex-row  items-center justify-between '>
          <button onClick={() => router.push('/create')} className='bg-orange-400 p-1 pl-4 px-4 font-extrabold text-white rounded-md mx-2'>Create +</button>
          <button onClick={logout}> <h1 className='text-red-600 text-lg font-bold float-left'>Logout</h1></button>
        </div>

      </div>
      <div>


      </div>

      {record.length === 0 ? (
        <p className='px-6 py-4 whitespace-no-wrap text-black'>No Records Found</p>
      ) :<table className="w-8/12 divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Id</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Age</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {record.map((item,index) => (
          <tr key={item._id}>
            <td className="px-6 py-4 whitespace-no-wrap text-black">{index+1}</td>
            <td className="px-6 py-4 whitespace-no-wrap text-black">{item.name}</td>
            <td className="px-6 py-4 whitespace-no-wrap text-black">{item.age.toString()}</td>
            <td className="px-6 py-4 whitespace-no-wrap text-black">{item.email}</td>
            <td className="px-6 py-4 whitespace-no-wrap text-black">{item.phone}</td>
            <td className="px-6 py-4 whitespace-no-wrap text-black flex-row flex ">
              <button  onClick={()=>{
                router.push(`/edit/${item._id}`)
              }} className='bg-green-600 p-2 pl-4 px-4 font-extrabold text-white rounded-md mx-2'>Edit</button>
              <button onClick={()=>{
                onDelete(item._id,data.id)
              }}
               className='bg-red-600 p-2 pl-4 px-4 font-extrabold text-white rounded-md'>Delete</button>
            </td>
          </tr>
        ))}


      </tbody>
    </table>
        
      }


    </main>
  )
}
