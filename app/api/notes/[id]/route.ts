import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await ConnectDB();
  const { title, content } = await req.json();
  const updated = await Notes.findByIdAndUpdate(
    context.params.id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updated);
}


export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await ConnectDB();
  await Notes.findByIdAndDelete(context.params.id);
  return NextResponse.json({ message: "Note deleted" });
}
