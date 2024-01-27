import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(
    req: Request
) {
    try{
        const users = await prismadb.user.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            take:5
        })

        return NextResponse.json(users)
    }
    catch(error){
        console.log("[USERS_GET]",error)
        return new NextResponse("Error fetching users",{status:400})
    }
}