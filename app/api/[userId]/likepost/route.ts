import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params}:{
        params:{
            userId: string
        }
    }
) {
    try{
        const body= await req.json();

        const { postId } = body;


        const post = await prismadb.post.findUnique({
            where:{
                id: postId
            }
        })
        if(post?.userId){
            await prismadb.notification.create({
                data: {
                    userId: post?.userId,
                    body: 'Someone liked your post'
                }
            })
        }

        const likedIds= [...(post?.likedIds || [])];

        likedIds.push(params.userId);

        const updatedPost = await prismadb.post.update({
            where:{
                id: postId
            },
            data:{
                likedIds: likedIds
            }
        })

        return NextResponse.json(updatedPost)

    }
    catch(error){
        console.log("[LIKE_POST_ERROR")
        return new NextResponse("error", {status:500})
    }
}