import { Tool, ToolCategory } from "@/lib/types";

/**
 * Registry of all mini-tools. Adding a new tool is two steps:
 *   1. Add an entry here.
 *   2. Create src/app/tools/<slug>/page.tsx that renders its component.
 * The /tools index page is generated automatically from this list.
 */
export const tools: Tool[] = [
  {
    slug: "markdown-to-slack",
    title: "Markdown → Slack",
    description:
      "Convert standard Markdown into Slack's mrkdwn format so it pastes cleanly into messages.",
    tagline: "Paste Markdown, get Slack-ready text.",
    category: "format",
    tags: ["markdown", "slack", "formatting"],
    icon: "MessageSquare",
    published: true,
  },
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description:
      "Beautify, minify, and validate JSON. Pinpoints parse errors with line and column.",
    tagline: "Beautify, minify & validate JSON.",
    category: "format",
    tags: ["json", "format", "validate"],
    icon: "Braces",
    published: true,
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    description:
      "Decode a JSON Web Token's header and payload locally. Nothing is sent anywhere.",
    tagline: "Inspect a JWT, fully in your browser.",
    category: "dev",
    tags: ["jwt", "auth", "decode"],
    icon: "KeyRound",
    published: true,
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    description:
      "Convert text between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE and more.",
    tagline: "Switch between every naming case.",
    category: "text",
    tags: ["text", "case", "naming"],
    icon: "Type",
    published: true,
  },
  {
    slug: "url-encoder",
    title: "URL Encoder & Parser",
    description:
      "Encode or decode URL components and break a URL down into its parts and query parameters.",
    tagline: "Encode, decode & inspect URLs.",
    category: "dev",
    tags: ["url", "encode", "query"],
    icon: "Link2",
    published: true,
  },
  {
    slug: "base64",
    title: "Base64 Encode / Decode",
    description:
      "Convert text to and from Base64, with UTF-8 support and URL-safe output. Runs locally.",
    tagline: "Text ↔ Base64, in your browser.",
    category: "dev",
    tags: ["base64", "encode", "decode"],
    icon: "Binary",
    published: true,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description:
      "Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text using the Web Crypto API.",
    tagline: "SHA hashes, computed locally.",
    category: "dev",
    tags: ["hash", "sha", "crypto"],
    icon: "Hash",
    published: true,
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description:
      "Generate cryptographically random UUID v4 values in bulk and copy them in one click.",
    tagline: "Bulk random UUID v4 generator.",
    category: "dev",
    tags: ["uuid", "id", "generator"],
    icon: "Fingerprint",
    published: true,
  },
  {
    slug: "timestamp-converter",
    title: "Timestamp Converter",
    description:
      "Convert between Unix timestamps and human-readable dates in local time, UTC and ISO 8601.",
    tagline: "Unix epoch ↔ human dates.",
    category: "dev",
    tags: ["unix", "timestamp", "date"],
    icon: "Clock",
    published: true,
  },
  {
    slug: "json-to-typescript",
    title: "JSON → TypeScript",
    description:
      "Turn any JSON sample into TypeScript interfaces, inferring types and nested shapes automatically.",
    tagline: "Generate TS interfaces from JSON.",
    category: "dev",
    tags: ["json", "typescript", "types"],
    icon: "FileCode2",
    published: true,
  },
  {
    slug: "json-yaml",
    title: "JSON ↔ YAML",
    description:
      "Convert configuration back and forth between JSON and YAML, with validation both ways.",
    tagline: "Convert config between JSON & YAML.",
    category: "dev",
    tags: ["json", "yaml", "config"],
    icon: "ArrowRightLeft",
    published: true,
  },
  {
    slug: "text-diff",
    title: "Text Diff",
    description:
      "Compare two blocks of text and highlight added, removed and changed lines side by side.",
    tagline: "Spot the difference between two texts.",
    category: "dev",
    tags: ["diff", "compare", "text"],
    icon: "GitCompare",
    published: true,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description:
      "Test regular expressions live with flags, highlighted matches and capture group details.",
    tagline: "Test regex with live match highlighting.",
    category: "dev",
    tags: ["regex", "pattern", "match"],
    icon: "Regex",
    published: true,
  },
  {
    slug: "cron-explainer",
    title: "Cron Explainer",
    description:
      "Translate a cron expression into plain English and preview its upcoming run times.",
    tagline: "Decode cron expressions to plain English.",
    category: "dev",
    tags: ["cron", "schedule", "explain"],
    icon: "CalendarClock",
    published: true,
  },
  {
    slug: "html-entities",
    title: "HTML Entity Encoder",
    description:
      "Encode and decode HTML entities like &amp;, &lt; and &gt; to safely display markup as text.",
    tagline: "Encode & decode HTML entities.",
    category: "dev",
    tags: ["html", "entities", "encode"],
    icon: "CodeXml",
    published: true,
  },
  {
    slug: "json-escape",
    title: "JSON String Escape",
    description:
      "Escape or unescape text for use inside a JSON string literal — quotes, newlines and unicode.",
    tagline: "Escape text into a JSON string.",
    category: "dev",
    tags: ["json", "escape", "string"],
    icon: "Quote",
    published: true,
  },
  {
    slug: "number-base",
    title: "Number Base Converter",
    description:
      "Convert integers between binary, octal, decimal and hexadecimal, plus arbitrary bases.",
    tagline: "Binary, octal, decimal & hex.",
    category: "dev",
    tags: ["binary", "hex", "base"],
    icon: "Calculator",
    published: true,
  },
  {
    slug: "json-csv",
    title: "JSON ↔ CSV",
    description:
      "Convert an array of JSON objects to CSV and back, handling quoting and nested values.",
    tagline: "Convert between JSON arrays and CSV.",
    category: "format",
    tags: ["json", "csv", "table"],
    icon: "Table",
    published: true,
  },
  {
    slug: "markdown-preview",
    title: "Markdown Preview",
    description:
      "Write Markdown and see the rendered HTML live, with a copyable HTML output.",
    tagline: "Live Markdown to HTML preview.",
    category: "format",
    tags: ["markdown", "html", "preview"],
    icon: "Eye",
    published: true,
  },
  {
    slug: "word-counter",
    title: "Word & Character Counter",
    description:
      "Count words, characters, sentences and paragraphs, with an estimated reading time.",
    tagline: "Count words, chars & reading time.",
    category: "text",
    tags: ["count", "words", "text"],
    icon: "WholeWord",
    published: true,
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description:
      "Generate placeholder paragraphs, sentences or words for mockups and layouts.",
    tagline: "Placeholder text on demand.",
    category: "text",
    tags: ["lorem", "placeholder", "dummy"],
    icon: "Pilcrow",
    published: true,
  },
  {
    slug: "slug-generator",
    title: "Slug Generator",
    description:
      "Turn any title into a clean, URL-friendly slug, transliterating accents and symbols.",
    tagline: "Titles into URL-friendly slugs.",
    category: "text",
    tags: ["slug", "url", "seo"],
    icon: "Tag",
    published: true,
  },
  {
    slug: "line-tools",
    title: "Line Tools",
    description:
      "Sort, deduplicate, reverse, shuffle and trim lines of text in one place.",
    tagline: "Sort, dedupe & reorder lines.",
    category: "text",
    tags: ["lines", "sort", "dedupe"],
    icon: "Rows3",
    published: true,
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    description:
      "Convert colors between HEX, RGB and HSL with a live swatch preview.",
    tagline: "HEX ↔ RGB ↔ HSL with preview.",
    category: "design",
    tags: ["color", "hex", "hsl"],
    icon: "Palette",
    published: true,
  },
  {
    slug: "contrast-checker",
    title: "Contrast Checker",
    description:
      "Check the contrast ratio between two colors against WCAG AA and AAA thresholds.",
    tagline: "WCAG contrast ratio checker.",
    category: "design",
    tags: ["contrast", "wcag", "a11y"],
    icon: "Contrast",
    published: true,
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    description:
      "Generate strong, random passwords with adjustable length and character sets, using the Web Crypto API.",
    tagline: "Strong random passwords, generated locally.",
    category: "dev",
    tags: ["password", "random", "security"],
    icon: "Lock",
    published: true,
  },
  {
    slug: "file-size-converter",
    title: "File Size Converter",
    description:
      "Convert between bytes, KB, MB, GB and their binary KiB/MiB/GiB equivalents, plus bits.",
    tagline: "Bytes ↔ KB/MB/GB & KiB/MiB/GiB.",
    category: "dev",
    tags: ["bytes", "size", "convert"],
    icon: "HardDrive",
    published: true,
  },
  {
    slug: "http-status-codes",
    title: "HTTP Status Codes",
    description:
      "Search and browse HTTP status codes with their meaning and when each one is used.",
    tagline: "Look up any HTTP status code.",
    category: "dev",
    tags: ["http", "status", "reference"],
    icon: "Globe",
    published: true,
  },
  {
    slug: "chmod-calculator",
    title: "Chmod Calculator",
    description:
      "Toggle Unix file permissions and read off the octal and symbolic notation, plus a ready chmod command.",
    tagline: "Unix permissions ↔ octal & symbolic.",
    category: "dev",
    tags: ["chmod", "permissions", "unix"],
    icon: "FileLock2",
    published: true,
  },
  {
    slug: "ulid-generator",
    title: "ULID Generator",
    description:
      "Generate lexicographically sortable ULIDs in bulk, with cryptographically random entropy.",
    tagline: "Sortable, unique ULIDs in bulk.",
    category: "dev",
    tags: ["ulid", "id", "generator"],
    icon: "Barcode",
    published: true,
  },
  {
    slug: "box-shadow-generator",
    title: "Box Shadow Generator",
    description:
      "Dial in offset, blur, spread and color with a live preview, then copy the CSS box-shadow.",
    tagline: "Design CSS shadows with live preview.",
    category: "design",
    tags: ["css", "shadow", "preview"],
    icon: "Box",
    published: true,
  },
  {
    slug: "css-gradient-generator",
    title: "CSS Gradient Generator",
    description:
      "Build linear and radial gradients with multiple color stops and a live preview, then copy the CSS.",
    tagline: "Linear & radial gradients, copy CSS.",
    category: "design",
    tags: ["css", "gradient", "preview"],
    icon: "Blend",
    published: true,
  },
  {
    slug: "px-rem-converter",
    title: "px ↔ rem Converter",
    description:
      "Convert between px and rem for any root font size, with a quick reference table of common values.",
    tagline: "Convert CSS px and rem units.",
    category: "design",
    tags: ["css", "px", "rem"],
    icon: "Ruler",
    published: true,
  },
  {
    slug: "aspect-ratio-calculator",
    title: "Aspect Ratio Calculator",
    description:
      "Solve a missing width or height for a target aspect ratio, and simplify any ratio with handy presets.",
    tagline: "Keep dimensions in the right ratio.",
    category: "design",
    tags: ["aspect", "ratio", "dimensions"],
    icon: "RectangleHorizontal",
    published: true,
  },
  {
    slug: "csv-to-markdown",
    title: "CSV → Markdown Table",
    description:
      "Convert CSV data into a GitHub-flavored Markdown table, with header and column alignment options.",
    tagline: "Turn CSV into a Markdown table.",
    category: "format",
    tags: ["csv", "markdown", "table"],
    icon: "Table2",
    published: true,
  },
  {
    slug: "query-string",
    title: "Query String Parser",
    description:
      "Parse a URL or query string into its parameters and JSON, handling repeated and encoded keys.",
    tagline: "Break a query string into params.",
    category: "dev",
    tags: ["url", "query", "params"],
    icon: "ListTree",
    published: true,
  },
  {
    slug: "ascii-converter",
    title: "Text ↔ Binary / Hex",
    description:
      "Convert text to and from binary, hexadecimal, decimal and octal byte representations (UTF-8).",
    tagline: "Encode text as binary, hex or decimal.",
    category: "dev",
    tags: ["binary", "ascii", "hex"],
    icon: "FileDigit",
    published: true,
  },
  {
    slug: "hmac-generator",
    title: "HMAC Generator",
    description:
      "Compute an HMAC signature from a message and secret key with SHA-1/256/384/512, via Web Crypto.",
    tagline: "Sign messages with HMAC, locally.",
    category: "dev",
    tags: ["hmac", "crypto", "sign"],
    icon: "ShieldCheck",
    published: true,
  },
  {
    slug: "ip-subnet-calculator",
    title: "IPv4 Subnet Calculator",
    description:
      "Enter an IP and CIDR prefix to get the network, broadcast, mask, host range and host count.",
    tagline: "CIDR to network, mask & host range.",
    category: "dev",
    tags: ["ip", "subnet", "cidr"],
    icon: "Network",
    published: true,
  },
  {
    slug: "mac-address-generator",
    title: "MAC Address Generator",
    description:
      "Generate random MAC addresses in bulk with your choice of separator, case and locally-administered bit.",
    tagline: "Random MAC addresses on demand.",
    category: "dev",
    tags: ["mac", "network", "generator"],
    icon: "Router",
    published: true,
  },
  {
    slug: "json-sort",
    title: "JSON Key Sorter",
    description:
      "Recursively sort the keys of a JSON object alphabetically, ascending or descending, then re-format.",
    tagline: "Alphabetize JSON object keys.",
    category: "format",
    tags: ["json", "sort", "format"],
    icon: "ArrowDownAZ",
    published: true,
  },
  {
    slug: "basic-auth-generator",
    title: "Basic Auth Header",
    description:
      "Turn a username and password into a Base64 HTTP Basic Authorization header value.",
    tagline: "Build a Basic Auth header.",
    category: "dev",
    tags: ["auth", "http", "base64"],
    icon: "KeySquare",
    published: true,
  },
  {
    slug: "random-number-generator",
    title: "Random Number Generator",
    description:
      "Generate cryptographically random integers within a range, with optional uniqueness, in bulk.",
    tagline: "Secure random numbers in a range.",
    category: "dev",
    tags: ["random", "number", "generator"],
    icon: "Dices",
    published: true,
  },
  {
    slug: "caesar-cipher",
    title: "Caesar / ROT13 Cipher",
    description:
      "Shift letters by any amount to encode or decode a Caesar cipher, including the classic ROT13.",
    tagline: "Shift-cipher text, including ROT13.",
    category: "text",
    tags: ["cipher", "rot13", "caesar"],
    icon: "RotateCw",
    published: true,
  },
  {
    slug: "morse-code",
    title: "Morse Code Translator",
    description:
      "Translate text to and from Morse code, with words separated by slashes and letters by spaces.",
    tagline: "Text ↔ Morse code.",
    category: "text",
    tags: ["morse", "encode", "decode"],
    icon: "Radio",
    published: true,
  },
  {
    slug: "find-replace",
    title: "Find & Replace",
    description:
      "Find and replace text with optional regular expressions, case sensitivity and a live match count.",
    tagline: "Search & replace, with regex.",
    category: "text",
    tags: ["find", "replace", "regex"],
    icon: "Replace",
    published: true,
  },
  {
    slug: "whitespace-cleaner",
    title: "Whitespace Cleaner",
    description:
      "Trim lines, collapse repeated spaces, strip blank lines and convert tabs in one pass.",
    tagline: "Tidy up messy whitespace.",
    category: "text",
    tags: ["whitespace", "trim", "clean"],
    icon: "Eraser",
    published: true,
  },
  {
    slug: "border-radius-generator",
    title: "Border Radius Generator",
    description:
      "Round each corner independently with a live preview and copy the resulting border-radius CSS.",
    tagline: "Design rounded corners visually.",
    category: "design",
    tags: ["css", "border", "radius"],
    icon: "Frame",
    published: true,
  },
  {
    slug: "text-shadow-generator",
    title: "Text Shadow Generator",
    description:
      "Adjust offset, blur and color with a live preview, then copy the CSS text-shadow declaration.",
    tagline: "Design CSS text shadows live.",
    category: "design",
    tags: ["css", "text", "shadow"],
    icon: "Baseline",
    published: true,
  },
  {
    slug: "color-shades-generator",
    title: "Color Shades Generator",
    description:
      "Generate a range of tints and shades from a base color and copy any swatch's HEX value.",
    tagline: "Tints & shades from one color.",
    category: "design",
    tags: ["color", "shades", "palette"],
    icon: "Paintbrush",
    published: true,
  },
  {
    slug: "svg-to-css",
    title: "SVG to CSS",
    description:
      "Encode an SVG into a URL-encoded or Base64 data URI ready to drop into a CSS background.",
    tagline: "SVG to a CSS background data URI.",
    category: "design",
    tags: ["svg", "css", "data-uri"],
    icon: "FileImage",
    published: true,
  },
  {
    slug: "roman-numeral",
    title: "Roman Numeral Converter",
    description:
      "Convert between Arabic numbers (1–3999) and Roman numerals, both directions, with validation.",
    tagline: "Numbers ↔ Roman numerals.",
    category: "misc",
    tags: ["roman", "number", "convert"],
    icon: "Landmark",
    published: true,
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    description:
      "Work out a percentage of a number, what percent one number is of another, and percent change.",
    tagline: "Everyday percentage maths.",
    category: "misc",
    tags: ["percent", "math", "calculator"],
    icon: "Percent",
    published: true,
  },
  {
    slug: "date-difference",
    title: "Date Difference",
    description:
      "Calculate the time between two dates in days, weeks, months and years, plus the total in each unit.",
    tagline: "How far apart are two dates?",
    category: "misc",
    tags: ["date", "difference", "duration"],
    icon: "CalendarDays",
    published: true,
  },
  {
    slug: "number-to-words",
    title: "Number to Words",
    description:
      "Spell out a number in English words, handling negatives and decimals — handy for cheques and copy.",
    tagline: "Write numbers out in words.",
    category: "misc",
    tags: ["number", "words", "spell"],
    icon: "Languages",
    published: true,
  },
  {
    slug: "json-to-xml",
    title: "JSON to XML",
    description:
      "Convert a JSON object or array into clean, indented XML, handling nested structures and arrays.",
    tagline: "Turn JSON into indented XML.",
    category: "format",
    tags: ["json", "xml", "convert"],
    icon: "FileJson",
    published: true,
  },
  {
    slug: "base64-hex",
    title: "Base64 ↔ Hex",
    description:
      "Convert data between Base64 and hexadecimal directly, without a round-trip through text.",
    tagline: "Convert Base64 and hex both ways.",
    category: "dev",
    tags: ["base64", "hex", "convert"],
    icon: "Hexagon",
    published: true,
  },
  {
    slug: "user-agent-parser",
    title: "User Agent Parser",
    description:
      "Break down a User-Agent string into its browser, engine, operating system and device.",
    tagline: "Decode a User-Agent string.",
    category: "dev",
    tags: ["user-agent", "browser", "parse"],
    icon: "MonitorSmartphone",
    published: true,
  },
  {
    slug: "css-minifier",
    title: "CSS Minifier",
    description:
      "Strip comments and unnecessary whitespace from CSS to shrink it, with a size saved readout.",
    tagline: "Minify CSS and see the savings.",
    category: "format",
    tags: ["css", "minify", "optimize"],
    icon: "Minimize2",
    published: true,
  },
  {
    slug: "luhn-validator",
    title: "Card / Luhn Validator",
    description:
      "Check whether a number passes the Luhn checksum used by credit cards, IMEIs and more.",
    tagline: "Validate numbers with the Luhn check.",
    category: "dev",
    tags: ["luhn", "card", "checksum"],
    icon: "CreditCard",
    published: true,
  },
  {
    slug: "html-to-text",
    title: "HTML to Text",
    description:
      "Strip HTML tags and decode entities to extract clean, readable plain text from markup.",
    tagline: "Extract plain text from HTML.",
    category: "format",
    tags: ["html", "text", "strip"],
    icon: "FileText",
    published: true,
  },
  {
    slug: "nato-phonetic",
    title: "NATO Phonetic Alphabet",
    description:
      "Spell text out using the NATO phonetic alphabet — Alpha, Bravo, Charlie — for clear dictation.",
    tagline: "Spell words with Alpha, Bravo, Charlie.",
    category: "text",
    tags: ["nato", "phonetic", "spell"],
    icon: "Megaphone",
    published: true,
  },
  {
    slug: "character-frequency",
    title: "Character Frequency",
    description:
      "Count how often each character, word or line appears, sorted by frequency.",
    tagline: "Tally character & word frequency.",
    category: "text",
    tags: ["frequency", "count", "analyze"],
    icon: "BarChart3",
    published: true,
  },
  {
    slug: "reverse-text",
    title: "Reverse Text",
    description:
      "Reverse text by characters, words or lines — handy for quick transforms and puzzles.",
    tagline: "Reverse characters, words or lines.",
    category: "text",
    tags: ["reverse", "text", "flip"],
    icon: "FlipHorizontal2",
    published: true,
  },
  {
    slug: "remove-accents",
    title: "Remove Accents",
    description:
      "Strip diacritics and accents from text (café → cafe) using Unicode normalization.",
    tagline: "Strip diacritics from text.",
    category: "text",
    tags: ["accents", "diacritics", "unicode"],
    icon: "CaseSensitive",
    published: true,
  },
  {
    slug: "text-repeater",
    title: "Text Repeater",
    description:
      "Repeat a piece of text a number of times, with an optional separator between copies.",
    tagline: "Repeat text any number of times.",
    category: "text",
    tags: ["repeat", "text", "duplicate"],
    icon: "Repeat",
    published: true,
  },
  {
    slug: "cubic-bezier",
    title: "Cubic Bezier Easing",
    description:
      "Craft a CSS cubic-bezier easing curve with a live curve preview and animated demo.",
    tagline: "Design CSS easing curves.",
    category: "design",
    tags: ["css", "easing", "animation"],
    icon: "Spline",
    published: true,
  },
  {
    slug: "css-triangle-generator",
    title: "CSS Triangle Generator",
    description:
      "Generate a pure-CSS triangle using the border trick, with direction, size and color controls.",
    tagline: "Pure-CSS triangles via borders.",
    category: "design",
    tags: ["css", "triangle", "shape"],
    icon: "Triangle",
    published: true,
  },
  {
    slug: "golden-ratio-calculator",
    title: "Golden Ratio Calculator",
    description:
      "Split a length by the golden ratio (1.618) or find the matching dimension for balanced layouts.",
    tagline: "Divide a length by 1.618.",
    category: "design",
    tags: ["golden", "ratio", "layout"],
    icon: "Shell",
    published: true,
  },
  {
    slug: "css-clamp-generator",
    title: "CSS Clamp Generator",
    description:
      "Build a fluid clamp() for responsive typography from min/max sizes and viewport widths.",
    tagline: "Fluid clamp() for responsive type.",
    category: "design",
    tags: ["css", "clamp", "responsive"],
    icon: "Scaling",
    published: true,
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    description:
      "Convert between units of length, weight and temperature with instant results across each scale.",
    tagline: "Length, weight & temperature units.",
    category: "misc",
    tags: ["units", "convert", "measure"],
    icon: "Scale",
    published: true,
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    description:
      "Calculate Body Mass Index from metric or imperial height and weight, with the category.",
    tagline: "Work out Body Mass Index.",
    category: "misc",
    tags: ["bmi", "health", "calculator"],
    icon: "HeartPulse",
    published: true,
  },
  {
    slug: "dice-roller",
    title: "Dice Roller",
    description:
      "Roll dice with standard notation like 2d6+3, using cryptographically random rolls.",
    tagline: "Roll dice with 2d6+3 notation.",
    category: "misc",
    tags: ["dice", "random", "roll"],
    icon: "Dice5",
    published: true,
  },
  {
    slug: "number-properties",
    title: "Number Properties",
    description:
      "Inspect an integer: prime check, factors, prime factorization, divisors and parity.",
    tagline: "Primes, factors & more for a number.",
    category: "misc",
    tags: ["prime", "factors", "math"],
    icon: "Sigma",
    published: true,
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    description:
      "Work out an exact age in years, months and days from a date of birth, plus totals.",
    tagline: "Exact age from a birth date.",
    category: "misc",
    tags: ["age", "date", "birthday"],
    icon: "Cake",
    published: true,
  },
  {
    slug: "jwt-generator",
    title: "JWT Generator",
    description:
      "Sign a JSON Web Token with HS256 from a payload and secret, entirely in your browser.",
    tagline: "Build & sign an HS256 JWT.",
    category: "dev",
    tags: ["jwt", "sign", "hs256"],
    icon: "FileKey2",
    published: true,
  },
  {
    slug: "backslash-escape",
    title: "Backslash Escape",
    description:
      "Escape or unescape text for source-code string literals — newlines, tabs, quotes and unicode.",
    tagline: "Escape text for code strings.",
    category: "dev",
    tags: ["escape", "string", "code"],
    icon: "Slash",
    published: true,
  },
  {
    slug: "json-to-query",
    title: "JSON to Query String",
    description:
      "Turn a flat JSON object into a URL query string, expanding arrays into repeated keys.",
    tagline: "JSON object to a query string.",
    category: "dev",
    tags: ["json", "query", "url"],
    icon: "Link2",
    published: true,
  },
  {
    slug: "csv-to-json",
    title: "CSV to JSON",
    description:
      "Convert CSV into a JSON array of objects (or rows), with quote handling and delimiter detection.",
    tagline: "CSV into a JSON array.",
    category: "format",
    tags: ["csv", "json", "convert"],
    icon: "FileSpreadsheet",
    published: true,
  },
  {
    slug: "env-to-json",
    title: ".env ↔ JSON",
    description:
      "Convert between dotenv files and JSON, ignoring comments and stripping surrounding quotes.",
    tagline: "Convert .env files to JSON.",
    category: "format",
    tags: ["env", "json", "config"],
    icon: "FileCog",
    published: true,
  },
  {
    slug: "title-case",
    title: "Title Case Converter",
    description:
      "Capitalize text as a title, keeping minor words like a, of and the lowercase where they belong.",
    tagline: "Smart title-case for headings.",
    category: "text",
    tags: ["title", "case", "capitalize"],
    icon: "Heading",
    published: true,
  },
  {
    slug: "rot47",
    title: "ROT47 Cipher",
    description:
      "Encode or decode text with ROT47, which rotates all visible ASCII — letters, digits and symbols.",
    tagline: "Rotate ASCII with ROT47.",
    category: "text",
    tags: ["rot47", "cipher", "encode"],
    icon: "Shuffle",
    published: true,
  },
  {
    slug: "leetspeak",
    title: "Leetspeak Translator",
    description:
      "Convert plain text into leetspeak (l33t), swapping letters for numbers and symbols.",
    tagline: "Turn text into l33t.",
    category: "text",
    tags: ["leet", "1337", "text"],
    icon: "Gamepad2",
    published: true,
  },
  {
    slug: "pig-latin",
    title: "Pig Latin Translator",
    description:
      "Translate English text into Pig Latin, moving leading consonants and adding the classic suffix.",
    tagline: "English to Pig Latin.",
    category: "text",
    tags: ["pig-latin", "fun", "text"],
    icon: "Speech",
    published: true,
  },
  {
    slug: "opacity-hex",
    title: "Opacity to Hex",
    description:
      "Convert an opacity percentage to a hex alpha channel and build 8-digit hex colors.",
    tagline: "Opacity % to hex alpha.",
    category: "design",
    tags: ["opacity", "hex", "alpha"],
    icon: "Droplet",
    published: true,
  },
  {
    slug: "text-gradient-generator",
    title: "Text Gradient Generator",
    description:
      "Create a CSS gradient clipped to text, with a live preview and copyable declaration.",
    tagline: "Gradient text in pure CSS.",
    category: "design",
    tags: ["css", "gradient", "text"],
    icon: "Sparkles",
    published: true,
  },
  {
    slug: "glassmorphism-generator",
    title: "Glassmorphism Generator",
    description:
      "Design a frosted-glass card with backdrop blur and transparency, then copy the CSS.",
    tagline: "Frosted-glass CSS, live.",
    category: "design",
    tags: ["css", "glass", "blur"],
    icon: "GlassWater",
    published: true,
  },
  {
    slug: "neumorphism-generator",
    title: "Neumorphism Generator",
    description:
      "Generate soft, extruded neumorphic shadows from a base color with a live preview.",
    tagline: "Soft UI shadows, generated.",
    category: "design",
    tags: ["css", "neumorphism", "shadow"],
    icon: "Layers",
    published: true,
  },
  {
    slug: "css-filter",
    title: "CSS Filter Playground",
    description:
      "Combine blur, brightness, contrast, saturation and more into a CSS filter, with a live preview.",
    tagline: "Compose CSS filters visually.",
    category: "design",
    tags: ["css", "filter", "image"],
    icon: "Aperture",
    published: true,
  },
  {
    slug: "gcd-lcm",
    title: "GCD & LCM Calculator",
    description:
      "Find the greatest common divisor and least common multiple of a list of integers.",
    tagline: "GCD and LCM of any numbers.",
    category: "misc",
    tags: ["gcd", "lcm", "math"],
    icon: "Divide",
    published: true,
  },
  {
    slug: "factorial",
    title: "Factorial Calculator",
    description:
      "Compute the factorial of a number using big integers, so even large results stay exact.",
    tagline: "Exact factorials, big integers.",
    category: "misc",
    tags: ["factorial", "math", "bigint"],
    icon: "Superscript",
    published: true,
  },
  {
    slug: "fibonacci",
    title: "Fibonacci Generator",
    description:
      "Generate the Fibonacci sequence up to a chosen count, with exact big-integer values.",
    tagline: "List the Fibonacci sequence.",
    category: "misc",
    tags: ["fibonacci", "sequence", "math"],
    icon: "TrendingUp",
    published: true,
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    description:
      "Work out a tip and split the bill between any number of people, with per-person totals.",
    tagline: "Tip and split the bill.",
    category: "misc",
    tags: ["tip", "bill", "split"],
    icon: "Receipt",
    published: true,
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    description:
      "Calculate the monthly payment, total repaid and total interest for a fixed-rate loan.",
    tagline: "Monthly payment & total interest.",
    category: "misc",
    tags: ["loan", "emi", "finance"],
    icon: "Banknote",
    published: true,
  },
  {
    slug: "scientific-notation",
    title: "Scientific Notation",
    description:
      "Convert numbers between plain decimal and scientific (E) notation in both directions.",
    tagline: "Decimal ↔ scientific notation.",
    category: "misc",
    tags: ["scientific", "number", "convert"],
    icon: "FlaskConical",
    published: true,
  },
  {
    slug: "coin-flip",
    title: "Coin Flip",
    description:
      "Flip one or many coins with cryptographically fair randomness and tally heads vs tails.",
    tagline: "Flip fair coins in bulk.",
    category: "misc",
    tags: ["coin", "random", "flip"],
    icon: "Coins",
    published: true,
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    description:
      "Find the sale price and amount saved from an original price and discount percentage.",
    tagline: "Sale price and savings.",
    category: "misc",
    tags: ["discount", "price", "percent"],
    icon: "BadgePercent",
    published: true,
  },
  {
    slug: "random-picker",
    title: "Random Picker",
    description:
      "Pick one or more random items from a list, fairly and optionally without repeats.",
    tagline: "Pick random items from a list.",
    category: "misc",
    tags: ["random", "picker", "choice"],
    icon: "ListChecks",
    published: true,
  },
  {
    slug: "quadratic-solver",
    title: "Quadratic Solver",
    description:
      "Solve ax² + bx + c = 0, reporting the discriminant and real or complex roots.",
    tagline: "Solve any quadratic equation.",
    category: "misc",
    tags: ["quadratic", "equation", "math"],
    icon: "FunctionSquare",
    published: true,
  },
  {
    slug: "average-calculator",
    title: "Average & Stats",
    description:
      "Compute mean, median, mode, range and standard deviation from a list of numbers.",
    tagline: "Mean, median, mode & more.",
    category: "misc",
    tags: ["average", "statistics", "math"],
    icon: "Gauge",
    published: true,
  },
];

export const toolCategoryLabels: Record<ToolCategory, string> = {
  dev: "Developer",
  format: "Formatting",
  text: "Text",
  design: "Design",
  misc: "Misc",
};

/** Short blurb shown under each category heading on the index page. */
export const toolCategoryDescriptions: Record<ToolCategory, string> = {
  dev: "Encoders, decoders, generators and converters for everyday coding.",
  format: "Clean up, validate and reshape structured data.",
  text: "Transform and inspect plain text.",
  design: "Colors, contrast and visual helpers.",
  misc: "Everything else.",
};

/** Render order for category sections on the index page. */
export const toolCategoryOrder: ToolCategory[] = [
  "dev",
  "format",
  "text",
  "design",
  "misc",
];

export const getTool = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const publishedTools = (): Tool[] =>
  tools.filter((t) => t.published !== false);

/** Published tools sorted alphabetically by title. */
export const sortedPublishedTools = (): Tool[] =>
  [...publishedTools()].sort((a, b) => a.title.localeCompare(b.title));

/**
 * Group published tools by category, returned in `toolCategoryOrder`.
 * Tools within each category are sorted alphabetically by title, and empty
 * categories are omitted. Sorting happens here (not in the registry array) so
 * new tools can simply be appended to `tools` and still appear in order.
 */
export function toolsByCategory(): { category: ToolCategory; items: Tool[] }[] {
  const published = publishedTools();
  return toolCategoryOrder
    .map((category) => ({
      category,
      items: published
        .filter((t) => t.category === category)
        .sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .filter((group) => group.items.length > 0);
}
