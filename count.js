// Positive Spin: compliments-sent counter.
// Stores exactly one thing: a single number in Upstash Redis. No IPs, no names, no messages.
//
//   GET  /api/count  -> { "sent": 1234 }
//   POST /api/count  -> adds one, returns the new total
//
// Needs the Upstash for Redis integration connected in Vercel, which provides
// KV_REST_API_URL and KV_REST_API_TOKEN (UPSTASH_REDIS_REST_* names also work).

const KEY = "positive-spin:sent";

function credentials() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

async function redis(creds, ...command) {
  const res = await fetch(`${creds.url}/${command.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${creds.token}` },
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  const body = await res.json();
  return body.result;
}

// Only count sends that come from the site itself (stops casual drive-by inflation).
function fromOwnSite(req) {
  if (req.headers["x-positive-spin"] !== "1") return false;
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === req.headers.host; } catch { return false; }
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const creds = credentials();
  if (!creds) return res.status(503).json({ error: "Counter not configured yet" });

  try {
    if (req.method === "GET") {
      const value = await redis(creds, "get", KEY);
      return res.status(200).json({ sent: Number(value) || 0 });
    }
    if (req.method === "POST") {
      if (!fromOwnSite(req)) return res.status(403).json({ error: "Not allowed" });
      const value = await redis(creds, "incr", KEY);
      return res.status(200).json({ sent: Number(value) || 0 });
    }
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(502).json({ error: "Counter unavailable" });
  }
};
