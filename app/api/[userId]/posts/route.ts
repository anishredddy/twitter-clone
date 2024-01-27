import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: {
        params: {
            userId: string
        }
    }
) {
    try{
        if(!params.userId){
            return new NextResponse("invalid user",{status:401})
        }

        const body_post = await req.json();

        const { body } = body_post;

        const post = await prismadb.post.create({
            data:{
                body: body,
                userId: params.userId,
            }
        })

        return NextResponse.json(post);

    }
    catch(error){
        console.log("[POSTS_POST_ERROR]",error)
        return new NextResponse("Error in post",{status:500})
    }
}

export async function GET(
    req: Request,
    { params } : {
        params : {
            userId: string
        }
    }
) {
    try{
        if(!params.userId){
            return new NextResponse("invalid user",{status:401})
        }

        const posts=await prismadb.post.findMany({
            where:{
                userId: params.userId
            },
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(posts)

    }
    catch(error){
        console.log("[POSTS_GET_ERROR]",error)
        return new NextResponse("GET ERROR",{status:500})
    }
}