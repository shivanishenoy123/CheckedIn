import { z } from "zod";

// Defines what a single valid registration row must look like.
// Field names (the keys) match the Google Form's column headers —
// these are placeholders based on the PRD until confirmed with the
// teammate building the actual form.
export const participantRowSchema = z.object({
  "Full Name": z.string().min(1, "Name is required"),
  "Student ID": z
    .string()
    .min(1, "Student ID is required")
    .regex(/^[A-Za-z0-9]+$/, "Student ID has invalid characters"),
  "Email": z.string().email("Invalid email address"),
  "Phone": z.string().min(10, "Phone number looks too short"),
  "Department": z.string().min(1, "Department is required"),
});

// TypeScript type inferred automatically from the schema above —
// so you never have to write the type by hand or keep it in sync manually.
export type ParticipantRow = z.infer<typeof participantRowSchema>;