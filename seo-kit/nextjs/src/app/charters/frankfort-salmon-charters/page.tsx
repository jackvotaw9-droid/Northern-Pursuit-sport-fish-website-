import type { Metadata } from "next";
import SeoLandingPage from "../../../components/SeoLandingPage";
import { landingPages } from "../../../lib/landing-data";
import { landingMetadata } from "../../../lib/seo";

const page = landingPages.salmon;
export const metadata: Metadata = landingMetadata(page);

export default function Page() {
  return <SeoLandingPage page={page} />;
}
