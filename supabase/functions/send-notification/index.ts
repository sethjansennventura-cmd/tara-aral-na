import { JWT } from "npm:google-auth-library@9";

Deno.serve(async (req) => {
  try {
    const { token, title, body } = await req.json();

    const client = new JWT({
      email: Deno.env.get("FIREBASE_CLIENT_EMAIL"),
      key: Deno.env
        .get("FIREBASE_PRIVATE_KEY")
        ?.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/firebase.messaging",
      ],
    });

    const auth = await client.authorize();

    const projectId = Deno.env.get("FIREBASE_PROJECT_ID");

    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token,
            notification: {
              title,
              body,
            },
          },
        }),
      },
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-notification' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
