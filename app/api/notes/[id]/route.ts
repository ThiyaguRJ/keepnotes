import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();

    const { title, content } = await request.json();
    
    const { id } = await params;

    const updated = await Notes.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    return NextResponse.json(updated);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectDB();

    const { id } =await params;

    await Notes.findByIdAndDelete(id);

    return NextResponse.json({ message: "Note deleted" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
