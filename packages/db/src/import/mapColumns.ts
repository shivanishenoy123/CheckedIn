const aliasMap: Record<string, string[]> = {
  "Team Name": ["team name", "teamname", "team"],
  "Team Leader Name": ["team leader name", "leader name", "captain name"],
  "USN": ["usn", "student id", "roll no", "id"],
  "Team Leader Email": ["team leader email", "leader email", "email"],
};

export function mapColumns(row: Record<string, string>): Record<string, string> {
  const mapped: Record<string, string> = { ...row };
  for (const [canonical, aliases] of Object.entries(aliasMap)) {
    if (mapped[canonical] !== undefined) continue;
    const foundKey = Object.keys(row).find((key) =>
      aliases.includes(key.trim().toLowerCase())
    );
    if (foundKey) {
      const value = row[foundKey];
      if (value !== undefined) {
        mapped[canonical] = value;
      }
    }
  }
  return mapped;
}