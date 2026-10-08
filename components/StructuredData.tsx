// Hidden business details for Google (called "structured data" or "schema").
// Visitors never see this — it helps Google understand who Nectarine is and
// show the right name, logo, and links in search results. Edit the details
// below if anything changes (e.g. a new social profile goes in `sameAs`).
const SITE_URL = "https://www.nectarine.ink";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Nectarine Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "hello@nectarine.ink",
  foundingDate: "2024",
  description:
    "Nectarine Studio is a remote brand strategy and design studio for climate tech, environmental, and impact-focused companies — brand narrative, copywriting, visual identity, pitch decks, and websites.",
  // Official (legal) base only — the team works remotely, worldwide.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Erie",
    addressRegion: "PA",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Brand strategy",
    "Brand narrative",
    "Messaging frameworks",
    "Copywriting",
    "Visual identity",
    "Pitch deck design",
    "Website design",
    "Brand workshops",
    "Climate tech branding",
    "Environmental and sustainability branding",
    "Impact and economic development branding",
  ],
  sameAs: [
    "https://www.linkedin.com/company/nectarineink",
    "https://www.instagram.com/nectarine.ink/",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Nectarine Studio",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, website]) }}
    />
  );
}
