import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDB();

  const { title, content } = await req.json();
  const { id } = await params;

  const updated = await Notes.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await ConnectDB();

  const { id } = await params;

  await Notes.findByIdAndDelete(id);

  return NextResponse.json({ message: "Note deleted" });
}
