# SmartSpend AI - Troubleshooting Guide

## 🔧 Common Issues & Solutions

### Issue 1: App Not Starting

**Error:** `Cannot find module` or `ERR! code ENOENT`

**Solution:**
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**On Windows:**
```bash
cd client
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

---

### Issue 2: Styles Not Applying / Colors Look Wrong

**Problem:** Components don't have the new mint green color

**Solutions:**

1. **Clear browser cache:**
   - Open DevTools (F12)
   - Settings → Network Conditions → Check "Disable cache"
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

2. **Check CSS is imported:**
   - Open DevTools → Elements
   - Find `<style>` tags with `globals.css`
   - Verify CSS variables are defined

3. **Verify import order:**
   - Check `client/src/index.css` includes: `@import "./styles/globals.css";`
   - This must be in the file

---

### Issue 3: Fonts Look Different

**Problem:** Text doesn't match design, looks like default system font

**Solution:** You haven't updated the placeholder fonts yet!

**Fix it:**
1. Open `client/src/styles/globals.css`
2. Find `:root {` section
3. Look for:
   ```css
   --font-display: system-ui, -apple-system, sans-serif;
   --font-body: system-ui, -apple-system, sans-serif;
   ```
4. Replace with your chosen fonts

**Example with Google Fonts:**
```css
@import url("https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700&display=swap");

:root {
  --font-display: "Cabinet Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  /* ... rest of variables */
}
```

---

### Issue 4: Components Not Rendering

**Error:** `HeroSection is not defined` or similar

**Solution:** Check imports in Dashboard.jsx

**Verify:**
1. Go to `client/src/pages/Dashboard.jsx`
2. Check these imports exist:
   ```jsx
   import HeroSection from "@/components/dashboard/HeroSection"
   import FinancialOverviewCards from "@/components/dashboard/FinancialOverviewCards"
   import BentoAnalytics from "@/components/dashboard/BentoAnalytics"
   import ActivityFeed from "@/components/dashboard/ActivityFeed"
   import GoalsSection from "@/components/dashboard/GoalsSection"
   import BottomNavigation from "@/components/layout/BottomNavigation"
   ```

3. Check files exist at those paths:
   - `src/components/dashboard/HeroSection.jsx` ✓
   - `src/components/dashboard/FinancialOverviewCards.jsx` ✓
   - etc.

---

### Issue 5: Animations Not Working

**Problem:** Elements don't fade in or slide up

**Solution:**

1. **Check Framer Motion is installed:**
   ```bash
   npm list motion
   ```

2. **If missing, install it:**
   ```bash
   npm install motion
   ```

3. **Verify animation classes exist:**
   - Open `client/src/styles/globals.css`
   - Search for `@keyframes fadeIn`
   - Should see fade-in, slide-up, blur-in animations

4. **Check component uses animation class:**
   ```jsx
   <div className="fade-in">Content</div>
   ```

---

### Issue 6: Mobile Navigation Not Showing

**Problem:** Bottom dock doesn't appear on mobile

**Solution:**

1. **Test in actual mobile viewport:**
   - DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
   - Select device (iPhone 12, etc.)

2. **Check BottomNavigation is imported:**
   - In Dashboard.jsx:
   ```jsx
   import BottomNavigation from "@/components/layout/BottomNavigation"
   ```

3. **Verify it's in the JSX:**
   - Should appear at top level:
   ```jsx
   return (
     <div>
       <BottomNavigation />
       <main>...</main>
     </div>
   )
   ```

---

### Issue 7: Colors Different Than Expected

**Problem:** Accent color is wrong or background is too dark/light

**Solution:**

1. **Check hex values in globals.css:**
   ```css
   --color-bg-primary: #f3f8f2;      /* Should be light mint */
   --color-accent-primary: #399e5a;  /* Should be green */
   --color-text-primary: #303633;    /* Should be dark gray, not black */
   ```

2. **Verify DevTools shows correct colors:**
   - Right-click element → Inspect
   - Find computed styles
   - Check backgroundColor, color values

3. **Check browser color profile:**
   - Display color settings might be different
   - Try opening in different browser

---

### Issue 8: Cards/Buttons Look Too Blocky

**Problem:** Elements don't have rounded corners

**Solution:**

1. **Verify border-radius is applied:**
   - Check `globals.css` has radius scale
   - Components should use:
   ```jsx
   className="card"
   ```

2. **Check Tailwind radius classes are working:**
   - Try inline style:
   ```jsx
   style={{ borderRadius: "32px" }}
   ```

3. **If still not working:**
   - Clear Tailwind cache:
   ```bash
   rm -rf node_modules/.cache
   npm run dev
   ```

---

### Issue 9: Layout Broken on Tablet/Desktop

**Problem:** Content looks weird on larger screens

**Solution:**

1. **Check responsive classes:**
   - Look for `md:`, `lg:` prefixes
   - Example: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

2. **Test breakpoints:**
   - Mobile: 320px - 640px ✓
   - Tablet: 768px - 1024px ✓
   - Desktop: 1024px+ ✓

3. **Verify max-width applied:**
   - Container should have `max-w-7xl` or `max-w-[1600px]`
   - Check it's not full-width everywhere

---

### Issue 10: Console Errors About Missing Components

**Error:** `Warning: React does not recognize the X prop`

**Solution:**

1. **Don't pass HTML attributes to React components:**
   ```jsx
   // ❌ Wrong
   <HeroSection userName="Aryan" style={{color: "red"}} />
   
   // ✅ Correct - Create wrapper
   <div style={{color: "red"}}>
     <HeroSection userName="Aryan" />
   </div>
   ```

2. **Check component PropTypes:**
   - Some components only accept certain props
   - Use DevTools to see prop requirements

---

### Issue 11: Shadows Look Too Heavy

**Problem:** Shadows are too dark, not subtle

**Solution:**

1. **Check shadow opacity in globals.css:**
   ```css
   --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.04);  /* Should be 0.04, not 0.4 */
   ```

2. **Use correct shadow class:**
   ```jsx
   style={{ boxShadow: "var(--shadow-lg)" }}
   ```

3. **Verify not using Tailwind's heavy shadows:**
   ```jsx
   // ❌ Wrong (too heavy)
   className="shadow-2xl"
   
   // ✅ Correct
   style={{ boxShadow: "var(--shadow-lg)" }}
   ```

---

### Issue 12: Text Color Hard to Read

**Problem:** Text is too light or too dark

**Solution:**

1. **Use text color system:**
   ```css
   --color-text-primary: #303633;    /* Main text */
   --color-text-secondary: #5a5e5c;  /* Secondary */
   --color-text-muted: #8b8f8d;      /* Hint text */
   ```

2. **Never use pure black:**
   ```jsx
   // ❌ Wrong
   style={{ color: "#000000" }}
   
   // ✅ Correct
   style={{ color: "var(--color-text-primary)" }}
   ```

3. **Ensure contrast:**
   - Text on white background ✓
   - Text on mint background ✓
   - Test with accessibility checker

---

### Issue 13: Page Takes Too Long to Load

**Problem:** Dashboard has performance issues

**Solution:**

1. **Check for unnecessary re-renders:**
   - Use React DevTools Profiler
   - Look for components rendering every frame

2. **Optimize images/assets:**
   - Make sure images are optimized
   - Use lazy loading if needed

3. **Check network tab:**
   - DevTools → Network
   - Look for slow requests
   - Might be API/Supabase issue

4. **Reduce animation complexity:**
   - Particles component can be heavy
   - Try reducing particle count

---

### Issue 14: Mobile Dock Overlaps Content

**Problem:** Bottom navigation covers content

**Solution:**

1. **Add bottom padding:**
   ```jsx
   <main style={{ paddingBottom: "120px" }}>
     {/* Content */}
   </main>
   ```

2. **Use container query:**
   ```css
   @media (max-width: 768px) {
     main {
       padding-bottom: 120px;
     }
   }
   ```

3. **Check z-index:**
   - Dock should be z-50
   - Content should be lower

---

### Issue 15: Git/Version Control Issues

**Problem:** Merge conflicts or version issues

**Solution:**

1. **Backup before changes:**
   ```bash
   git stash
   ```

2. **See what changed:**
   ```bash
   git status
   git diff
   ```

3. **Resolve conflicts:**
   - Use VS Code's merge tool
   - Manually edit conflicting files

---

## 🆘 Getting Help

If you encounter an issue not listed here:

1. **Check the browser console:**
   - DevTools → Console → Look for error messages
   - Copy error and search online

2. **Check the documentation:**
   - DESIGN_SYSTEM_IMPLEMENTATION.md
   - DESIGN_SETUP_GUIDE.md
   - VISUAL_LAYOUT_GUIDE.md

3. **Verify file structure:**
   - All created files exist?
   - All imports correct?
   - All dependencies installed?

4. **Try these commands:**
   ```bash
   # Clear everything and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

---

## ✅ Verification Checklist

When something seems broken, verify:

- [ ] All files exist at expected paths
- [ ] imports are correct
- [ ] Browser cache is cleared
- [ ] Dev server restarted
- [ ] Dependencies installed (npm install)
- [ ] fonts have been updated
- [ ] Colors match design system
- [ ] Component props are correct
- [ ] No console errors
- [ ] Responsive viewport being tested

---

## 📞 Quick Support Commands

```bash
# Start fresh
npm install && npm run dev

# Clear cache
npm cache clean --force

# Check version
npm -v && node -v

# Update packages
npm update

# Audit for security
npm audit fix

# See what's installed
npm list

# Run linter
npm run lint
```

---

**Still stuck? Check the design documentation files or review the example components!**
