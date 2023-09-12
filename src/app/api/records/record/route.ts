import { connect } from "@/app/dbConfig/dbConfig";
import Record from "@/app//models/recordModel";
import { NextRequest, NextResponse } from "next/server";


connect();

// this is for finding specific users  records 
// only accecble their are records
// mongoose and mongodb
export  async function POST(request: NextRequest) {


    try {
        const reqBody = await request.json()
        const { userid } = reqBody
        console.log(reqBody);

        const record = await Record.find({userid})


        return NextResponse.json(record)


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}