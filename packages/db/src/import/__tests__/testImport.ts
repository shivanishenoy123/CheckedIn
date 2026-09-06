import { readFileSync } from "fs";
import { parseCSV } from "../parseCSV";
import { validateRows } from "../validateRows";

const filePath = "./packages/db/src/import/__tests__/Hackathon - Registration (1).csv";
const fileBuffer = readFileSync(filePath);

const rawRows = parseCSV(fileBuffer);
console.log("Parsed rows:", rawRows);

const { validRows, errors } = validateRows(rawRows);
console.log("Valid rows:", validRows);
console.log("Errors:", errors);