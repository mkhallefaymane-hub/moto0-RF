// lib/whatsapp.ts
export function normalizeWhatsApp(input: string): string {
  if (!input) return "";

  // Remove spaces, dashes, parentheses
  let clean = input.replace(/[\s\(\)\-]/g, "");

  // Handle Moroccan formats
  if (clean.startsWith("06")) {
    clean = "2126" + clean.substring(2);
  } else if (clean.startsWith("07")) {
    clean = "2127" + clean.substring(2);
  } else if (clean.startsWith("+212")) {
    clean = clean.substring(1);
  } else if (clean.startsWith("00212")) {
    clean = clean.substring(2);
  } else if (clean.startsWith("6") && clean.length === 9) {
    clean = "212" + clean;
  } else if (clean.startsWith("7") && clean.length === 9) {
    clean = "212" + clean;
  }

  // Ensure only digits remain
  return clean.replace(/\D/g, "");
}

export function getWhatsAppUrl(normalized: string, message: string = "") {
  const url = new URL(`https://wa.me/${normalized}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}
