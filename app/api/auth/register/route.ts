import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ConnectDB } from "../../../../lib/mongodb";
import User from "../../../../model/User";

export async function POST(req: Request) {
  await ConnectDB();

  try {
    const { username, email, password } = await req.json();

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
} 