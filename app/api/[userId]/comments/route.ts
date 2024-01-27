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

        const body_comment = await req.json();

        const { body , postId } = body_comment;

        const comment = await prismadb.comment.create({
            data:{
                body: body,
                userId: params.userId,
                postId,
            },
            include: {
                post: true
            }
        })

        await prismadb.notification.create({
            data:{
                userId: comment.post.userId,
                body: "Someone commented on your post"
            }
        })

        return NextResponse.json(comment);

    }
    catch(error){
        console.log("[COMMENT_POST_ERROR]",error)
        return new NextResponse("Error in comment",{status:500})
    }
}
