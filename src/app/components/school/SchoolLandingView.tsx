import type { School } from "../../../lib/schools";
import type { SchoolTheme } from "../../data/schoolThemes";
import { SchoolLandingHeroSection } from "./SchoolLandingHeroSection";
import { LuminaEducationExperience } from "../education/LuminaEducationExperience";

interface SchoolLandingViewProps {
  school: School;
  theme: SchoolTheme;
  onOpenChat: () => void;
}

export function SchoolLandingView({ school, theme, onOpenChat }: SchoolLandingViewProps) {
  const scrollToExperience = () => {
    document
      .getElementById("lumina-education-experience")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <SchoolLandingHeroSection
        school={school}
        theme={theme}
        onStartChat={onOpenChat}
        onScrollToFlow={scrollToExperience}
      />
      <LuminaEducationExperience theme={theme} />
    </div>
  );
}
