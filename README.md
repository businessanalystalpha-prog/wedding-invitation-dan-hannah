# Dan & Hannah Wedding Invitation

A single-page, mobile-first wedding invitation built with HTML5, Tailwind CSS via CDN, Vanilla JavaScript, and Supabase. There is no build step or Node.js runtime.

## Files

- `index.html` - complete invitation UI for Daniel and Hannah, invitation entry overlay, hero countdown, responsive photo carousel and gallery, visual image manager, keyboard-accessible lightbox, RSVP form, guestbook feed, realtime subscription, background music, and PDF thank-you pass generation.
- `admin.html` - password-gated dashboard for gallery/music controls, RSVP review, and per-guest PDF pass downloads.
- `supabase-schema.sql` - RSVP table, validation constraints, RLS policies, and Realtime publication setup.

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste `supabase-schema.sql`, and run it.
3. Open **Project Settings > API** and copy the Project URL and anon public key.
4. In `index.html`, replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the bottom of the file.
5. Add the expected invitees to the new `guests` table. Their names will populate the RSVP dropdown.
6. In the Supabase table editor, change `approved` to `true` for wishes you want to publish.
7. Replace the placeholder Unsplash URLs in the `galleryPhotos` array, or use **Edit photos** in the page navigation to save browser-local swaps.

## Admin dashboard

Open `admin.html` and use the passcode `adminjosh123`. The unlock state lasts for the current browser tab session. Gallery and MP3 changes use same-origin `localStorage`, so the public page on the same deployed domain can read them.

The client-side passcode is a convenience gate, not strong security: static HTML exposes browser code to visitors. For real private RSVP administration, use Supabase Auth plus an authenticated admin role or a server/Edge Function. The supplied public RLS policies intentionally allow guests to read only approved wishes; an untrusted browser should not be granted unrestricted RSVP read access.

The current event details are Daniel & Hannah, December 29, 2026, IOWO Novaliches Church, and Artan Garden (Eiffle Tower). The two supplied Google Maps links are already connected to the venue buttons.

RSVPs are upserted by `guest_id`, so a guest submitting again updates their existing attendance record instead of creating a duplicate. After a successful save, the browser downloads a personalized PDF thank-you pass using `html2pdf.js`.

The browser must only use the public anon key. Never put a Supabase service-role key in this file. RLS is enabled by the supplied SQL so guests can insert RSVPs but can only read approved guestbook entries.

## Local preview

Because this is a static page, open `index.html` directly in a browser. For a closer production-like preview, use any static server, such as VS Code Live Server.

## Netlify or Vercel deployment

1. Put `index.html` and `supabase-schema.sql` in a Git repository, or upload the folder to Netlify.
2. For Netlify, choose **Add new site > Deploy manually** and drop in the folder. For Vercel, import the repository.
3. Set the framework/build preset to **Other** or **Static HTML**. Leave the build command empty and use the project root as the output directory.
4. Open the generated URL and submit a test RSVP.

The music button requests playback only after a user click because modern browsers block autoplay with sound.
