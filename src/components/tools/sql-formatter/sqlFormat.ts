export interface SqlResult {
  ok: boolean;
  value: string;
}

// Clauses that start a new line at the left margin.
const CLAUSES = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
  "OFFSET", "UNION ALL", "UNION", "INSERT INTO", "VALUES", "UPDATE", "SET",
  "DELETE FROM", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN",
  "CROSS JOIN", "JOIN", "ON",
];

const KEYWORDS = [
  ...CLAUSES, "AND", "OR", "AS", "IN", "IS", "NOT", "NULL", "LIKE", "BETWEEN",
  "DISTINCT", "DESC", "ASC", "COUNT", "SUM", "AVG", "MIN", "MAX", "EXISTS",
];

/** A pragmatic, dependency-free SQL pretty-printer (one clause per line). */
export function formatSql(sql: string): SqlResult {
  if (!sql.trim()) return { ok: true, value: "" };

  // Protect string literals so we don't reformat their contents.
  const strings: string[] = [];
  let s = sql.replace(/'(?:[^'\\]|\\.)*'/g, (m) => {
    strings.push(m);
    return `@@STR${strings.length - 1}@@`;
  });

  s = s.replace(/\s+/g, " ").trim();

  // Uppercase keywords (longest first so multi-word ones win).
  for (const kw of [...KEYWORDS].sort((a, b) => b.length - a.length)) {
    s = s.replace(new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi"), kw);
  }

  // Newline before each clause keyword.
  for (const kw of CLAUSES) {
    s = s.replace(new RegExp(`\\s*\\b${kw.replace(/ /g, "\\s+")}\\b`, "g"), `\n${kw}`);
  }
  // Indent AND / OR under their clause.
  s = s.replace(/\s*\b(AND|OR)\b/g, "\n  $1");

  const value = s
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (/^(AND|OR)\b/.test(line) ? `  ${line.replace(/^\s+/, "")}` : line))
    .join("\n")
    .replace(/@@STR(\d+)@@/g, (_, i) => strings[Number(i)]);

  return { ok: true, value };
}
