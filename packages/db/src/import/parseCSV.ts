import * as XLSX from "xlsx";

export function parseCSV(fileBuffer: Buffer): Record<string, string>[] {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) throw new Error("Uploaded file has no sheets");
  const sheet = workbook.Sheets[firstSheetName];
  if (!sheet) throw new Error("Could not read the sheet");
  return XLSX.utils.sheet_to_json<Record<string, string>>(sheet);
}