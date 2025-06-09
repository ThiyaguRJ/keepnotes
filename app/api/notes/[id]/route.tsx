import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: { id: string } }
) {
  await ConnectDB();
  const { title, content } = await req.json();
  console.log(params.params.id, "params.id");
  const updated = await Notes.findByIdAndUpdate(
    params.params.id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  params: { params: { id: string } }
) {
  await ConnectDB();
  await Notes.findByIdAndDelete(params.params.id);
  return NextResponse.json({ message: "Note deleted" });
}
