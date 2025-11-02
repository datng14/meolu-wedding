# Font System Explanation

## How Fonts Work in This Project

### Font Setup

The project uses two fonts:
1. **Lora** (Google Font) - Main serif font for body text
2. **High Spirited** (Local font) - Script font for decorative text

### Font Variables System

#### 1. Next.js Font Loading ([layout.tsx](src/app/[locale]/layout.tsx))

```typescript
// Lora from Google Fonts
const lora = Lora({
  variable: '--font-serif',  // Creates CSS variable
  ...
});

// High Spirited from local files
const highSpirited = localFont({
  src: '../../../public/fonts/HighSpirited.woff2',
  variable: '--font-script',  // Creates CSS variable
  ...
});
```

#### 2. Applied to HTML

```typescript
<html className={`${lora.variable} ${highSpirited.variable}`}>
```

This sets CSS variables on the `<html>` element:
- `--font-serif`: Contains the optimized Lora font family
- `--font-script`: Contains the High Spirited font family

#### 3. CSS Usage ([globals.css](src/app/globals.css))

```css
.font-serif {
  font-family: var(--font-serif), Georgia, serif;
}

.font-script {
  font-family: var(--font-script), cursive;
}
```

### Font Application in Components

#### Serif Font (Lora) - `font-serif` class
Used for:
- Body text
- Couple names
- Wedding date numbers
- Venue names
- All regular text

**Example:**
```tsx
<h2 className="text-4xl font-serif">Tuan Dat</h2>
```

#### Script Font (High Spirited) - `font-script` class
Used for:
- Hero: "Save our date"
- Calendar: Month names (e.g., "January")
- Timeline: Section title
- Guestbook: Section title
- Invitation: "and" text between names

**Example:**
```tsx
<h2 className="text-5xl font-script">Save our date</h2>
```

## Font Files Location

```
public/
  fonts/
    HighSpirited.woff2  ← Best performance (smallest)
    HighSpirited.woff   ← Fallback for older browsers
    HighSpirited.ttf    ← Fallback for very old browsers
```

## Font Loading Strategy

1. **Font Display: swap** - Text shows immediately with fallback font, then swaps to custom font when loaded
2. **WOFF2 format** - Used first for optimal compression
3. **Fallback fonts** - 'cursive' for script, 'Georgia, serif' for body text

## Troubleshooting

### Font not displaying?

1. **Check browser DevTools:**
   - Open Elements tab
   - Check `<html>` element
   - Should see classes with font variables

2. **Verify CSS variables:**
   - Open DevTools → Elements → Computed
   - Look for `--font-serif` and `--font-script`

3. **Check Network tab:**
   - Look for font file requests
   - Should see HighSpirited.woff2 loading

### Common Issues:

❌ **Problem:** Font variables reference themselves
```css
:root {
  --font-serif: var(--font-serif);  /* WRONG - circular reference */
}
```

✅ **Solution:** Remove from :root - Next.js handles these automatically via className

❌ **Problem:** Font file path incorrect
```typescript
src: '../fonts/HighSpirited.woff2'  /* WRONG - may not find file */
```

✅ **Solution:** Use correct relative path
```typescript
src: '../../../public/fonts/HighSpirited.woff2'  /* CORRECT */
```

## Performance

- Lora: Loaded from Google Fonts CDN (optimized, cached)
- High Spirited: Loaded locally (no external request)
- Both use `font-display: swap` for instant text visibility
- WOFF2 compression reduces file size by ~30% vs WOFF
