type PushoverResult =
  | { ok: true; receipt?: string }
  | { ok: false; error: string; details?: unknown };

function isConfigured(): boolean {
  return Boolean(process.env.PUSHOVER_APP_TOKEN && process.env.PUSHOVER_USER_KEY);
}

/**
 * Sends a push notification to the engineer via Pushover.
 * Safe-by-default: if env vars are missing, it returns ok:false (does not throw).
 */
export async function sendPushoverPush(args: {
  title: string;
  message: string;
  url?: string;
  url_title?: string;
  priority?: -2 | -1 | 0 | 1 | 2;
}): Promise<PushoverResult> {
  if (!isConfigured()) {
    return { ok: false, error: 'Pushover not configured (missing env vars).' };
  }

  const token = process.env.PUSHOVER_APP_TOKEN!;
  const user = process.env.PUSHOVER_USER_KEY!;
  const device = process.env.PUSHOVER_DEVICE;
  const priorityEnv = process.env.PUSHOVER_PRIORITY;

  const priority =
    typeof args.priority === 'number'
      ? args.priority
      : priorityEnv
        ? (Number(priorityEnv) as -2 | -1 | 0 | 1 | 2)
        : 0;

  const body = new URLSearchParams();
  body.set('token', token);
  body.set('user', user);
  body.set('title', args.title);
  body.set('message', args.message);
  body.set('priority', String(priority));

  if (device) body.set('device', device);
  if (args.url) body.set('url', args.url);
  if (args.url_title) body.set('url_title', args.url_title);

  const res = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    cache: 'no-store',
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // ignore parse errors
  }

  if (!res.ok) {
    return {
      ok: false,
      error: `Pushover HTTP ${res.status}`,
      details: json,
    };
  }

  if (json?.status === 1) {
    return { ok: true, receipt: json.receipt };
  }

  return { ok: false, error: 'Unexpected Pushover response', details: json };
}

