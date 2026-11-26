# SURJO KURI SPORTS

Next.js sports registration form with guardian contact details and a password-protected admin page.

## Important privacy setup
- Collect guardian phone/email only with guardian permission.
- Tell families why the information is collected and who can see it.
- Do not publish the Supabase service-role key or admin password.
- Limit access to the admin page to the organizer and delete data when no longer needed.
- This starter does not send submissions by email.

## Setup
1. Create a Supabase project with help from a parent/guardian or the event organizer.
2. In Supabase SQL Editor, run `supabase.sql`.
3. In Vercel Project Settings > Environment Variables, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (use a long unique password; do not reuse your personal password)
4. Redeploy the Vercel project.
5. The public form is `/` and admin page is `/admin`.

The service-role key must stay server-side only. Never put it in a `NEXT_PUBLIC_` variable or GitHub.
