import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params } : { params: {userId: string}}
){
    try{

        if(!params.userId){
            return new NextResponse("Invalid Id",{status:500})
        }

        const existingUser=await prismadb.user.findUnique({
            where:{
                id: params.userId
            }
        })

        const followersCount=await prismadb.user.count({
            where:{
                followingIds:{
                    has: params.userId
                }
            }
        })

        return NextResponse.json({...existingUser,followersCount})
    }
    catch(error){
        console.log("FOLLOWER_ERROR",error)
        return new NextResponse("ERROR FOLLOWERS",{status:400})
    }

}