function readCookie(cookieHeader, name) {
  return cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }

  const { code, state, error } = req.query;
  const expectedState = readCookie(req.headers.cookie, "decap_oauth_state");
  if (error || !code || !state || state !== expectedState) {
    res.status(400).send("Invalid OAuth request.");
    return;
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.SITE_URL || `https://${req.headers.host}`}/api/callback`,
    }),
  });
  const token = await response.json();

  if (!response.ok || !token.access_token) {
    res.status(502).send("GitHub authentication failed.");
    return;
  }

  const payload = JSON.stringify({
    token: token.access_token,
    provider: "github",
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html><script>
    window.opener.postMessage("authorization:github:success:${payload}", "*");
    window.close();
  </script>`);
}
