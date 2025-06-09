import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
  await ConnectDB();
  const notes = await Notes.find();
  return NextResponse.json(notes)
}

export async function POST(req: NextRequest){
  await ConnectDB();
  const data = await req.json();
  await Notes.create(data)
  return NextResponse.json({message: "Successfully Added"})
}