import { Notes } from "@/model/notes";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: Props) {
  await ConnectDB();

  const { title, content } = await request.json();
  const { id } = params;

  const updated = await Notes.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  await ConnectDB();

  const { id } = params;

  await Notes.findByIdAndDelete(id);

  return NextResponse.json({ message: "Note deleted" });
}
