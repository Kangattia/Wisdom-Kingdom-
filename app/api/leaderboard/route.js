import { kv } from "@vercel/kv";

const KEY = "wisdomKingdomPlayers";

// GET /api/leaderboard -> top players, highest points first
export async function GET() {
  try {
    const players = (await kv.hgetall(KEY)) || {};
    const list = Object.values(players).sort(
      (a, b) => b.totalPoints - a.totalPoints
    );
    return Response.json(list);
  } catch (err) {
    return Response.json(
      { error: "Could not load leaderboard" },
      { status: 500 }
    );
  }
}

// POST /api/leaderboard { username, totalPoints, title }
// Upserts one player's entry.
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, totalPoints, title } = body || {};

    if (!username || typeof username !== "string") {
      return Response.json({ error: "Missing username" }, { status: 400 });
    }
    if (typeof totalPoints !== "number") {
      return Response.json({ error: "Missing totalPoints" }, { status: 400 });
    }

    await kv.hset(KEY, {
      [username]: { username, totalPoints, title: title || "" },
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Could not save score" },
      { status: 500 }
    );
  }
}
