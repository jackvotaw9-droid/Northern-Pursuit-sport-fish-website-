# Suggested existing-homepage adjustments (do not overwrite the homepage)

Apply to the **actual live site's** root page only after you locate its source:

```ts
export const metadata = {
  title: "Traverse City Fishing Charters | Northern Pursuit Sportfishing",
  description: "Explore private Northern Michigan fishing trips with Northern Pursuit Sportfishing. Lake trout jigging on Grand Traverse Bay and salmon trolling out of Frankfort."
};
```

If there is already an exported metadata object, merge fields rather than adding a second export. Preserve video, hero, branding, date-picker, booking logic, and existing availability/blocked dates.

Naturally link from homepage trip cards to:
- `/charters/grand-traverse-bay-lake-trout-jigging`
- `/charters/frankfort-salmon-charters`
- `/charters/grand-traverse-bay-cisco-jigging`

Place remaining specialty-trip links where relevant, not stuffed into the hero.
