# Font Setup Guide

## Current Font Configuration

The project currently uses **Dancing Script** from Google Fonts, which is very similar to High Spirited and is freely available for both personal and commercial use.

### Active Fonts:
- **Lora**: Main serif font (body text, dates, venue names)
- **Dancing Script**: Script font for decorative text (titles, "Save our date", section headings)

## Option: Add High Spirited Font (Manual Download)

If you want to use the actual High Spirited font instead of Dancing Script, follow these steps:

### Step 1: Download High Spirited Font

1. Download High Spirited font from one of these sources:
   - https://www.fontmirror.com/high-spirited
   - https://www.cufonfonts.com/font/high-spirited
   - https://www.dafontfree.co/high-spirited-font/

2. **Important**: Check the license! High Spirited is free for personal use but requires a commercial license from octotypeone@gmail.com for commercial projects.

### Step 2: Add Font Files to Project

1. Place the downloaded font files in `public/fonts/` directory:
   ```
   public/fonts/HighSpirited-Regular.ttf
   public/fonts/HighSpirited-Regular.woff
   public/fonts/HighSpirited-Regular.woff2
   ```

2. If you only have `.ttf` or `.otf`, you can convert them to web formats using:
   - https://transfonter.org/
   - https://everythingfonts.com/font-face

### Step 3: Update `globals.css`

Add the font-face declaration to `src/app/globals.css`:

```css
@font-face {
  font-family: 'High Spirited';
  src: url('/fonts/HighSpirited-Regular.woff2') format('woff2'),
       url('/fonts/HighSpirited-Regular.woff') format('woff'),
       url('/fonts/HighSpirited-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Step 4: Update `layout.tsx`

Replace the Dancing Script import with a local font import:

```typescript
import localFont from 'next/font/local';

const highSpirited = localFont({
  src: '../fonts/HighSpirited-Regular.woff2',
  variable: '--font-script',
  display: 'swap',
  fallback: ['cursive'],
});

// Update the className in the html tag:
className={`${lora.variable} ${highSpirited.variable}`}
```

### Step 5: Rebuild the Project

```bash
npm run build
```

## Font Usage in Components

All script text uses the `font-script` CSS variable, which applies to:
- Hero section: "Save our date"
- Calendar: Month names
- Timeline: Section title
- Guestbook: Section title
- Invitation: "and" text between couple names

All other text uses the `font-serif` CSS variable (Lora font).
