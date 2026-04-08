import { Suspense } from "react";
import FluidSpacingGenerator from "../components/spacing/FluidspacingGenerator";
export const metadata = {
  title: "Fluid Spacing Generator",
  description: "Generate CSS clamp() values for fluid padding, margin and gap",
};

export default function FluidSpacingPage() {
  return (
    <Suspense>
      <FluidSpacingGenerator />
    </Suspense>
  );
}
