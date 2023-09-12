import { connect } from "@/app/dbConfig/dbConfig";
import Record from "@/app//models/recordModel";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from 'next/router';


connect();

// this is for create new records 
// mongoose and mongodb
export  async function POST(request: NextRequest) {


    try {

        const reqBody = await request.json()
        const { name,age,email,phone,userid } = reqBody
        console.log(reqBody);

        const newRecord = new Record({
            name,age,email,phone,userid
        })

        const savedRecord = await newRecord.save()
        return NextResponse.json(savedRecord)


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}