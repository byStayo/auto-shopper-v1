# Sprint 1: Foundation & "Liquid Glass" Architecture

## Objective
Establish the project structure and implement the core "Liquid Glass" navigation system that serves as the foundation for the "Auto Shopper Based on Closet" experience.

## Phase 1: Infrastructure & App Shell
- [ ] Initialize TanStack Start project with Tailwind CSS.
- [ ] Implement `AppShell.tsx` with `viewport-fit=cover` and global styles to prevent Safari auto-zoom.
- [ ] Set up the theme configuration for glassmorphism (refraction, backdrop blur, subtle glows).

## Phase 2: Liquid Glass Command Dock (Core UI)
- [ ] Implement `CommandDock.tsx`:
    - Floating translucent glass bar.
    - Navigation state (Home, Closet, Style, Shop, Gifts).
    - Transition state (Horizontal swipe to morph into AI text input).
    - Haptic feedback integration (vibration API).
- [ ] `DockInput.tsx`: AI command field with microphone and send actions.
- [ ] `HistoryPeek.tsx`: Vertical drag interaction to reveal recent sessions.

## Phase 3: Closet & Style Core
- [ ] `ClosetGrid.tsx`: Visual grid for scanned wardrobe items.
- [ ] `StyleIntelligence.ts`: Placeholder service for style matching and outfit building logic.
- [ ] `ProductCard.tsx`: Glassmorphic product display cards with "Try on Me" placeholders.

## Phase 4: Hardware Acceleration & Performance
- [ ] Audit all animations to use `translate3d` and opacity.
- [ ] Ensure all form elements (inputs) have minimum 16px font size.

## Architectural Layout
- `/src/components/ui/dock/`: CommandDock and its sub-states.
- `/src/components/closet/`: Closet management and scanning UI.
- `/src/components/shop/`: Shopify catalog integration and feed.
- `/src/hooks/`: `useHaptics.ts`, `useLiquidDock.ts`.
- `/src/styles/`: Global glassmorphism and hardware-acceleration utils.
