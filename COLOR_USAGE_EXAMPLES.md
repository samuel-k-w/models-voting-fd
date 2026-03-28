# Color System Usage Examples
## Real-Time Voting Platform

Quick reference for applying the color system to components.

---

## Button Components

### Primary Button (Voting Actions)
```jsx
<button className="
  bg-primary text-white
  hover:bg-primary-hover hover:shadow-glow-sm hover:-translate-y-1
  active:bg-primary-active active:translate-y-0
  disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed
  transition-all duration-150 ease-smooth
  px-6 py-3 rounded-lg font-medium
">
  Cast Vote
</button>
```

### Outline Button (Secondary)
```jsx
<button className="
  border-2 border-primary text-primary
  hover:bg-primary-light hover:border-primary-hover
  active:bg-primary-100 active:border-primary-active
  disabled:border-border disabled:text-muted-foreground
  transition-all duration-150
  px-6 py-3 rounded-lg font-medium
">
  View Details
</button>
```

### Danger Button (Delete/Destructive)
```jsx
<button className="
  bg-error text-white
  hover:bg-error-hover hover:shadow-lg
  disabled:bg-muted disabled:text-muted-foreground
  transition-all duration-150
  px-6 py-3 rounded-lg font-medium
">
  Delete Model
</button>
```

---

## Card Components

### Default Card
```jsx
<div className="
  bg-background border border-border rounded-xl
  shadow-sm
  hover:border-border-strong hover:shadow-md transition-all
  p-6
">
  {/* content */}
</div>
```

### Elevated Card
```jsx
<div className="
  bg-background border border-border rounded-xl
  shadow-md
  p-6
">
  {/* content */}
</div>
```

### Selected Voting Card
```jsx
<div className="
  bg-primary-light border-2 border-primary
  shadow-md
  ring-4 ring-primary-100
  rounded-2xl
  p-6
">
  {/* content */}
</div>
```

---

## Input Fields

### Standard Input
```jsx
<input
  className="
    w-full bg-background border border-border
    text-foreground placeholder:text-foreground-tertiary
    focus:border-primary focus:shadow-[0_0_0_3px_var(--primary-light)]
    focus:outline-none
    disabled:bg-muted disabled:border-border disabled:text-muted-foreground
    transition-all duration-150
    px-4 py-2.5 rounded-lg
  "
  type="text"
  placeholder="Enter text..."
/>
```

### Input with Error
```jsx
<input
  className="
    w-full bg-background border-2 border-error
    shadow-[0_0_0_3px_var(--error-light)]
    text-foreground
    focus:outline-none
    px-4 py-2.5 rounded-lg
  "
  type="text"
  placeholder="Invalid input..."
/>
```

---

## Badge & Label Components

### Success Badge
```jsx
<span className="
  inline-flex items-center gap-2
  bg-success-light text-success-text
  border border-success
  px-3 py-1 rounded-full
  text-sm font-medium
">
  ✓ Verified
</span>
```

### Error Badge
```jsx
<span className="
  inline-flex items-center gap-2
  bg-error-light text-error-text
  border border-error
  px-3 py-1 rounded-full
  text-sm font-medium
">
  ✗ Failed
</span>
```

### Warning Badge
```jsx
<span className="
  inline-flex items-center gap-2
  bg-warning-light text-warning-text
  border border-warning
  px-3 py-1 rounded-full
  text-sm font-medium
">
  ⚠ Warning
</span>
```

### Info Badge
```jsx
<span className="
  inline-flex items-center gap-2
  bg-info-light text-info-text
  border border-info
  px-3 py-1 rounded-full
  text-sm font-medium
">
  ℹ Info
</span>
```

---

## Alert/Notification Components

### Success Alert
```jsx
<div className="
  bg-success-light border border-success
  text-success-text
  rounded-lg p-4
">
  <p className="font-medium">Success!</p>
  <p className="text-sm mt-1">Your vote has been recorded.</p>
</div>
```

### Error Alert
```jsx
<div className="
  bg-error-light border border-error
  text-error-text
  rounded-lg p-4
">
  <p className="font-medium">Error</p>
  <p className="text-sm mt-1">Something went wrong. Please try again.</p>
</div>
```

### Warning Alert
```jsx
<div className="
  bg-warning-light border border-warning
  text-warning-text
  rounded-lg p-4
">
  <p className="font-medium">Warning</p>
  <p className="text-sm mt-1">This action cannot be undone.</p>
</div>
```

### Info Alert
```jsx
<div className="
  bg-info-light border border-info
  text-info-text
  rounded-lg p-4
">
  <p className="font-medium">Information</p>
  <p className="text-sm mt-1">The voting round will end in 2 hours.</p>
</div>
```

---

## Leaderboard & Medal Components

### Rank #1 Position
```jsx
<div className="
  bg-rank-1-gold-light border-2 border-rank-1-gold
  text-rank-1-gold
  rounded-xl p-4
  shadow-glow-md
">
  <p className="text-3xl font-bold">🏆</p>
  <p className="font-bold text-lg">Model Name</p>
  <p className="text-sm">10,450 votes</p>
</div>
```

### Rank #2 Position
```jsx
<div className="
  bg-rank-2-silver-light border-2 border-rank-2-silver
  text-rank-2-silver
  rounded-xl p-4
">
  <p className="text-2xl font-bold">🥈</p>
  <p className="font-bold">Model Name</p>
  <p className="text-sm">9,320 votes</p>
</div>
```

### Rank #3 Position
```jsx
<div className="
  bg-rank-3-bronze-light border-2 border-rank-3-bronze
  text-rank-3-bronze
  rounded-xl p-4
">
  <p className="text-2xl font-bold">🥉</p>
  <p className="font-bold">Model Name</p>
  <p className="text-sm">8,150 votes</p>
</div>
```

---

## Typography Classes

### Primary Text (Body)
```jsx
<p className="text-foreground text-base">
  This is the primary body text color.
</p>
```

### Secondary Text (Helper)
```jsx
<p className="text-foreground-secondary text-sm">
  This is secondary/helper text.
</p>
```

### Tertiary Text (Muted)
```jsx
<p className="text-foreground-tertiary text-xs">
  This is muted/disabled text.
</p>
```

### Semantic Text
```jsx
<p className="text-success-text font-medium">Success message</p>
<p className="text-error-text font-medium">Error message</p>
<p className="text-warning-text font-medium">Warning message</p>
<p className="text-info-text font-medium">Info message</p>
```

---

## Loading & Skeleton States

### Skeleton Loader
```jsx
<div className="
  bg-skeleton-base
  animate-skeleton-shine
  rounded-lg
  w-full h-48
"/>
```

### Pulse Loading State
```jsx
<div className="
  animate-pulse-subtle
  bg-primary-light
  rounded-lg p-4
">
  Loading...
</div>
```

---

## Voting Card (Model Selection)

### Unselected State
```jsx
<div className="
  border-2 border-border bg-background
  hover:border-primary hover:shadow-md
  rounded-2xl p-6
  transition-all duration-200
">
  {/* Model content */}
</div>
```

### Selected State
```jsx
<div className="
  border-2 border-primary bg-primary-light
  ring-4 ring-primary-100
  shadow-md
  rounded-2xl p-6
">
  {/* Model content */}
</div>
```

### Disabled State
```jsx
<div className="
  border-2 border-border bg-background opacity-50
  rounded-2xl p-6
  cursor-not-allowed
">
  {/* Model content */}
</div>
```

---

## Color Utility Classes (Tailwind)

Quick reference for common color usage:

```jsx
// Text colors
className="text-foreground"              // Primary text (#0f172a)
className="text-foreground-secondary"    // Secondary text (#475569)
className="text-foreground-tertiary"     // Muted text (#64748b)

// Background colors
className="bg-background"                // White
className="bg-background-secondary"      // Light slate
className="bg-primary"                   // Blue button color
className="bg-success"                   // Success green
className="bg-error"                     // Error red
className="bg-warning"                   // Warning orange
className="bg-info"                      // Info blue

// Border colors
className="border border-border"         // Default border
className="border border-border-strong"  // Emphasized border
className="border-2 border-primary"      // Primary border

// Hover effects
className="hover:bg-primary-hover"       // Primary hover color
className="hover:border-border-strong"   // Border hover

// Shadows
className="shadow-sm"                    // Small shadow
className="shadow-md"                    // Medium shadow
className="shadow-lg"                    // Large shadow
className="shadow-glow-md"               // Glow effect

// Transitions
className="transition-all duration-150"  // Fast button transition
className="transition-all duration-200"  // Standard transition
```

---

## Best Practices

### ✓ DO
- Use Primary (#2563eb) for main voting button
- Apply hover:shadow-glow-sm for interactive elements
- Use semantic colors (success, error, warning) consistently
- Test contrast ratios in DevTools
- Include disabled states for all interactive elements
- Use transition-all duration-150 for button interactions

### ✗ DON'T
- Use multiple colors in a single component
- Forget disabled state styling
- Mix outline and filled buttons in the same section
- Use low-contrast text (always check AA+ compliance)
- Animate transitions when user prefers reduced motion
- Apply color only (always include text/icons for meaning)

---

**Version:** 1.0  
**Last Updated:** 2026-03-28
