export type StatusClass = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export interface HttpStatus {
  code: number;
  name: string;
  description: string;
}

/** Common HTTP status codes with a short, plain-English description. */
export const HTTP_STATUSES: HttpStatus[] = [
  { code: 100, name: "Continue", description: "The client should continue with its request." },
  { code: 101, name: "Switching Protocols", description: "The server is switching protocols as requested." },
  { code: 102, name: "Processing", description: "The server has received and is processing the request." },
  { code: 103, name: "Early Hints", description: "Used to return some response headers before the final response." },

  { code: 200, name: "OK", description: "The request succeeded." },
  { code: 201, name: "Created", description: "The request succeeded and a new resource was created." },
  { code: 202, name: "Accepted", description: "The request was accepted but not yet acted upon." },
  { code: 203, name: "Non-Authoritative Information", description: "Returned metadata is from a copy, not the origin." },
  { code: 204, name: "No Content", description: "The request succeeded; there is no content to return." },
  { code: 205, name: "Reset Content", description: "Tells the client to reset the document that sent the request." },
  { code: 206, name: "Partial Content", description: "The server is delivering part of the resource (range request)." },

  { code: 300, name: "Multiple Choices", description: "The request has more than one possible response." },
  { code: 301, name: "Moved Permanently", description: "The resource has permanently moved to a new URL." },
  { code: 302, name: "Found", description: "The resource is temporarily at a different URL." },
  { code: 303, name: "See Other", description: "The response can be found at another URL using GET." },
  { code: 304, name: "Not Modified", description: "The cached version of the resource is still valid." },
  { code: 307, name: "Temporary Redirect", description: "Temporary redirect that preserves the request method." },
  { code: 308, name: "Permanent Redirect", description: "Permanent redirect that preserves the request method." },

  { code: 400, name: "Bad Request", description: "The server cannot process the request due to a client error." },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or not been provided." },
  { code: 402, name: "Payment Required", description: "Reserved for future use; sometimes used for paid APIs." },
  { code: 403, name: "Forbidden", description: "The client is authenticated but not allowed to access this." },
  { code: 404, name: "Not Found", description: "The server cannot find the requested resource." },
  { code: 405, name: "Method Not Allowed", description: "The request method is not supported for this resource." },
  { code: 406, name: "Not Acceptable", description: "No content matching the request's Accept headers is available." },
  { code: 408, name: "Request Timeout", description: "The server timed out waiting for the request." },
  { code: 409, name: "Conflict", description: "The request conflicts with the current state of the resource." },
  { code: 410, name: "Gone", description: "The resource is permanently gone and will not return." },
  { code: 411, name: "Length Required", description: "The request must specify a Content-Length header." },
  { code: 412, name: "Precondition Failed", description: "A precondition in the request headers was not met." },
  { code: 413, name: "Payload Too Large", description: "The request body is larger than the server will accept." },
  { code: 414, name: "URI Too Long", description: "The requested URI is longer than the server will accept." },
  { code: 415, name: "Unsupported Media Type", description: "The request body format is not supported." },
  { code: 418, name: "I'm a teapot", description: "An April Fools' joke from RFC 2324; the server refuses to brew coffee." },
  { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but is semantically invalid." },
  { code: 425, name: "Too Early", description: "The server is unwilling to process a request that may be replayed." },
  { code: 426, name: "Upgrade Required", description: "The client should switch to a different protocol." },
  { code: 428, name: "Precondition Required", description: "The origin server requires the request to be conditional." },
  { code: 429, name: "Too Many Requests", description: "The client has sent too many requests in a given time." },
  { code: 431, name: "Request Header Fields Too Large", description: "Header fields are too large for the server to process." },
  { code: 451, name: "Unavailable For Legal Reasons", description: "The resource is unavailable for legal reasons." },

  { code: 500, name: "Internal Server Error", description: "The server encountered an unexpected condition." },
  { code: 501, name: "Not Implemented", description: "The server does not support the functionality required." },
  { code: 502, name: "Bad Gateway", description: "An upstream server returned an invalid response." },
  { code: 503, name: "Service Unavailable", description: "The server is not ready, often overloaded or down for maintenance." },
  { code: 504, name: "Gateway Timeout", description: "An upstream server did not respond in time." },
  { code: 505, name: "HTTP Version Not Supported", description: "The HTTP version used in the request is not supported." },
  { code: 507, name: "Insufficient Storage", description: "The server cannot store the representation needed to complete the request." },
  { code: 511, name: "Network Authentication Required", description: "The client needs to authenticate to gain network access." },
];

export function statusClass(code: number): StatusClass {
  return (`${Math.floor(code / 100)}xx`) as StatusClass;
}

export const STATUS_CLASS_LABELS: Record<StatusClass, string> = {
  "1xx": "Informational",
  "2xx": "Success",
  "3xx": "Redirection",
  "4xx": "Client Error",
  "5xx": "Server Error",
};

/** Filter the catalogue by class and free-text query (code, name or text). */
export function searchStatuses(
  query: string,
  cls: StatusClass | "all"
): HttpStatus[] {
  const q = query.trim().toLowerCase();
  return HTTP_STATUSES.filter((s) => {
    if (cls !== "all" && statusClass(s.code) !== cls) return false;
    if (!q) return true;
    return (
      String(s.code).includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  });
}
