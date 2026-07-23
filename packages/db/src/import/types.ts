export interface ImportSummary {
  totalRows: number;
  insertedCount: number;
  errors: { row: number; message: string }[];
}