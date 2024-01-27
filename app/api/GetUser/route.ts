import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try{
        const body=await req.json();

        const {username, password} = body;


        const user = await prismadb.user.findFirst({
            where:{
                username,
                hashedPassword: password
            }
        })

        if(!user){
            return new NextResponse("Unauthenticated",{status:403})
        }

        return NextResponse.json(user);
    }
    catch(error){
        console.log("[GET_USER_ERROR]",error)
        
        return new NextResponse("Error",{status:500})
    }
}