# Firebase CMS Foundation

This repository is being prepared to replace the abandoned Supabase CMS direction with Firebase. This phase adds the Firestore and Storage security foundation only. The existing Markdown blog, `public/blog.json`, Decap CMS, and `/blog/:id` routes remain unchanged until the content migration phase.

## Firebase services

- Firebase Authentication: email/password admin login
- Cloud Firestore: articles, profiles, admin users, categories, tags, comments, likes, and views
- Cloud Storage: article cover images under `article-covers/`

## Configuration

Create a Firebase project and enable Authentication (Email/Password), Firestore, and Storage. Copy the public web-app configuration into a local `.env.local` based on `.env.example`:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

These are browser configuration values, not service-account secrets. Do not add a Firebase service-account JSON file or private key to the repository or frontend.

Deploy the rules from the repository after selecting the intended Firebase project:

```bash
firebase use YOUR_FIREBASE_PROJECT_ID
firebase deploy --only firestore:rules,storage
```

The repository currently does not include a Firebase project alias, so `firebase use` is intentionally a manual setup step.

## Admin authorization

Create the first user through Firebase Authentication, then create this Firestore document manually in the Firebase console:

```text
Collection: admin_users
Document ID: <Firebase Auth user UID>
Fields:
  role: admin
```

Firestore rules use this document to authorize CMS operations. Authentication alone does not grant admin access.

## Security model

- Published articles are public; drafts and archived articles are admin-only.
- Only approved comments are public.
- Only admins can manage articles, categories, tags, moderation data, and admin records.
- Comment creation is limited to pending comments with a maximum content length in rules.
- Article cover uploads require admin authorization, an image MIME type, and a 5 MB size limit.
- Anonymous likes and views are accepted only as abuse-resistant event inputs; application-level deduplication and rate limiting belong to the later community phase.

## Current status

The Firebase SDK install and client-auth replacement are pending because the package registry was unavailable during this phase. The active application still uses its legacy Supabase auth wrapper so the existing build remains intact. Do not delete the current Supabase files until `firebase` is installed and `AuthContext` has been migrated and tested.

No Firebase data or rules have been deployed from this repository.

## Next phase

1. Install the `firebase` npm package.
2. Add `src/lib/firebase.js` with the public web-app configuration.
3. Replace the legacy Supabase `AuthContext` with Firebase Auth.
4. Add `/admin/login` and an admin route guard.
5. Test admin authorization against the deployed Firestore rules.
6. Migrate articles only after the foundation is verified.
