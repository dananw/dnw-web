function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export interface BasicAuthResult {
  /** The Base64-encoded "user:pass" token. */
  token: string;
  /** The full header line, ready to copy. */
  header: string;
}

/** Build an HTTP Basic Authorization header from credentials. */
export function buildBasicAuth(
  username: string,
  password: string
): BasicAuthResult {
  const token = utf8ToBase64(`${username}:${password}`);
  return { token, header: `Authorization: Basic ${token}` };
}
