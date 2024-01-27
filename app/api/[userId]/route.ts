import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    {params}:{
        params:{
            userId: string
        }
    }
){
    
    try{
        const body=await req.json();


        const {name,username,bio,coverImage,profileImage}=body;


        const user=await prismadb.user.updateMany({
            where:{
                id: params.userId
            },
            data:{
                name,
                username,
                bio,
                coverImage,
                profileImage

            }
        })

        return NextResponse.json(user)


    }
    catch(error){
        console.log("[USERID_PATCH]",error)
        return new NextResponse("Errorzzzz",{status:500})
    }
}