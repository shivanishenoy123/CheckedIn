import type { ParticipantRow } from "./schema";

// PLACEHOLDER: swap this import for the real table once your teammate
// defines it in his Drizzle schema file (likely packages/db/src/schema.ts
// or similar). For now this is a guess based on the PRD's data model.
// import { participants } from "./drizzleSchema";
// import { db } from "./client";

export interface InsertResult {
  insertedCount: number;
}

export async function insertParticipants(
  rows: ParticipantRow[],
  eventId: string
): Promise<InsertResult> {
  if (rows.length === 0) {
    return { insertedCount: 0 };
  }

  // What we'll eventually run once the real schema exists:
  //
  // await db.insert(participants).values(
  //   rows.map((row) => ({
  //     eventId,
  //     name: row["Full Name"],
  //     studentId: row["Student ID"],
  //     email: row["Email"],
  //     phone: row["Phone"],
  //     department: row["Department"],
  //   }))
  // );

  // Temporary stand-in so this function is testable before the DB exists:
  console.log(`[stub] Would insert ${rows.length} rows for event ${eventId}`);

  return { insertedCount: rows.length };
}