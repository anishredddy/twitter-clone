import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST (
    req: Request
){
    try{
        const body=await req.json();

        const {
            name,
            username,
            email,
            password
        }=body;

        const user=await prismadb.user.create({
            data:{
                name,
                username,
                email,
                hashedPassword: password,
            }
        })

        return NextResponse.json(user);
    }
    catch(error){
        console.log("REGISTER_ERROR",error)

        return new NextResponse("REGISTER_ERROR",{status:400})
    }
}
