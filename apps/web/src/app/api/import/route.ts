import { NextRequest, NextResponse } from "next/server";
import { parseCSV } from "@CheckedIn/db/import/parseCSV";
import { validateRows } from "@CheckedIn/db/import/validateRows";
import { insertParticipants } from "@CheckedIn/db/import/insertParticipants";
import type { ImportSummary } from "@CheckedIn/db/import/types";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const eventId = formData.get("eventId") as string | null;

  if (!file || !eventId) {
    return NextResponse.json(
      { error: "Missing file or eventId" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const rawRows = parseCSV(fileBuffer);
  const { validRows, errors } = validateRows(rawRows);
  const { insertedCount } = await insertParticipants(validRows, eventId);

  const summary: ImportSummary = {
    totalRows: rawRows.length,
    insertedCount,
    errors,
  };

  return NextResponse.json(summary);
}