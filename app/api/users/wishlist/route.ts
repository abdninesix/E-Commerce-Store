import User from "@/lib/models/User";
import { connect2DB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connect2DB()

        const user = await User.findOne({ clerkId: userId })

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const { productId } = await req.json()

        if (!productId) {
            return new NextResponse("ProductId is required", { status: 400 });
        }

        const isLiked = user.wishlist.includes(productId)

        if (isLiked) {
            user.wishlist = user.wishlist.filter((id: string) => id !== productId)
        } else {
            user.wishlist.push(productId)
        }

        await user.save()
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("[wishlist_POST]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}