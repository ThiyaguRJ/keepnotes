import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectDB } from "../../../../lib/mongodb";
import User from "../../../../model/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await ConnectDB();

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "supersecret", {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
