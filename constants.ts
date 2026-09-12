// Single source of truth for business facts referenced across the site.
// Anything marked TODO should be confirmed by Captain Jack before launch —
// see README.md "Pre-launch checklist" for the full list.

export const BUSINESS = {
  name: "Northern Pursuit Sport Fishing",
  slogan: "Fish Hard. Explore North.",
  captain: "Captain Jack Votaw",
  phone: "734-660-4429",
  phoneHref: "tel:+17346604429",
  email: "north.pursuit.sportfishllc@gmail.com",
  instagramHandle: "@northernpursuit.sportfish",
  instagramUrl: "https://www.instagram.com/northernpursuit.sportfish/",
  regions: [
    "Frankfort, Michigan",
    "Traverse City, Michigan",
    "East Grand Traverse Bay",
    "West Grand Traverse Bay",
    "Betsie River",
    "Pere Marquette River",
  ],
};

export const TRUST_LINE =
  "USCG-Licensed Captain • Premium Gear Provided • Fish Cleaned and Bagged";

export const INTRO_COPY =
  "Northern Pursuit Sport Fishing delivers private, fully equipped fishing adventures across Northern Michigan's most productive waters. From vertical jigging for lake trout and cisco on Grand Traverse Bay to trolling the waters off Frankfort and battling powerful fall Chinook from a drift boat, every trip is built around current conditions and the best opportunity for an unforgettable day on the water.";

export const LAUNCH_LOCATION_POLICY =
  "Launch locations vary based on seasonal fish movement, weather, water conditions, and current fishing activity. Captain Jack will text you three days before your charter with the exact meeting location, launch details, confirmed arrival time, and clear instructions for finding the boat and meeting your captain.";

export const LICENSE_NOTE =
  "Fishing-license requirements and arrangements will be confirmed with each party before the trip."; // TODO: Captain Jack to verify current MI DNR requirements before publishing stronger language.

export const GRATUITY_NOTE = "Gratuities are always appreciated but never required.";

export const CANCELLATION_POLICY = `
- If the captain cancels because of unsafe weather, water conditions, mechanical problems, or another captain-side issue, the customer may reschedule or receive a full deposit refund.
- If the customer cancels at least 14 days before the scheduled charter, the deposit may be refunded or transferred to another available date.
- If the customer cancels fewer than 14 days before the charter, the deposit is nonrefundable.
- A no-show forfeits the deposit.
- The captain has final authority over weather and safety decisions.
- Light rain, clouds, wind within safe operating limits, or changing fishing conditions do not automatically constitute a cancellation.
- Fish activity and catches cannot be guaranteed.
`.trim(); // Editable from /admin/settings — this is starting language, not final legal copy.

export const BRING_LIST = [
  "Weather-appropriate clothing (dress in layers — conditions near the water change quickly)",
  "Rain gear",
  "Polarized sunglasses",
  "Sunscreen",
  "Hat",
  "Valid identification when required",
  "Any personal medication",
  "Cooler to transport cleaned fish home",
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/charters", label: "Charters" },
  { href: "/book", label: "Availability & Book" },
  { href: "/about", label: "About" },
  { href: "/reports", label: "Fishing Reports" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Package data mirrors prisma/seed.ts — kept here too so pages can render
// without a live database during design/dev.
export const PACKAGES = [
  {
    slug: "morning-trolling",
    name: "Morning Trolling Charter",
    boat: "Lund HG",
    priceCents: 90000,
    depositCents: 15000,
    balanceCents: 75000,
    durationLabel: "6 hours",
    startTime: "5:30 AM",
    endTime: "11:30 AM",
    maxGuests: 4,
    region: "Frankfort (location set by current conditions)",
    targetSpecies: "Salmon and other seasonally available Great Lakes species",
    method: "Trolling",
    seasonNote: "Availability varies by season — see the calendar for open dates.",
  },
  {
    slug: "evening-trolling",
    name: "Evening Trolling Charter",
    boat: "Lund HG",
    priceCents: 80000,
    depositCents: 15000,
    balanceCents: 65000,
    durationLabel: "Evening (end time TBD)",
    startTime: "5:00 PM",
    endTime: null, // TODO: Captain Jack to finalize
    maxGuests: 4,
    region: "Frankfort (location set by current conditions)",
    targetSpecies: "Salmon and other seasonally available Great Lakes species",
    method: "Trolling",
    seasonNote: "Availability varies by season — see the calendar for open dates.",
  },
  {
    slug: "bay-morning-jigging",
    name: "Grand Traverse Bay Morning Jigging Charter",
    boat: "Lund HG",
    priceCents: 60000,
    depositCents: 15000,
    balanceCents: 45000,
    durationLabel: "Hours TBD",
    startTime: null, // TODO: Captain Jack to finalize
    endTime: null,
    maxGuests: 4,
    region: "East or West Grand Traverse Bay (captain selects based on conditions)",
    targetSpecies: "Primarily lake trout and cisco, with occasional salmon",
    method: "Vertical jigging",
    seasonNote: "Availability varies by season — see the calendar for open dates.",
  },
  {
    slug: "bay-evening-jigging",
    name: "Grand Traverse Bay Evening Jigging Charter",
    boat: "Lund HG",
    priceCents: 50000,
    depositCents: 15000,
    balanceCents: 35000,
    durationLabel: "4 hours",
    startTime: "3:00 PM",
    endTime: "7:00 PM",
    maxGuests: 4,
    region: "East or West Grand Traverse Bay (captain selects based on conditions)",
    targetSpecies: "Primarily lake trout and cisco, with occasional salmon",
    method: "Vertical jigging",
    seasonNote: "Availability varies by season — see the calendar for open dates.",
  },
  {
    slug: "fall-river-chinook",
    name: "Fall River Chinook Charter",
    boat: "Drift Boat",
    priceCents: 60000,
    depositCents: 15000,
    balanceCents: 45000,
    durationLabel: "8 hours",
    startTime: "6:00 AM",
    endTime: "2:00 PM",
    maxGuests: 2,
    region: "Betsie River or Pere Marquette River (depending on season and conditions)",
    targetSpecies: "Fall Chinook salmon",
    method: "River drift fishing",
    seasonNote: "Fall season only — see the calendar for open dates.",
  },
] as const;

export const INCLUDED_ITEMS = [
  "Private guided fishing trip",
  "Rods and reels",
  "Tackle and bait",
  "Professional fishing equipment",
  "Required onboard safety equipment",
  "Full lunch, snacks, bottled water, and beverages",
  "Fish cleaning and bagging",
  "Guidance for beginners and a professional pace for experienced anglers",
];

export const GALLERY_CATEGORIES = [
  "Recent Catches",
  "Lake Trout",
  "Cisco",
  "Salmon",
  "River Fishing",
  "Grand Traverse Bay",
  "Frankfort",
];
