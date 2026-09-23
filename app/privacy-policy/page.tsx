import type { Metadata } from "next";
import LegalPageLayout, { type LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nectarine Studio collects, uses, and protects your information.",
};

const EFFECTIVE_DATE = "September 22, 2026";

const intro = [
  "Nectarine Studio LLC (\"Nectarine,\" \"we,\" \"us,\" or \"our\") operates nectarine.ink (the \"Site\"). This Privacy Policy explains what information we collect when you visit or use the Site, how we use it, and the choices you have.",
  "By using the Site, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the Site.",
];

const sections: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: [
      "We collect information in two ways: information you give us directly, and information collected automatically as you browse.",
    ],
    list: [
      "Information you provide: your name, email address, subject, and message when you submit our contact form, or your email address if you email us directly.",
      "Information collected automatically: pages visited, time on page, referring site, approximate location (derived from IP address), browser and device type, and similar usage data, collected via cookies and analytics tools described below.",
    ],
  },
  {
    heading: "Cookies and Tracking Technologies",
    body: [
      "The Site uses cookies and similar technologies to run properly, understand how visitors use it, and measure the performance of our advertising. When you first visit, a cookie banner lets you accept all cookies or set your preferences by category:",
    ],
    list: [
      "Necessary — always on. Required for the Site to function, including remembering the cookie choice itself.",
      "Analytics — used for Google Analytics, to understand how visitors use the Site.",
      "Advertising — used for Google Ads conversion tracking, to measure the performance of our ads.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Respond to messages sent through the contact form or by email.",
      "Understand how the Site is used, so we can improve it.",
      "Measure the performance of our advertising campaigns.",
      "Maintain the security and proper functioning of the Site.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "We use a small number of third-party services to operate the Site. Each has its own privacy policy governing how it handles data:",
    ],
    list: [
      "Google Analytics and Google Ads — website analytics and conversion tracking. Google's use of this data is governed by the Google Privacy Policy.",
      "Web3Forms — processes submissions from our contact form and delivers them to us by email.",
      "Google Calendar — powers the appointment-scheduling popup used to book a call with us.",
      "Our Brand Audit tool, embedded from a separate site, which has its own privacy practices for any information you enter there.",
    ],
  },
  {
    heading: "How We Share Information",
    body: [
      "We do not sell your personal information. We share it only with the service providers listed above, as needed to operate the Site, or when required by law, to protect our legal rights, or in connection with a merger, acquisition, or sale of assets.",
    ],
  },
  {
    heading: "Your Choices",
    body: [
      "You can change your cookie preferences at any time using the \"Cookie Preferences\" link in the footer of every page. You can also block or delete cookies through your browser settings, though some parts of the Site may not work as intended if you do.",
      "To request access to, correction of, or deletion of personal information we hold about you, contact us using the details below. We'll respond as required by applicable law.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain contact form submissions and email correspondence for as long as reasonably necessary to respond to and document your inquiry. Analytics and advertising data is retained according to Google's own retention settings for our account.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable technical and organizational measures to protect the information we collect. No method of transmission or storage is completely secure, and we can't guarantee absolute security.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "The Site is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we'll delete it.",
    ],
  },
  {
    heading: "International Visitors",
    body: [
      "The Site is operated from the United States. If you're visiting from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Changes take effect when posted on this page, with the \"Effective\" date above updated accordingly. We encourage you to review this page periodically.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "Questions about this Privacy Policy or how we handle your information? Reach us at hello@nectarine.ink.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPageLayout title="Privacy Policy" effectiveDate={EFFECTIVE_DATE} intro={intro} sections={sections} />;
}
