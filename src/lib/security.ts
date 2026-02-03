export function sanitizeInput(input: string): string {
  if (!input) return "";
  // Remove HTML tags
  let sanitized = input.replace(/<\/?[^>]+(>|$)/g, "");
  // Remove script tags specifically if missed
  sanitized = sanitized.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
  // Trim
  return sanitized.trim();
}
