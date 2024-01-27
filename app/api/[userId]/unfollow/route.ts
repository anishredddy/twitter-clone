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

    try {

        const body =await req.json();

        const { followerId } = body;

        // console.log(followerId)

        if(!params.userId){
            return new NextResponse("cant find user",{status:400})
        }

        const user = await prismadb.user.findUnique({
            where: {
              id: params.userId
            }
          });

        if(!user){
            return new NextResponse("user does not exist",{status:403})
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        // console.log(updatedFollowingIds)

        
        updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== followerId);

        // console.log(updatedFollowingIds)

        await prismadb.notification.create({
            data: {
                userId: followerId,
                body: 'Someone Unfollowed you'
            }
        })

        const updatedUser = await prismadb.user.update({
            where:{
                id: params.userId
            },
            data:{
                // hasNotifications: true,
                followingIds: updatedFollowingIds,
            }
        })

        return NextResponse.json(updatedUser)

    }
    catch(error){
        // console.log("[FOLLOWER_POST]",error)
        return new NextResponse("cant follow ",{status:400})
    }
}