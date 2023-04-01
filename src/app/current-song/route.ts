import { NextResponse } from "next/server";
import { getRecentListening } from "../../helpers/getRecentListeningData";

export async function GET(request: Request) {
  const recentListeningData = await getRecentListening();
  // NextResponse extends the Web Response API
  return NextResponse.json({ ...recentListeningData });
}
