import { connect } from "@/app/dbConfig/dbConfig";
import Record from "@/app//models/recordModel";
import { NextRequest, NextResponse } from "next/server";


connect();


// get specific records using params 
// using mongoos findById property 
export async function GET(request: NextRequest, { params }: any) {


    try {

        const { id } = params
        console.log(id);

        const record = await Record.findById(id)


        return NextResponse.json(record)


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

// get specific records using params and update the record  
// using mongoos findOneAndUpdate property 
export async function PUT(request: NextRequest, { params }: any) {

    try {
        const { id } = params;
        const reqBody = await request.json()
        const { name,
            age,
            email,
            phone,
            userid } = reqBody
        
        const record = await Record.findOneAndUpdate({ _id: id }, {
            name,age,email,phone,userid
        }, {
            new: true
        });

        return NextResponse.json(record)


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}


// get specific records using params and delete the record  
// using mongoos findByIdAndDelete property 
export async function DELETE( request: NextRequest, { params }: any) {

    try {
        const { id } = params;
       
        // find the record id and delete
        const record = await Record.findByIdAndDelete(id);

        return NextResponse.json(record)


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}



