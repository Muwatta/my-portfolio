import crypto from "node:crypto";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).json({ error: "GITHUB_CLIENT_ID is not configured" });
    return;
  }

  const state = crypto.randomBytes(24).toString("hex");
  const origin = process.env.SITE_URL || `https://${req.headers.host}`;
  const callback = `${origin}/api/callback`;
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", callback);
  authorizeUrl.searchParams.set("scope", "repo");
  authorizeUrl.searchParams.set("state", state);

  res.setHeader(
    "Set-Cookie",
    `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
  );
  res.redirect(authorizeUrl.toString());
}
