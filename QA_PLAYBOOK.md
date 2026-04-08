# Manual QA Playbook

Run this checklist before merging PRs to catch regressions across rendering modes.

## Prerequisites

```bash
bin/dev          # Start all processes (Rails, webpack client/server/RSC, Node renderer, ReScript)
```

Verify all 6 processes start without crashes in the terminal output:
- `rails` - Rails server via Thruster on port 3000
- `wp-client` - Rspack dev server (HMR)
- `wp-server` - SSR bundle watcher
- `wp-rsc` - RSC bundle watcher
- `node-renderer` - Node.js renderer on port 3800
- `rescript` - ReScript compiler watch mode

---

## 1. Homepage `/` (SSR + Redux + React Router)

**Rendering:** Server-side rendered with Redux store hydration.

- [ ] Page loads with comments visible (not a blank flash before JS loads)
- [ ] View page source shows pre-rendered HTML content (SSR working)
- [ ] No console errors
- [ ] Navigation bar renders with correct links
- [ ] Comment list displays existing comments

**Comment CRUD:**
- [ ] Submit a comment via the form (fill name + text, click Post)
- [ ] New comment appears immediately in the list
- [ ] Submit with empty fields shows validation errors
- [ ] Switch between Inline/Horizontal/Stacked form layouts

**React Router:**
- [ ] Click "React Router Demo" link - navigates without full page reload
- [ ] Visit `/react-router` directly - shows React Router content
- [ ] Visit `/react-router/redirect` - redirects back to `/`

**ActionCable (real-time):**
- [ ] Open page in two tabs
- [ ] Submit a comment in tab 1
- [ ] Comment appears in tab 2 without refresh

---

## 2. Simple React `/simple` (CSR only)

**Rendering:** Client-side only, no SSR.

- [ ] Page loads (content appears after JS loads)
- [ ] View page source shows empty mount point (no pre-rendered HTML)
- [ ] No console errors
- [ ] Comment form works (submit, validation)

---

## 3. No Router `/no-router` (SSR + Redux, no React Router)

- [ ] Page loads with pre-rendered comments
- [ ] Comment CRUD works
- [ ] Form layout switching works
- [ ] No console errors

---

## 4. ReScript `/rescript` (SSR)

- [ ] Page loads with pre-rendered ReScript component
- [ ] No console errors
- [ ] Content displays correctly

---

## 5. Stimulus `/stimulus` (Rails + Turbo + Stimulus)

**No React on this page - pure Rails.**

- [ ] Page loads with comment form
- [ ] Tab switching works (Horizontal/Inline/Stacked forms via Turbo)
- [ ] Submit comment - appears in list via Turbo (no full page reload)
- [ ] Validation errors display on empty submit
- [ ] "Force Refresh" reloads comment list via Turbo
- [ ] No console errors

---

## 6. Classic Rails `/comments` (scaffold)

- [ ] List page shows all comments
- [ ] Create: `/comments/new` - fill form, save, redirects to show page
- [ ] Edit: click Edit on any comment, change fields, save
- [ ] Delete: click Destroy, confirm, comment removed
- [ ] Validation: submit empty form shows errors

---

## 7. Server Components `/server-components` (RSC)

**Rendering:** React Server Components via Node renderer streaming.

- [ ] Page loads without errors
- [ ] Server-only content renders (e.g., ServerInfo with Node.js `os` data)
- [ ] Client components hydrate and are interactive (e.g., TogglePanel)
- [ ] No console errors
- [ ] `/rsc_payload/ServerComponentsPage` returns RSC Flight payload (not HTML error page)

---

## Cross-cutting checks

### Console errors
- [ ] No red errors on any page
- [ ] No hydration mismatch warnings

### SSR verification
For SSR pages (`/`, `/no-router`, `/rescript`):
- [ ] View Source shows pre-rendered HTML inside React mount points

### Network
- [ ] No 404s for assets in Network tab
- [ ] WebSocket `/cable` connection established (for ActionCable pages)
- [ ] All JS/CSS bundles load successfully

### Responsive
- [ ] Pages render correctly at mobile width (375px)
- [ ] Navigation collapses/adapts on small screens

---

## RSpec smoke test

```bash
bundle exec rspec spec/system/ spec/requests/
```

All system and request specs should pass.

---

## Quick regression check (minimal)

If time is limited, test these 3 paths that cover all rendering modes:

1. **`/`** - SSR + Redux + React Router (submit a comment)
2. **`/stimulus`** - Stimulus + Turbo (submit a comment)
3. **`/server-components`** - RSC (page loads without errors)
