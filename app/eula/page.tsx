import type { Metadata } from "next";
import LegalPageLayout, { type LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description: "The terms governing your use of digital tools, templates, and materials provided by Nectarine Studio.",
};

const EFFECTIVE_DATE = "September 22, 2026";

const intro = [
  "This End User License Agreement (\"Agreement\") is between you (\"User\" or \"you\") and Nectarine Studio LLC (\"Nectarine,\" \"we,\" \"us,\" or \"our\"). It governs your use of any digital tools, templates, brand kits, downloadable files, or other software-like materials (\"Materials\") that we make available to you, whether through nectarine.ink or delivered separately as part of a project.",
  "By downloading, accessing, or using any Materials we provide, you agree to be bound by this Agreement. If you do not agree, do not use the Materials.",
  "This Agreement does not apply to work product delivered under a separate signed services agreement or statement of work, which governs instead where its terms conflict with this one.",
];

const sections: LegalSection[] = [
  {
    heading: "License Grant",
    body: [
      "Subject to your compliance with this Agreement, Nectarine grants you a limited, non-exclusive, non-transferable, revocable license to use the Materials solely for your own internal business or personal purposes, as described at the time the Materials are provided to you.",
    ],
  },
  {
    heading: "Restrictions",
    body: ["You may not, and may not permit anyone else to:"],
    list: [
      "Copy, resell, sublicense, rent, lease, or otherwise distribute the Materials to any third party.",
      "Modify, reverse engineer, decompile, or create derivative works from the Materials, except as expressly permitted.",
      "Remove, obscure, or alter any copyright, trademark, or other proprietary notice included with the Materials.",
      "Use the Materials in any way that violates applicable law or infringes the rights of others.",
    ],
  },
  {
    heading: "Ownership",
    body: [
      "The Materials are licensed, not sold. Nectarine and its licensors retain all right, title, and interest in and to the Materials, including all associated intellectual property rights. This Agreement grants you a license to use the Materials — it does not transfer ownership of them to you.",
    ],
  },
  {
    heading: "Third-Party Tools",
    body: [
      "Some Materials — including our Brand Audit tool — may incorporate or link to services provided by third parties. Your use of those services is governed by the third party's own terms, and Nectarine is not responsible for their availability, accuracy, or content.",
    ],
  },
  {
    heading: "Term and Termination",
    body: [
      "This Agreement remains in effect until terminated. We may terminate or suspend your license immediately, without notice, if you breach any provision of this Agreement. Upon termination, you must stop using the Materials and delete any copies in your possession.",
    ],
  },
  {
    heading: "Disclaimer of Warranties",
    body: [
      "THE MATERIALS ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE,\" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. NECTARINE DOES NOT WARRANT THAT THE MATERIALS WILL BE ERROR-FREE OR UNINTERRUPTED.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, NECTARINE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUE, ARISING FROM YOUR USE OF THE MATERIALS, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold Nectarine harmless from any claims, damages, or expenses (including reasonable attorneys' fees) arising from your use of the Materials in violation of this Agreement.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "This Agreement is governed by the laws of [State/Country], without regard to its conflict-of-law principles.",
    ],
  },
  {
    heading: "Changes to This Agreement",
    body: [
      "We may update this Agreement from time to time. Changes take effect when posted on this page, with the \"Effective\" date above updated accordingly. Continued use of the Materials after a change means you accept the updated Agreement.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "Questions about this Agreement? Reach us at hello@nectarine.ink.",
    ],
  },
];

export default function EulaPage() {
  return (
    <LegalPageLayout
      title="End User License Agreement"
      effectiveDate={EFFECTIVE_DATE}
      intro={intro}
      sections={sections}
    />
  );
}
