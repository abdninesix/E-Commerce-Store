import User from "@/lib/models/User";
import { connect2DB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connect2DB();

        let user = await User.findOne({ clerkId: userId })

        if (!user) {
            user = await User.create({ clerkId: userId })
            await user.save()
        }
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("[users_GET]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}