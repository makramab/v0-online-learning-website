# gotoamerica Design Implementation Guide

**Last Updated:** January 2025
**Purpose:** This document captures all current design decisions, color schemes, and implementation patterns to maintain consistency across the platform.

---

## 🎨 Brand Identity

### Platform Name
- **Full Name**: gotoamerica
- **Short Name/Acronym**: GTA
- **Display Format**:
  - Logo: `goto` (dark/slate) + `america` (blue)
  - All lowercase, one word

### Brand Story
- **Founder**: Tedchay (former Master Chef Indonesia contestant, DV Lottery winner, Jr. Sous Chef in NYC)
- **Mission**: Help Indonesians achieve their American Dream through education and guidance
- **Target Audience**: Indonesian people aspiring to immigrate to the United States

---

## 🎨 Color Palette (CURRENT IMPLEMENTATION)

### Primary Colors

#### Sky Blue - `#1c9af1` (Main Brand Color)
- **Hex**: `#1c9af1`
- **OKLCH**: `oklch(0.66 0.17 237)`
- **Usage**:
  - Primary buttons (when not CTA)
  - Links
  - Logo "america" text
  - Headings and emphasis text
  - Navigation hover states
  - Stats numbers

#### Blue Gradient Shades
- **Darker**: `#1580d1` - Used for gradient starts
- **Main**: `#1c9af1` - Primary brand color
- **Lighter**: `#50b8f5` - Used for gradient ends

#### Vibrant Red - `#dc2626` (CTA/Action Color)
- **Hex**: `#dc2626`
- **Usage**:
  - Primary CTA buttons ("Daftar Gratis", "Mulai Belajar")
  - Premium/upgrade buttons
  - Important action buttons
  - Achievement badges ("DV Lottery Winner")
- **Hover**: `#b91c1c` (darker red)

### Neutral Colors

#### Text Colors
- **Primary Text**: `#1E293B` (Dark Slate)
- **Secondary Text**: `#64748B` (Medium Slate)
- **Tertiary Text**: `#94a3b8` (Light Slate)

#### Backgrounds
- **Pure White**: `#FFFFFF`
- **Off-White**: `#F8FAFC`
- **Light Gray**: `#F1F5F9`
- **Slate Background**: `#E2E8F0`

#### Borders
- **Light Border**: `#E2E8F0`
- **Medium Border**: `#CBD5E1`

---

## 🖋 Typography

### Font Family
- **Primary**: Geist Sans (system default)
- **Monospace**: Geist Mono
- **Fallback**: System font stack

### Font Sizes & Weights
- **Hero Heading**: `text-6xl lg:text-7xl` (96px/112px), Bold (font-bold)
- **Page Heading**: `text-4xl`, Bold
- **Section Heading**: `text-2xl`, Bold
- **Body Text**: `text-base` or `text-lg`, Regular
- **Small Text**: `text-sm`, Regular
- **Caption**: `text-xs`, Regular

### Text Styles
- **Line Height**: Tight for headings (`leading-tight`), Relaxed for body (`leading-relaxed`)
- **Letter Spacing**: Default (no custom tracking)

---

## 📐 Layout & Spacing

### Container
- **Max Width**: Container class with responsive padding
- **Padding**: `px-6 lg:px-16`

### Grid System
- **Courses Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Stats Grid**: `grid-cols-1 md:grid-cols-3`
- **Two Column Layout**: `lg:grid-cols-2`

### Spacing Scale
- **Section Padding**: `py-20` (80px vertical)
- **Component Spacing**: `space-y-8` (32px)
- **Element Spacing**: `gap-4` (16px), `gap-6` (24px), `gap-12` (48px)

### Border Radius
- **Default**: `0.75rem` (12px)
- **Large**: `rounded-2xl` (16px)
- **XL**: `rounded-3xl` (24px)
- **Full**: `rounded-full`

---

## 🎭 Component Patterns

### Buttons

#### Primary CTA (Red)
```tsx
className="bg-red-600 text-white hover:bg-red-700 font-semibold shadow-md"
```
- **Use Cases**: Main actions, sign up, start learning, premium upgrade

#### Secondary Button (Blue)
```tsx
className="text-[#1c9af1] hover:text-red-600"
```
- **Use Cases**: View all, explore more, secondary actions

#### Ghost Button (Transparent)
```tsx
className="text-white hover:bg-white/10 border-2 border-white/30"
```
- **Use Cases**: Secondary actions on colored backgrounds

### Cards

#### Course Card
- **Background**: White (`bg-white`)
- **Border**: Light border
- **Shadow**: Subtle shadow with hover effect
- **Padding**: `p-4` or `p-6`
- **Hover**: `hover:shadow-xl` scale effect

#### Stats Card
- **Text Size**: `text-6xl` for numbers
- **Color**: Sky blue (`#1c9af1`)
- **Animation**: Scale on hover (`group-hover:scale-110`)
- **Underline**: Red bar that expands on hover

### Hero Sections

#### Landing Page Hero
- **Background**: Blue gradient (`from-[#1580d1] via-[#1c9af1] to-[#50b8f5]`)
- **Text**: White with glow effect
- **Layout**: Two columns (text + image)
- **Height**: `min-h-screen`
- **Decorative Element**: Subtle red/white flag stripes (5% opacity)

#### Dashboard Hero
- **Background**: Blue gradient (`from-[#1580d1] to-[#1c9af1]`)
- **Shape**: Rounded (`rounded-2xl`)
- **Padding**: `p-8`
- **Text**: White

### Navigation

#### Landing Header
- **Background**: White with blur (`bg-white/95 backdrop-blur-sm`)
- **Shadow**: Subtle shadow (`shadow-sm`)
- **Fixed**: `fixed top-0` full width
- **Height**: `h-20`

#### Dashboard Sidebar
- **Background**: Muted (`bg-muted`)
- **Width**: `w-64`
- **Position**: `fixed left-0`

---

## ✨ Visual Effects

### Shadows
- **Subtle**: `shadow-sm`
- **Default**: `shadow-md`
- **Elevated**: `shadow-xl`
- **Hero**: `shadow-2xl`

### Gradients

#### Blue Gradient (Primary)
```css
bg-gradient-to-br from-[#1580d1] via-[#1c9af1] to-[#50b8f5]
```

#### Light to White
```css
bg-gradient-to-b from-slate-50 to-white
```

### Glow Effects
- **White Glow**: Used on hero headings
```tsx
<span className="relative inline-block">
  <span className="relative z-10 text-white">[TEXT]</span>
  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
</span>
```

### Hover Animations
- **Scale**: `hover:scale-105` (components)
- **Duration**: `transition-transform duration-500`
- **Timing**: `ease-out`

### Patriotic Decorations
- **Flag Stripes**: Red/white alternating stripes at 5% opacity
- Used in hero sections to subtly evoke American flag symbolism

---

## 📄 Completed Pages

### 1. Landing Page (`/`)
- ✅ Hero section with Tedchay image
- ✅ Stats section
- ✅ Features section
- ✅ Footer
- ✅ Header navigation
- **Status**: Complete with patriotic blue theme

### 2. Courses Dashboard (`/courses`)
- ✅ Blue gradient hero
- ✅ Course grid with 4 courses
- ✅ Dashboard sidebar
- ✅ Dashboard header with Premium button
- **Status**: Complete with new branding

### 3. About Page (`/tentang`)
- ✅ Tedchay's story and journey
- ✅ Timeline of milestones
- ✅ Credentials and achievements
- ✅ Mission section
- **Status**: Complete with gotoamerica branding

### 4. Pricing Page (`/harga`)
- ✅ 4 pricing tiers
- ✅ Animated pricing cards
- ✅ Comparison table
- ✅ FAQ section
- **Status**: Complete (may need color theme update)

### 5. Course Detail Page (`/courses/[id]`)
- ⚠️ Needs review for new color scheme
- Has course video player, tabs, content sidebar

---

## 🎯 Design Principles Applied

### 1. Patriotic Symbolism
- Blue represents American sky and opportunity
- Red for action and courage (CTA buttons)
- White for clarity and new beginnings
- Subtle flag stripe patterns

### 2. Trust & Professionalism
- Clean, spacious layouts
- Professional color palette
- Authentic imagery (Tedchay's real photos)
- Clear information hierarchy

### 3. Accessibility
- High contrast text (white on blue, dark on white)
- Clear CTA buttons in red
- Readable font sizes
- Proper spacing

### 4. Mobile-First
- Responsive grid systems
- Touch-friendly button sizes
- Collapsible navigation
- Adaptive layouts

### 5. Indonesian Audience Focus
- Bahasa Indonesia content (with selective English terms)
- IDR currency formatting
- Relevant course topics (immigration, visa, etc.)
- Cultural context awareness

---

## 🔤 Content Style Guide

### Language
- **Primary**: Bahasa Indonesia
- **Preserved English Terms**:
  - "American Dream"
  - "DV Lottery"
  - "Green Card"
  - "Social Security Number (SSN)"

### Tone
- Professional yet approachable
- Encouraging and motivational
- Based on real experience
- Honest and transparent

### Button Labels (Indonesian)
- "Daftar Gratis" (Register Free)
- "Mulai Belajar" (Start Learning)
- "Lihat Semua" (View All)
- "Masuk" (Login)
- "Premium" (Premium)
- "Tonton Cerita Tedchay" (Watch Tedchay's Story)

---

## 📱 Component Inventory

### Completed & Styled Components
1. ✅ `landing-header.tsx` - White header with red CTA
2. ✅ `landing-hero.tsx` - Blue gradient hero with Tedchay image
3. ✅ `landing-stats.tsx` - Blue stats with red underlines
4. ✅ `landing-footer.tsx` - Light footer with gotoamerica branding
5. ✅ `dashboard-sidebar.tsx` - Sidebar with gotoamerica logo
6. ✅ `dashboard-header.tsx` - Header with red Premium button
7. ✅ `course-card.tsx` - Course card with IDR formatting
8. ⚠️ Other dashboard components may need theme updates

---

## 🎨 Asset Guidelines

### Images
- **Hero Image**: `/tedchay-hero.png` (650px × 750px container)
- **Image Fit**: `object-contain` for maintaining aspect ratio
- **External Sources**: Configured for `img.youtube.com` and `i.imgur.com`

### Icons
- **Library**: Lucide React
- **Size**: Usually `w-4 h-4` or `w-5 h-5`
- **Color**: Inherit from parent or specified blue/red

### Badges
- **DV Lottery Winner**: Red background, white text, rotated
- **Course Tags**: Various colors (blue for popular, red for free, etc.)
- **Premium Badge**: Crown icon with red button

---

## 🚀 Next Steps / To Be Implemented

### Pages Needing Updates
1. ⚠️ Course detail page - Apply new blue color scheme
2. ⚠️ Pricing page - Verify color scheme consistency
3. ❌ Login/Register pages - Not yet implemented
4. ❌ User profile - Not yet implemented
5. ❌ Payment flow - Not yet implemented

### Features to Add
- [ ] Course video player improvements
- [ ] Interactive course progress
- [ ] User authentication
- [ ] Course enrollment system
- [ ] Payment integration

---

## 🛠 Technical Implementation Notes

### CSS Framework
- **Tailwind CSS v4**
- Custom theme defined in `globals.css`
- OKLCH color space for better color handling

### Next.js Version
- **Version**: 15.2.4
- **React**: 19
- **Router**: App Router

### Color System
- Primary colors defined in CSS variables
- OKLCH values for precise color control
- Dark mode variants prepared

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 📋 Quick Reference

### Most Used Classes
```tsx
// Containers
"container mx-auto px-6 lg:px-16"

// Buttons (Red CTA)
"bg-red-600 text-white hover:bg-red-700 font-semibold"

// Buttons (Blue)
"text-[#1c9af1] hover:text-red-600"

// Hero Background
"bg-gradient-to-br from-[#1580d1] via-[#1c9af1] to-[#50b8f5]"

// Card
"bg-white rounded-2xl shadow-md hover:shadow-xl"

// Text Glow (Hero)
"relative z-10 text-white" + blur backdrop div
```

### Color Quick Reference
```css
/* Primary Blue */
#1c9af1

/* CTA Red */
#dc2626

/* Dark Text */
#1E293B

/* Light Background */
#F8FAFC
```

---

**Document Status**: ✅ Current and accurate as of last update
**Maintained by**: gotoamerica Development Team
