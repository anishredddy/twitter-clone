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

        let likedIds= [...(post?.likedIds || [])];

        likedIds = likedIds.filter((likedId) => likedId !== params.userId);

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
        console.log("[REMOVE_LIKE_POST_ERROR")
        return new NextResponse("error", {status:500})
    }
}