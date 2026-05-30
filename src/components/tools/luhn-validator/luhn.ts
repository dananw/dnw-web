export interface LuhnResult {
  ok: boolean;
  valid: boolean;
  sanitized: string;
  cardType: string;
  error?: string;
}

function detectCardType(digits: string): string {
  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(digits)) return "Visa";
  if (/^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/.test(digits))
    return "Mastercard";
  if (/^3[47]\d{13}$/.test(digits)) return "American Express";
  if (/^6(011|5\d{2}|4[4-9]\d)\d{12,15}$/.test(digits)) return "Discover";
  if (/^3(0[0-5]|[68]\d)\d{11}$/.test(digits)) return "Diners Club";
  if (/^(?:2131|1800|35\d{3})\d{11}$/.test(digits)) return "JCB";
  return "";
}

/** Validate a number against the Luhn (mod 10) checksum. */
export function luhnCheck(input: string): LuhnResult {
  const sanitized = input.replace(/[\s-]/g, "");
  if (!sanitized) {
    return { ok: true, valid: false, sanitized: "", cardType: "" };
  }
  if (!/^\d+$/.test(sanitized)) {
    return {
      ok: false,
      valid: false,
      sanitized,
      cardType: "",
      error: "Only digits, spaces and dashes are allowed",
    };
  }

  let sum = 0;
  let double = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let d = sanitized.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }

  return {
    ok: true,
    valid: sum % 10 === 0,
    sanitized,
    cardType: detectCardType(sanitized),
  };
}
