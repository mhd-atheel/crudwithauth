import { connect } from "@/app/dbConfig/dbConfig";
import  User  from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connect();

// gendrating user details using jwt token

export async function GET(request:NextRequest){
    try {

        // get token from storage  and check null value
       const token = request.cookies.get("token")?.value || '';

       // verify the token 
       const decodedToken:any = jwt.verify(token,process.env.JWT_TOKEN!);

       // find the user details using decodedToken id without password
       const user = await User.findOne({_id:decodedToken.id}).select('-password')

       return NextResponse.json({user})
      
    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500})
    }
}