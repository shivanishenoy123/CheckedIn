import { participantRowSchema, type ParticipantRow } from "./schema";

// What we hand back after checking every row: the clean ones, plus
// a list of what went wrong on the bad ones (with the row number,
// so the manager can find and fix it in their spreadsheet).
export interface ValidationResult {
  validRows: ParticipantRow[];
  errors: { row: number; message: string }[];
}

export function validateRows(rawRows: Record<string, string>[]): ValidationResult {
  const validRows: ParticipantRow[] = [];
  const errors: { row: number; message: string }[] = [];
  const seenStudentIds = new Set<string>();

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because row 1 is headers, and people count from 1 not 0

    const result = participantRowSchema.safeParse(row);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      errors.push({
        row: rowNumber,
        message: firstIssue ? firstIssue.message : "Invalid row",
      });
      return;
    }

    const studentId = result.data["Student ID"];
    if (seenStudentIds.has(studentId)) {
      errors.push({ row: rowNumber, message: `Duplicate Student ID: ${studentId}` });
      return;
    }

    seenStudentIds.add(studentId);
    validRows.push(result.data);
  });

  return { validRows, errors };
}