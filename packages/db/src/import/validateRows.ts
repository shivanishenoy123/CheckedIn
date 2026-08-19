import { registrationRowSchema, type RegistrationRow } from "./schema";
import { mapColumns } from "./mapColumns";

export interface ValidationResult {
  validRows: RegistrationRow[];
  errors: { row: number; message: string }[];
}

export function validateRows(rawRows: Record<string, string>[]): ValidationResult {
  const validRows: RegistrationRow[] = [];
  const errors: { row: number; message: string }[] = [];
  const seenUsns = new Set<string>();

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const mappedRow = mapColumns(row);

    const result = registrationRowSchema.safeParse(mappedRow);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      errors.push({ row: rowNumber, message: firstIssue ? firstIssue.message : "Invalid row" });
      return;
    }

    const usn = result.data["USN"];
    if (seenUsns.has(usn)) {
      errors.push({ row: rowNumber, message: `Duplicate USN: ${usn}` });
      return;
    }

    seenUsns.add(usn);
    validRows.push(result.data);
  });

  return { validRows, errors };
}