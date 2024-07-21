import { NextResponse } from "next/server";

export async function GET(req, res) {
  const data = {
    message: "Shhh! this is a secret page!",
  };

  return NextResponse.json(data, { status: 200 });
}
