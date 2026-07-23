import * as XLSX from "xlsx";

// Takes the raw uploaded file (as a Buffer) and returns an array of row objects.
// Each row looks like { "Full Name": "Riya", "Student ID": "22BCS001", ... }
// with keys matching the spreadsheet's column headers.
export function parseExcel(fileBuffer: Buffer): Record<string, string>[] {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error("Uploaded file has no sheets");
  }

  const sheet = workbook.Sheets[firstSheetName];
  if (!sheet) {
    throw new Error("Could not read the first sheet");
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

  return rows;
}