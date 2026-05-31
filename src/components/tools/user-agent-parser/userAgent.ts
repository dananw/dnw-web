export interface UserAgentInfo {
  browser: string;
  browserVersion: string;
  engine: string;
  os: string;
  device: string;
}

function matchVersion(ua: string, re: RegExp): string {
  const m = ua.match(re);
  return m && m[1] ? m[1] : "";
}

function detectOs(ua: string): string {
  if (/windows nt 10/i.test(ua)) return "Windows 10/11";
  if (/windows nt 6\.3/i.test(ua)) return "Windows 8.1";
  if (/windows nt 6\.1/i.test(ua)) return "Windows 7";
  if (/windows/i.test(ua)) return "Windows";
  if (/android\s([\d.]+)/i.test(ua)) return `Android ${matchVersion(ua, /android\s([\d.]+)/i)}`;
  if (/iphone os|cpu iphone|ipad.*os/i.test(ua)) {
    const v = matchVersion(ua, /os ([\d_]+)/i).replace(/_/g, ".");
    return `iOS ${v}`.trim();
  }
  if (/mac os x ([\d_]+)/i.test(ua)) {
    return `macOS ${matchVersion(ua, /mac os x ([\d_]+)/i).replace(/_/g, ".")}`;
  }
  if (/cros/i.test(ua)) return "ChromeOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function detectDevice(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return "Tablet";
  if (/mobi|iphone|android.*mobile/i.test(ua)) return "Mobile";
  return "Desktop";
}

/** Parse a User-Agent string into best-guess browser/engine/OS/device. */
export function parseUserAgent(ua: string): UserAgentInfo {
  const empty: UserAgentInfo = {
    browser: "Unknown",
    browserVersion: "",
    engine: "Unknown",
    os: "Unknown",
    device: "Unknown",
  };
  if (!ua.trim()) return empty;

  let browser = "Unknown";
  let browserVersion = "";
  let engine = "Unknown";

  if (/edg(?:e|ios|a)?\//i.test(ua)) {
    browser = "Microsoft Edge";
    browserVersion = matchVersion(ua, /edg(?:e|ios|a)?\/([\d.]+)/i);
  } else if (/opr\/|opera/i.test(ua)) {
    browser = "Opera";
    browserVersion = matchVersion(ua, /(?:opr|opera)\/([\d.]+)/i);
  } else if (/firefox\/|fxios\//i.test(ua)) {
    browser = "Firefox";
    browserVersion = matchVersion(ua, /(?:firefox|fxios)\/([\d.]+)/i);
  } else if (/chrome\/|crios\//i.test(ua)) {
    browser = "Chrome";
    browserVersion = matchVersion(ua, /(?:chrome|crios)\/([\d.]+)/i);
  } else if (/version\/[\d.]+.*safari/i.test(ua)) {
    browser = "Safari";
    browserVersion = matchVersion(ua, /version\/([\d.]+)/i);
  } else if (/msie |trident/i.test(ua)) {
    browser = "Internet Explorer";
    browserVersion = matchVersion(ua, /(?:msie |rv:)([\d.]+)/i);
  }

  if (/trident/i.test(ua)) engine = "Trident";
  else if (/gecko\//i.test(ua) && /firefox/i.test(ua)) engine = "Gecko";
  else if (/applewebkit/i.test(ua)) {
    engine = /chrome|crios|edg|opr/i.test(ua) ? "Blink" : "WebKit";
  }

  return {
    browser,
    browserVersion,
    engine,
    os: detectOs(ua),
    device: detectDevice(ua),
  };
}
