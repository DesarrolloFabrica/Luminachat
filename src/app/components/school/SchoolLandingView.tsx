import type { School } from "../../../lib/schools";
import { SchoolHero } from "./SchoolHero";
import { SchoolStats } from "./SchoolStats";
import { SchoolBentoGrid } from "./SchoolBentoGrid";
import { SchoolPrograms } from "./SchoolPrograms";
import { SchoolExperience } from "./SchoolExperience";

interface SchoolLandingViewProps {
  school: School;
  onStartChat: () => void;
  onExpandVideo: () => void;
}

export function SchoolLandingView({
  school,
  onStartChat,
  onExpandVideo,
}: SchoolLandingViewProps) {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
      <SchoolHero school={school} onStartChat={onStartChat} onExpandVideo={onExpandVideo} />
      <SchoolStats school={school} />
      <SchoolBentoGrid school={school} />
      <SchoolPrograms school={school} />
      <SchoolExperience school={school} onStartChat={onStartChat} />
    </div>
  );
}
