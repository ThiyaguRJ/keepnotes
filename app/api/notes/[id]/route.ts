import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await ConnectDB();

  const { title, content } = await request.json();
  const { id } = context.params;

  const updated = await Notes.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await ConnectDB();

  const { id } = context.params;

  await Notes.findByIdAndDelete(id);

  return NextResponse.json({ message: "Note deleted" });
}
