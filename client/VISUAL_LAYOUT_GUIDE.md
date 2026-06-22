# SmartSpend AI - Visual Layout Guide

## 📱 Mobile Layout

```
┌──────────────────────────────────────┐
│                                      │
│  Hey Aryan                           │  ← Hero Section
│  [Chat Bubbles]                      │     - AI personality
│  [Start Journey Button]              │     - Rotating insights
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Cash Balance                         │  ← Financial Overview
│ ₹42,000                              │     - Large balance card
│ [➖ Add Expense]                     │     - Quick action pills
│ [➕ Add Income]                      │
│ [✨ Ask AI]                          │
│                                      │
├──────────────────────────────────────┤
│ [Income] [Expenses] [Savings]        │  ← Overview Cards
│  ₹85K     ₹32K       ₹53K            │
├──────────────────────────────────────┤
│                                      │
│ Your Financial Insights              │
│                                      │  ← Bento Analytics
│ [🧠 AI Health: 8.2/10]              │     - 6 cards
│ [🎯 Savings Goal: 68%]              │     - Staggered layout
│ [🔥 Streak: 8 days]                 │     - Emoji icons
│ [📊 Budget Health: 4/6]             │
│ [📉 Spending: ↓12%]                 │
│ [🔮 Forecast: ₹38K]                 │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Financial Goals                      │  ← Goals Section
│                                      │     - 4 goal cards
│ [✈️ Vacation]   [💻 Laptop]         │     - Progress bars
│ [🏠 Home]       [🚨 Emergency]      │     - Saved/Remaining
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Recent Activity                      │  ← Activity Feed
│ [Filters: All | Expense | Income]   │     - Transaction list
│                                      │     - Activity format
│ 🍔 Swiggy          ₹420             │     - No tables
│ Yesterday                            │
│                                      │
│ 💳 Salary Deposit   ₹85,000         │
│ 2 days ago                           │
│                                      │
│ [View All Transactions →]            │
│                                      │
├──────────────────────────────────────┤
│                                      │
│                                      │  ← Spacer for dock
│                                      │
├──────────────────────────────────────┤
│  📊  💳  💰  🎯  ✨                │  ← Bottom Dock
│  Dashboard Transactions Budgets     │     - Floating
│  Goals AI                           │     - Glassmorphic
└──────────────────────────────────────┘
```

## 💻 Desktop Layout

```
┌──────────────────┬──────────────────────────────────────────────────────┐
│                  │                                                      │
│ SmartSpend AI    │ Hey Aryan                                            │
│ 💚 AI Financial  │ [Chat Bubbles]                                       │
│    OS            │ [Start Journey Button]                               │
│                  ├──────────────────────────────────────────────────────┤
│ 📊 Dashboard     │                                                      │
│ 💳 Transactions  │ Cash Balance                                         │
│ 💰 Budgets       │ ₹42,000                                              │
│ 🎯 Goals         │ [Add Expense] [Add Income] [Ask AI]                 │
│ ✨ AI Center     │                                                      │
│                  │ [Income]     [Expenses]    [Savings]                 │
│ ⚙️ Settings      │ ₹85,000      ₹32,000      ₹53,000                   │
│                  ├──────────────────────────────────────────────────────┤
│                  │                                                      │
│                  │ Your Financial Insights                              │
│                  │                                                      │
│                  │ [🧠 AI Health]    [🎯 Savings Goal] [🔥 Streak]    │
│                  │ [📊 Budget]       [📉 Spending]     [🔮 Forecast] │
│                  │                                                      │
│                  ├──────────────────────────────────────────────────────┤
│                  │                                                      │
│                  │ Financial Goals                                      │
│                  │                                                      │
│                  │ [✈️ Vacation]  [💻 Laptop]  [🏠 Home] [🚨 Emerg] │
│                  │                                                      │
│                  ├──────────────────────────────────────────────────────┤
│                  │                                                      │
│                  │ Recent Activity                                      │
│                  │                                                      │
│                  │ [Filters] 🍔 Swiggy        ₹420    [Badge]         │
│                  │           💳 Salary        ₹85,000 [Badge]         │
│                  │           🚗 Uber          ₹250    [Badge]         │
│                  │           📱 Netflix       ₹199    [Badge]         │
│                  │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘

Sidebar Width: 16rem (256px)
Main Content: Max 1600px width
Generous Whitespace: 24px-48px gaps
```

## 🎨 Component Hierarchy

```
Dashboard
├── BottomNavigation
│   ├── Mobile Dock (Fixed bottom)
│   │   └── Nav items with icons
│   └── Desktop Sidebar (Fixed left)
│       ├── Logo/Branding
│       ├── Nav items
│       └── Settings
│
├── Main Content
│   ├── HeroSection
│   │   ├── Greeting (Display font)
│   │   ├── Chat bubbles
│   │   ├── CTA button
│   │   └── Scroll indicator
│   │
│   ├── FinancialOverviewCards
│   │   ├── Large balance card
│   │   │   ├── Balance value
│   │   │   └── Action pills
│   │   └── Three cards
│   │       ├── Income card
│   │       ├── Expenses card
│   │       └── Savings card
│   │
│   ├── BentoAnalytics
│   │   ├── Title section
│   │   └── Grid layout
│   │       ├── AI Health (2x2)
│   │       ├── Savings Goal
│   │       ├── Streak
│   │       ├── Budget
│   │       ├── Spending
│   │       └── Forecast
│   │
│   ├── GoalsSection
│   │   ├── Header + Create button
│   │   ├── Goal cards (4)
│   │   │   ├── Progress bar
│   │   │   └── Stats
│   │   └── View All link
│   │
│   └── ActivityFeed
│       ├── Header + Filters
│       ├── Activity list
│       │   └── Transaction items
│       └── View All link
```

## 🎬 Responsive Breakpoints

```
Mobile
├─ 320px (min)
├─ 640px (max)
└─ Layout: Single column, full width, bottom dock

Tablet
├─ 768px (min)
├─ 1024px (max)
└─ Layout: 2 columns, dock still visible

Desktop
├─ 1024px (min)
├─ 1600px (content max)
└─ Layout: 3+ columns, sidebar navigation
```

## 🎨 Color Distribution

```
Primary Background: #F3F8F2
├─ Body background
├─ Page background
└─ Base of all layouts

Accent Color: #399E5A
├─ Primary buttons
├─ Income/Savings values
├─ Success badges
├─ Progress bars
└─ Active states

Text Primary: #303633
├─ Headlines
├─ Important text
└─ Headings

Text Secondary: #5A5E5C
├─ Body text
├─ Descriptions
└─ Less important info

White: #FFFFFF
├─ Card backgrounds
├─ Layered surfaces
└─ Content containers
```

## 🎬 Animation Timeline

```
Page Load:
─────────
0ms   - Fade in
400ms - Stagger items in
      - HeroSection fades in
      - Cards slide up
      - Lists animate sequentially

User Interaction:
─────────────────
Hover     - Card lifts with shadow
Click     - Button scales
Filter    - Items cross-fade
Scroll    - Parallax on hero

Continuous:
────────────
Particles - Subtle movement
Chat      - Rotate every 8s
Indicators - Pulse and glow
```

## 📐 Spacing Grid

```
Vertical Spacing (between sections):
┌─────────────────────────────┐
│ Hero Section                │
│ (min-h: screen)             │
│                             │
├─────────────────────────────┤  ↕ 80px (4xl)
│ Financial Overview          │
│ (space-y: 48px)             │
├─────────────────────────────┤  ↕ 80px
│ Analytics                   │
│ (space-y: 48px)             │
├─────────────────────────────┤  ↕ 80px
│ Goals                       │
│ (space-y: 48px)             │
├─────────────────────────────┤  ↕ 80px
│ Activity                    │
│ (space-y: 48px)             │
└─────────────────────────────┘

Horizontal Spacing (cards):
┌─────────────────────────────┐
│ Container (max-width: 1600px) │
│ Padding: 32px (lg)           │
│                              │
│ ┌────────────┐  ┌──────────┐ │  ↔ Gap: 24px (lg)
│ │   Card 1   │  │  Card 2  │ │
│ └────────────┘  └──────────┘ │
│                              │
└─────────────────────────────┘
```

## 🔲 Component Dimensions

```
Hero Section:
- min-height: 100vh
- Padding: 96px vertical (6xl)

Card Size:
- Padding: 24px (lg) mobile, 32px (xl) desktop
- Border radius: 32px (2xl)
- Min height: auto (content-driven)

Buttons:
- Padding: 8px 24px (sm lg)
- Height: 40px (auto with padding)
- Border radius: 9999px (pill)

Icons:
- Size: 24px (typical)
- Spacing: 8px-16px from text

Text:
- Hero: clamp(2.5rem, 8vw, 4rem)
- Title: clamp(1.875rem, 5vw, 3rem)
- Body: 1rem base

Navigation:
- Mobile dock height: 72px
- Desktop sidebar width: 256px
```

## 🎯 Content Width

```
Mobile (< 768px):
- Full width - 16px padding
- Max width: 100%

Tablet (768px - 1024px):
- Full width - 32px padding
- Max width: 768px

Desktop (> 1024px):
- Full width - 32px padding
- Max width: 1600px
- Sidebar: 256px
```

## 📦 Box Model

```
All elements use border-box:

┌─────────────────┐
│     Margin      │
│ ┌─────────────┐ │
│ │   Border    │ │
│ │ ┌─────────┐ │ │
│ │ │ Padding │ │ │
│ │ │ ┌─────┐ │ │ │
│ │ │ │Content│ │ │ │
│ │ │ └─────┘ │ │ │
│ │ └─────────┘ │ │
│ └─────────────┘ │
└─────────────────┘

Typical card:
- Border: 0 (no border)
- Padding: 24px (lg)
- Background: white + shadow
- Radius: 32px (2xl)
```

---

This visual guide helps understand the SmartSpend AI layout structure at all breakpoints and in all contexts.
