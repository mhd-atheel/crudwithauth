import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app//models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();


// user login api controller 

export  async function POST(request: NextRequest) {


    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);
        
         //check if user already exists
         const user = await User.findOne({email})
         if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        // cheking encripted password valid using bcryptjs
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        
        // set jwt token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // after password validation gendrate JWT token
        const token = await jwt.sign(tokenData,process.env.JWT_TOKEN!, { expiresIn: "1d" })

        // send response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
            user

        })
        
        // lastly set cookie as a jwt token

        response.cookies.set("token", token, {
            httpOnly: true,

        })
        console.log(response)
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}