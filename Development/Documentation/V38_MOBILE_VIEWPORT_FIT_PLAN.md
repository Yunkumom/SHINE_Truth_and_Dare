# V38 Mobile Viewport Fit Plan / V38 手機單頁適配計畫

1. Fork immutable v37 into `Development/Source/Main-App-v38/`.
2. Add failing viewport, overflow, adjustment-range, and grid contracts.
3. Read `window.visualViewport` and uniformly scale the 430 × 932 canvas on mobile.
4. Keep revealed artwork controls bounded by left and right canvas insets.
5. Change artwork adjustment to a draft-based Cancel/Save workflow with extended movement and zoom.
6. Run unit/CSS tests, typecheck, lint, production build, release generation, and repository validation.
7. Publish immutable standalone v38 and Public Web v21, then advance GitHub Pages.
