import { Suspense } from "react";
import LineHeightGenerator from "../components/line/LineHeightGenerator";

export const metadata = {
  title: "Fluid Line Height Generator",
  description: "Generate CSS clamp() formulas for fluid line height",
};

export default function FluidLineHeight() {
  return (
    <Suspense fallback={null}>
      <LineHeightGenerator />
    </Suspense>
  );
}
