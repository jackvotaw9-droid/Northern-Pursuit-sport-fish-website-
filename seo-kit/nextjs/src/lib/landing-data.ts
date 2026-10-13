export type FAQItem = { question: string; answer: string };

export type SeoLanding = {
  path: string;
  heading: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  location: string;
  season: string;
  tripOptions: string[];
  paragraphs: string[];
  highlights: string[];
  faqs: FAQItem[];
  schemaKind?: "service" | "none";
  schemaPrice?: number;
};

export const landingPages = {
  lakeTrout: {
    path: "/charters/grand-traverse-bay-lake-trout-jigging",
    heading: "Grand Traverse Bay Lake Trout Jigging Charters",
    title: "Grand Traverse Bay Lake Trout Jigging | Northern Pursuit",
    description: "Fish Grand Traverse Bay on a private lake trout jigging charter. Morning and PM trips with Northern Pursuit Sportfishing near Traverse City, Michigan.",
    eyebrow: "GRAND TRAVERSE BAY · LAKE TROUT",
    intro: "Work the water, watch the electronics, and feel the bite. Northern Pursuit runs private lake trout jigging trips on Grand Traverse Bay, with hands-on fishing for groups of up to four.",
    location: "Grand Traverse Bay, near Traverse City, Michigan",
    season: "April–September",
    tripOptions: [
      "Morning Lake Trout Jigging: 6 AM–11 AM (5 hours) · $700 per private boat",
      "PM Lake Trout Jigging: 3 PM–9 PM (6 hours) · $700 per private boat"
    ],
    paragraphs: [
      "Lake trout jigging is active fishing. Instead of waiting for a trolling rod to fire, you'll work a jig, adjust your presentation, and stay connected to what happens below the boat. Captain Jack uses electronics and daily conditions to decide where to fish and how to approach each drift.",
      "Grand Traverse Bay provides a completely different fishing experience from the open-water salmon trolling program. Whether you've jigged before or you're learning the technique for the first time, the trip is built around your crew and the day's conditions.",
      "The charter price covers your whole group, not each angler. Rods, tackle, bait, water and nonalcoholic drinks are included, and your catch can be cleaned and bagged after the trip."
    ],
    highlights: [
      "Private boat for 1–4 guests",
      "Morning and afternoon trip options",
      "Hands-on vertical jigging",
      "Launch details confirmed with Captain Jack",
      "$150 deposit after your date and trip are approved"
    ],
    faqs: [
      { question: "Do I need experience to jig for lake trout?", answer: "No. Captain Jack can walk beginners through the setup and technique while still giving experienced anglers room to fish their way." },
      { question: "Where do lake trout trips depart?", answer: "The launch is selected according to weather, conditions, and the fishing plan. Captain Jack confirms the meeting details with your group." },
      { question: "Is $700 the price per person?", answer: "No. The listed $700 price is for the entire private boat, with up to four guests." }
    ],
    schemaKind: "service",
    schemaPrice: 700
  },
  salmon: {
    path: "/charters/frankfort-salmon-charters",
    heading: "Frankfort Michigan Salmon Fishing Charters",
    title: "Frankfort Michigan Salmon Fishing Charters | Northern Pursuit",
    description: "Private Lake Michigan salmon trolling charters out of Frankfort, Michigan. Early-morning and evening salmon trips with Northern Pursuit Sportfishing.",
    eyebrow: "FRANKFORT · LAKE MICHIGAN",
    intro: "Head offshore from Frankfort for a private salmon trolling trip on Lake Michigan. Northern Pursuit offers early mornings and evening power-hour trips in the summer salmon season.",
    location: "Frankfort, Michigan · Lake Michigan",
    season: "July–September",
    tripOptions: [
      "Morning Salmon Trolling: depart 5:30 AM · $900 for the private boat",
      "Evening Power Hour Salmon Trolling: 5 PM–9 PM · $700 for the private boat"
    ],
    paragraphs: [
      "There's nothing quite like watching a Lake Michigan trolling rod load up. We set a spread for the conditions, keep working the water, and let each person aboard get involved when the bite comes. Target species and daily location depend on the time of year and conditions.",
      "The morning departure puts the crew on the water early. If your group would rather fish late in the day, the Evening Power Hour gives you a shorter window focused on the evening bite.",
      "Each outing is private for your group of up to four. Gear, tackle, bait and nonalcoholic drinks are provided, and your fish can be cleaned and bagged at the end of the trip."
    ],
    highlights: [
      "Morning and evening salmon trolling options",
      "1–4 guests on one private boat",
      "All standard fishing gear included",
      "Departures coordinated around conditions",
      "$150 booking deposit after Captain Jack confirms your date"
    ],
    faqs: [
      { question: "When is Frankfort salmon trolling available?", answer: "Northern Pursuit plans its Frankfort salmon trolling trips for July through September, with exact availability shown or confirmed when you request a date." },
      { question: "What time does the morning charter start?", answer: "The planned morning departure is 5:30 AM, with fishing underway as conditions allow." },
      { question: "Can beginners come salmon fishing?", answer: "Yes. Your group can learn how the trolling spread works, and Captain Jack will help everyone participate when a fish hits." }
    ],
    schemaKind: "service"
  },
  cisco: {
    path: "/charters/grand-traverse-bay-cisco-jigging",
    heading: "Grand Traverse Bay Cisco Jigging Trips",
    title: "Grand Traverse Bay Cisco Jigging | Northern Pursuit",
    description: "Explore late-fall cisco jigging on Grand Traverse Bay near Traverse City with a private Northern Pursuit Sportfishing trip.",
    eyebrow: "GRAND TRAVERSE BAY · LATE FALL",
    intro: "The season doesn't end when summer does. Join Northern Pursuit for a private cisco jigging trip on Grand Traverse Bay during the late-fall window.",
    location: "Grand Traverse Bay, Michigan",
    season: "Late October–mid November",
    tripOptions: [
      "Morning Cisco Jigging: $600 for the private boat",
      "Exact departure and return time confirmed for your date"
    ],
    paragraphs: [
      "Cisco fishing adds a different target and a different rhythm to the fall season. We use a jigging approach, keep an eye on electronics, and adapt to how fish are moving on the day of your trip.",
      "Late-fall conditions on Grand Traverse Bay can change quickly. Layers, rain gear, and flexible expectations make for a better day. The captain makes the final call on whether weather is safe for a trip.",
      "Trip pricing covers the whole boat for a party of up to four, with tackle, standard gear and nonalcoholic drinks included."
    ],
    highlights: [
      "Specialty late-fall jigging",
      "Private trips for 1–4 guests",
      "Equipment and tackle included",
      "Captain confirms exact hours and launch location",
      "$150 deposit after date approval"
    ],
    faqs: [
      { question: "When are cisco trips offered?", answer: "The planned season is late October through mid November, subject to safe conditions and fish movement." },
      { question: "Is the cisco trip a shared charter?", answer: "No. Northern Pursuit's trips are private, and the listed $600 is for your entire group of up to four." },
      { question: "What should I wear?", answer: "Bring warm layers and rain gear. Late-fall weather on the bay can feel substantially colder on the water." }
    ],
    schemaKind: "service",
    schemaPrice: 600
  },
  coho: {
    path: "/charters/platte-bay-coho-jigging",
    heading: "Platte Bay Coho Salmon Jigging Trips",
    title: "Platte Bay Coho Salmon Jigging | Northern Pursuit",
    description: "Ask about early-September Platte Bay coho salmon jigging trips with Northern Pursuit Sportfishing in Northern Michigan.",
    eyebrow: "PLATTE BAY · COHO SALMON",
    intro: "Early September can bring an opportunity to target staging coho salmon in Platte Bay. Northern Pursuit is developing a hands-on coho jigging option for this seasonal window.",
    location: "Platte Bay, Lake Michigan",
    season: "Early September, dependent on fish movement",
    tripOptions: [
      "Seasonal coho jigging: contact Captain Jack for current availability and pricing"
    ],
    paragraphs: [
      "This trip is focused on fishing rather than a sightseeing cruise. Jigging gives anglers direct contact with their presentation and a hands-on way to work an area when coho are present.",
      "Coho staging windows vary from year to year. The captain will confirm whether this program is running, where to meet, and which dates make sense before accepting a deposit.",
      "Northern Pursuit supplies standard rods and tackle for approved outings; make sure your group has any required Michigan fishing licenses."
    ],
    highlights: [
      "Limited seasonal opportunity",
      "Jigging-focused fishing",
      "Location and dates depend on fish movements",
      "Ask for a confirmed quote before reserving"
    ],
    faqs: [
      { question: "Can I book a Platte Bay coho trip year-round?", answer: "No. This is a potential early-September specialty offering, subject to conditions and Captain Jack's confirmation." },
      { question: "What does a Platte Bay coho trip cost?", answer: "Pricing has not been published for this specialty trip. Contact the captain for an up-to-date quote." }
    ],
    schemaKind: "service"
  },
  betsie: {
    path: "/charters/betsie-river-drift-boat",
    heading: "Betsie River Drift Boat Fishing Trips",
    title: "Betsie River Drift Boat Fishing | Northern Pursuit",
    description: "Explore private fall drift boat fishing on Michigan's Betsie River with Northern Pursuit Sportfishing. Guided river trips for one or two anglers.",
    eyebrow: "BETSIE RIVER · FALL FISHING",
    intro: "Trade the open water for a day on the river. Northern Pursuit offers private fall drift boat fishing on the Betsie River for one or two anglers.",
    location: "Betsie River, Michigan",
    season: "Fall; dates subject to conditions",
    tripOptions: [
      "Private Betsie River drift boat trip: $600 for 1–2 guests"
    ],
    paragraphs: [
      "A drift boat trip is a different way to experience Northern Michigan fishing. We float the river, work appropriate holding water, and focus on the fishing techniques that suit the season and conditions.",
      "With no more than two guests, there's room for individual instruction and a laid-back day on the water. This is a good fit for anglers who prefer fishing a river to trolling or jigging on a large lake.",
      "River conditions and access affect trip logistics. Captain Jack will confirm the meeting place and plan before your outing."
    ],
    highlights: [
      "Private drift boat trip",
      "One or two guests",
      "Fall Betsie River fishing",
      "Gear and tackle included",
      "$150 deposit after confirmation"
    ],
    faqs: [
      { question: "How many people can fish in the drift boat?", answer: "The river drift boat trip is limited to one or two guests." },
      { question: "Where do we meet for the river trip?", answer: "The meeting location depends on the river plan and conditions. Captain Jack will provide details after approving the trip." },
      { question: "Is the $600 price per angler?", answer: "No. The $600 listing is for the private drift boat trip, accommodating up to two guests." }
    ],
    schemaKind: "service",
    schemaPrice: 600
  },
  captain: {
    path: "/about/captain-jack-votaw",
    heading: "Meet Captain Jack Votaw",
    title: "Meet Captain Jack Votaw | Northern Pursuit Sportfishing",
    description: "Get to know Captain Jack Votaw of Northern Pursuit Sportfishing and his experience fishing Grand Traverse Bay, Frankfort, and Northern Michigan.",
    eyebrow: "NORTHERN PURSUIT · YOUR CAPTAIN",
    intro: "Northern Pursuit Sportfishing was built around years of time spent fishing the waters of Northern Michigan, a hands-on approach, and the kind of day that makes you want to get back out there.",
    location: "Grand Traverse Bay · Frankfort · Northern Michigan",
    season: "Trips run seasonally",
    tripOptions: [
      "Grand Traverse Bay jigging and Frankfort salmon trolling",
      "Private lake trips for up to four; drift boat trips for up to two"
    ],
    paragraphs: [
      "Jack Votaw has spent roughly a decade fishing Northern Michigan waters, including extensive time on Grand Traverse Bay and out of Frankfort. Northern Pursuit is his way of sharing that experience with small private groups.",
      "The goal is straightforward: put in the work, explain what's happening, and make everyone on board part of the day. New anglers are welcome, and experienced anglers can get involved in the details of presentation, electronics and changing conditions.",
      "Jack has CPR and First Aid training and submitted his Merchant Mariner Credential application in September 2026. For up-to-date captain credential information or trip questions, contact him directly."
    ],
    highlights: [
      "Around a decade of Northern Michigan fishing experience",
      "Extensive time on Grand Traverse Bay and at Frankfort",
      "Small, private trips",
      "Hands-on instruction without a crowded boat"
    ],
    faqs: [
      { question: "Where does Northern Pursuit fish?", answer: "Primary areas include Grand Traverse Bay and Lake Michigan out of Frankfort, plus selected seasonal trips such as Betsie River drift boat fishing." },
      { question: "Does Captain Jack take first-time anglers?", answer: "Yes. Trips are designed for both people learning to fish and anglers who want to work on technique." }
    ],
    schemaKind: "none"
  }
} satisfies Record<string, SeoLanding>;
