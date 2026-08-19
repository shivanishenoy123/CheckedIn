import { z } from "zod";

export const registrationRowSchema = z.object({
  "Team Name": z.string().min(1, "Team name is required"),
  "Team Leader Name": z.string().min(1, "Team leader name is required"),
  "USN": z.string().min(1, "USN is required"),
  "Team Leader Email": z.string().email("Invalid email"),
  "Member 2 Name": z.string().optional(),
  "Member 2 USN": z.string().optional(),
  "Member 3 Name": z.string().optional(),
  "Member 3 USN": z.string().optional(),
  "Member 4 Name": z.string().optional(),
  "Member 4 USN": z.string().optional(),
  "Member 5 Name": z.string().optional(),
  "Member 5 USN": z.string().optional(),
});

export type RegistrationRow = z.infer<typeof registrationRowSchema>;