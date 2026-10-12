# Positive Spin: Deploy Guide (GitHub + Vercel)

About 20 minutes, all in the browser. Screens and button names on GitHub and Vercel change from time to time, so if something is labelled slightly differently, look for the closest match.

---

## Step 1. Add the fonts (5 minutes)

1. Unzip **positive-spin.zip** on your computer. You'll get a `positive-spin` folder.
2. Go to **fonts.google.com/specimen/Rubik**, click **Get font**, then **Download all**. Unzip it and copy **Rubik-VariableFont_wght.ttf** (top level of the zip, not the `static` folder) into `positive-spin/fonts/`.
3. Go to **fonts.google.com/specimen/Space+Mono**, same again. Copy **SpaceMono-Regular.ttf** and **SpaceMono-Bold.ttf** into `positive-spin/fonts/`.

Your folder should now look like this:

```
positive-spin/
  index.html
  README.md
  DEPLOY.md
  favicon.svg
  og.png
  api/
    count.js
  fonts/
    README.txt
    Rubik-VariableFont_wght.ttf
    SpaceMono-Regular.ttf
    SpaceMono-Bold.ttf
```

## Step 2. Create the GitHub repo (5 minutes)

1. On github.com, click **+** (top right), then **New repository**.
2. Repository name: **positive-spin**. Public or Private both work with Vercel. Leave "Add a README" **unticked**. Click **Create repository**.
3. On the empty repo page, click the **uploading an existing file** link.
4. Open your `positive-spin` folder, select **everything inside it** (not the folder itself) and drag it onto the GitHub page. Chrome and Edge keep the `api` and `fonts` folders intact.
5. Click **Commit changes**.
6. Check the repo now shows `index.html` at the top level, plus `api` and `fonts` folders. If `api/count.js` is missing, use **Add file > Create new file**, type `api/count.js` as the name, and paste in the file's contents.

## Step 3. Deploy on Vercel (3 minutes)

1. On vercel.com, click **Add New...**, then **Project**.
2. Connect GitHub if asked, then click **Import** next to **positive-spin**.
3. **Project Name** becomes your free address: `project-name.vercel.app`. Try `positivespin`, `positive-spin` or similar until you get one that's free.
4. Framework Preset: **Other**. Leave everything else as it is. Click **Deploy**.
5. When it finishes, open the site. It works fully at this point, apart from the counter, which stays hidden until Step 4.

## Step 4. Connect the counter (Upstash, 5 minutes)

1. In your Vercel project, open the **Storage** tab, then **Create Database** (or browse the Marketplace) and choose **Upstash for Redis**.
2. Pick the **Free** plan. For region, choose **US East (N. Virginia)**, which sits next to Vercel's default server location.
3. Connect it to the **positive-spin** project for all environments. This adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` settings automatically. There's nothing to copy or paste.
4. Go to **Deployments**, click the **...** menu on the latest deployment, and choose **Redeploy**. New settings only apply after a redeploy.
5. Check it: open `https://your-project.vercel.app/api/count`. You should see `{"sent":0}`. The counter appears on the page after the first send.

## Step 5. Set the link preview image (2 minutes)

WhatsApp and iMessage need the full address of the preview image.

1. In GitHub, open `index.html` and click the pencil icon to edit.
2. Find `https://YOUR-PROJECT.vercel.app/og.png` and replace `YOUR-PROJECT` with your actual project name.
3. Click **Commit changes**. Vercel redeploys automatically within a minute.

## Step 6. Keep the privacy promise true

- **Leave Analytics and Speed Insights switched off** in the Vercel project (they're off unless you turn them on).
- The site makes no requests to any third party: fonts, images and the counter all come from your own Vercel project.

## Step 7. Send Claude the address

Share your `.vercel.app` address and I'll check the live site, the counter and the share links before you send it to friends.

---

## Making changes later

Any edit you commit in GitHub (for example in `const DATA` to add compliments) goes live automatically within about a minute.
