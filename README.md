# PacWest Powersports — Web App

Single-page site with a live repair/upgrade estimate + intake (reservation) flow.
Built to deploy as a Node.js app on Hostinger via GitHub.

```
package.json        Express dependency + "start": "node server.js"
server.js           Express server, serves /public
public/index.html   The whole front-end (HTML + CSS + JS in one file)
```

---

## 1. Run it locally (optional)

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install      # downloads Express
npm start        # starts the server
```

Open **http://localhost:3000** in your browser. Stop the server with `Ctrl+C`.

---

## 2. Customize (everything is a placeholder)

Open `public/index.html` and edit the two config blocks near the top — that's all you need to touch for day-to-day changes.

**Shop details** (`window.PACWEST_CONFIG`):

```js
FORMSPREE_ID: "",                                 // see step 4 below
SHOP_EMAIL:   "service@pacwestpowersports.com",   // your email
SHOP_PHONE:   "(555) 555-0199",                   // your phone
SHOP_ADDRESS: "123 Track Ave, Bend, OR 97701",    // your address
SHOP_HOURS:   "Tue–Sat, 9am–6pm"                  // your hours
```

**Pricing** (`window.PACWEST_PRICING`) — every dollar amount and day estimate lives here. For example, to change the motor repair price and timeline:

```js
motor: { label: "Motor (powerplant)", price: 450, days: 5 },
```

`price` = dollars added for that item. `days` = working days it adds to the estimated completion date. `racerMultiplier: 1.15` adds 15% for racers; set to `1` to turn it off.

The on-screen estimate is a **non-binding ballpark** (it also shows a likely range of −15% / +25%). Final quote is confirmed after inspection.

---

## 3. Push to GitHub

If you don't have a repo yet:

```bash
cd "Pacwest Powersports"
git init
git add .
git commit -m "Initial PacWest Powersports site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pacwest-powersports.git
git push -u origin main
```

(Create the empty repo first at github.com → New repository, then use its URL above.)

---

## 4. Wire up the intake form (Formspree)

Without this, the form still calculates estimates and opens a pre-filled email as a fallback. Formspree makes submissions land in your inbox reliably — no backend code.

1. Go to **https://formspree.io** and sign up (free tier is fine).
2. Create a new form. Set the notification email to **your shop email**.
3. Formspree gives you an endpoint like `https://formspree.io/f/xmyzabcd`. Copy the part after `/f/` — that's your form ID (`xmyzabcd`).
4. Paste it into `index.html`:

   ```js
   FORMSPREE_ID: "xmyzabcd",
   ```

5. Commit and push (`git add . && git commit -m "Add Formspree" && git push`).
6. Submit the form once on your live site. Formspree emails you to confirm the address the first time — click the confirmation link, and you're live.

Each submission includes: service type, repair items / upgrade details, bike make-model-year, rider type, cleaning & old-parts choices, the ballpark estimate and completion date shown to the customer, and their contact info + preferred contact method.

---

## 5. Deploy on Hostinger

Use a Hostinger plan that supports **Node.js** apps (VPS, or a Business/Cloud plan with the Node.js app feature in hPanel).

1. In hPanel, open the **Node.js** app manager (or your VPS Git deployment panel).
2. **Connect the GitHub repo** you pushed in step 3 (branch `main`).
3. Set:
   - **Application root / startup file:** `server.js`
   - **Build / install command:** `npm install`
   - **Start command:** `npm start`
   - **Node version:** 18 or higher
4. The app reads the port from `process.env.PORT`, which Hostinger sets automatically — no change needed.
5. Deploy. Point your domain at the app in hPanel.

To update the site later: edit, `git commit`, `git push` — then redeploy (or enable auto-deploy on push if your plan supports it).

> Hostinger's exact screens vary by plan. If your plan only does static/PHP hosting, you can still publish the front end by uploading the **contents of `public/`** to `public_html` — but then the Express server isn't used. The Node.js setup above is the intended path.

---

## What's next (beyond this MVP)

This is Phase 1 (customer front door). The full spec also needs: accounts + saved bikes (database), card/Venmo deposits and the 25%-upfront part rule, status notifications, the admin/invoice/parts-margin portal, the work-timer portal, AI calendar sync, and the productivity dashboard. Those require a backend database and auth added to `server.js`.
