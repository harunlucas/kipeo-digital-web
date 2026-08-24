import type { LucideIcon } from "lucide-react";
import { FileCheck2, Milestone, PackageCheck, LifeBuoy } from "lucide-react";

export type TrustCommitment = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const trustCommitments: TrustCommitment[] = [
  {
    title: "Clear scope",
    description: "Agreed in writing first.",
    icon: FileCheck2,
  },
  {
    title: "Milestone-based delivery",
    description: "Progress you can see.",
    icon: Milestone,
  },
  {
    title: "Practical handover",
    description: "Documented and extendable.",
    icon: PackageCheck,
  },
  {
    title: "Ongoing support",
    description: "Available after launch.",
    icon: LifeBuoy,
  },
];
