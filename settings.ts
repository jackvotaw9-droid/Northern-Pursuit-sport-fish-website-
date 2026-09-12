import { prisma } from "@/lib/prisma";
import { INTRO_COPY, LICENSE_NOTE, GRATUITY_NOTE, CANCELLATION_POLICY } from "@/lib/constants";

/**
 * Every editable copy block Captain Jack can change from /admin/settings.
 * `default` is what renders until he overrides it — several of these start as
 * explicit placeholders per the original brief, flagged for his approval
 * before publishing anything stronger (see each `default` string).
 */
export const SETTINGS_REGISTRY = {
  homepage_intro: { label: "Homepage Introduction", default: INTRO_COPY, multiline: true },
  announcement_banner: { label: "Announcement Banner (leave blank to hide)", default: "", multiline: false },
  cancellation_policy: { label: "Cancellation & Weather Policy", default: CANCELLATION_POLICY, multiline: true },
  license_note: { label: "Fishing License Note", default: LICENSE_NOTE, multiline: true },
  gratuity_note: { label: "Gratuity Note", default: GRATUITY_NOTE, multiline: false },
  alcohol_policy: {
    label: "Alcohol Policy (FAQ)",
    default: "// TODO(admin): confirm alcohol policy before publishing.",
    multiline: true,
  },
  child_age_policy: {
    label: "Minimum Child Age / Life Jacket Policy (FAQ)",
    default: "// TODO(admin): confirm minimum child age and life-jacket policy before publishing.",
    multiline: true,
  },
  privacy_policy: {
    label: "Privacy Policy",
    default: "// TODO(admin): add your privacy policy text, reviewed for your business, before launch.",
    multiline: true,
  },
  terms_conditions: {
    label: "Terms & Conditions",
    default: "// TODO(admin): add your terms and conditions text, reviewed for your business, before launch.",
    multiline: true,
  },
  accessibility_statement: {
    label: "Accessibility Statement",
    default:
      "Northern Pursuit Sport Fishing is committed to making this website usable for everyone, including visitors using assistive technology. If you encounter an accessibility barrier, please contact us at north.pursuit.sportfishllc@gmail.com so we can address it.",
    multiline: true,
  },
} as const;

export type SettingKey = keyof typeof SETTINGS_REGISTRY;

/** Reads one setting from the database, falling back to its registry default if unset or if the DB isn't reachable. */
export async function getSetting(key: SettingKey): Promise<string> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row?.value ?? SETTINGS_REGISTRY[key].default;
  } catch {
    return SETTINGS_REGISTRY[key].default;
  }
}

/** Reads every setting at once — used by the admin settings page. */
export async function getAllSettings(): Promise<Record<SettingKey, string>> {
  const keys = Object.keys(SETTINGS_REGISTRY) as SettingKey[];
  const result = {} as Record<SettingKey, string>;
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
    const byKey = new Map(rows.map((r) => [r.key, r.value]));
    for (const k of keys) result[k] = byKey.get(k) ?? SETTINGS_REGISTRY[k].default;
  } catch {
    for (const k of keys) result[k] = SETTINGS_REGISTRY[k].default;
  }
  return result;
}
