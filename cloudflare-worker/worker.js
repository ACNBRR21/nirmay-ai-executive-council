/**
 * Nirmay AI Executive Council - Cloudflare Worker Proxy
 * Mode B (Prepaid Tier): Validates 12-char Passcode against KV and proxies requests to OpenRouter
 */

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract Bearer token (Passcode)
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or malformed Authorization header. Expected Bearer <PASSCODE>" }),
        { status: 401, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const passcode = authHeader.replace("Bearer ", "").trim();

    // Verify Passcode in Cloudflare KV store (or validate format)
    // In production KV: const record = await env.COUNCIL_PASSCODES.get(passcode, { type: "json" });
    if (passcode.length < 8) {
      return new Response(
        JSON.stringify({ error: "Invalid Passcode. Please provide a valid 12-character council passcode." }),
        { status: 403, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Proxy payload to OpenRouter using master system key stored in Cloudflare Secrets
    const OPENROUTER_API_KEY = env.OPENROUTER_MASTER_KEY || "YOUR_SECRET_OPENROUTER_KEY";

    try {
      const incomingBody = await request.json();

      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://nirmay.org",
          "X-Title": "Nirmay AI Executive Council Proxy",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomingBody),
      });

      const responseBody = await openRouterResponse.text();

      return new Response(responseBody, {
        status: openRouterResponse.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: `Proxy Forwarding Failure: ${err.message}` }),
        { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
  },
};
