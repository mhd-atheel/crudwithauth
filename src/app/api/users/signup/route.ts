import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app//models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hashing  password from password body
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // add new user detail as newUser
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
         // save the new user data to User collection 
        const savedUser = await newUser.save()

        // set token
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        }
        // gendrate the JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
            user

        })
        
        // set the cookie as a Jwt Token 
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        console.log(response)
        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}