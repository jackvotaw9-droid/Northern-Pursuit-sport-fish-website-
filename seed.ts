import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PACKAGES } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "north.pursuit.sportfishllc@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-immediately";
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "OWNER",
    },
  });

  // Boats
  const lund = await prisma.boat.upsert({
    where: { id: "lund-hg" },
    update: {},
    create: {
      id: "lund-hg",
      name: "Lund HG", // TODO(admin): confirm exact official model name
      maxPassengers: 4,
      description:
        "Equipped with marine electronics, fishing technology, safety equipment, and professional tackle for bay and Great Lakes charters.",
    },
  });

  const driftBoat = await prisma.boat.upsert({
    where: { id: "drift-boat" },
    update: {},
    create: {
      id: "drift-boat",
      name: "Drift Boat",
      maxPassengers: 2,
      description: "An up-close river platform for fall Chinook trips on the Betsie and Pere Marquette.",
    },
  });

  // Charter packages — mirrors src/lib/constants.ts so pricing/copy have one source of truth
  for (const p of PACKAGES) {
    await prisma.charterPackage.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        boatId: p.boat === "Drift Boat" ? driftBoat.id : lund.id,
        priceCents: p.priceCents,
        depositCents: p.depositCents,
        durationLabel: p.durationLabel,
        startTime: p.startTime ?? undefined,
        endTime: p.endTime ?? undefined,
        maxGuests: p.maxGuests,
        region: p.region,
        targetSpecies: p.targetSpecies,
        method: p.method,
        included: [
          "Private guided fishing trip",
          "Rods, reels, tackle & bait",
          "Full lunch, snacks & beverages",
          "Fish cleaned and bagged",
        ],
        bringList: ["Weather-appropriate layers", "Rain gear", "Polarized sunglasses", "Sunscreen", "Cooler"],
        seasonNote: p.seasonNote,
      },
    });
  }

  // Open a handful of sample dates over the next 60 days for each package so
  // there's something bookable in a fresh dev/demo environment. Replace this
  // with real captain-managed availability once /admin/calendar is built out.
  const allPackages = await prisma.charterPackage.findMany();
  const today = new Date();
  for (const p of allPackages) {
    for (let i = 3; i < 60; i += 7) {
      const date = new Date(today);
      date.setUTCDate(date.getUTCDate() + i);
      date.setUTCHours(0, 0, 0, 0);
      await prisma.availabilitySlot.upsert({
        where: { date_packageId: { date, packageId: p.id } },
        update: {},
        create: { date, packageId: p.id, isOpen: true },
      });
    }
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / (the ADMIN_PASSWORD you set in .env)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
