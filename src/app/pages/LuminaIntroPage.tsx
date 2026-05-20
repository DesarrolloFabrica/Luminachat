import { useNavigate } from "react-router";
import { schools } from "../../lib/schools";
import { SpatialCampusExperience } from "../components/intro/SpatialCampusExperience";

export interface LuminaIntroPageProps {
  onStartExperience?: () => void;
  onViewSchools?: () => void;
}

/** Tras login en App.tsx (sin router) */
export function LuminaIntroPage({
  onStartExperience,
  onViewSchools,
}: LuminaIntroPageProps) {
  const enterApp = onStartExperience ?? (() => {});
  const viewSchools = onViewSchools ?? enterApp;

  return (
    <SpatialCampusExperience
      onStartExperience={enterApp}
      onViewSchools={viewSchools}
      onExploreSchool={(schoolId) => {
        sessionStorage.setItem("lumina_pending_school", schoolId);
        enterApp();
      }}
    />
  );
}

function LuminaIntroWithRouter() {
  const navigate = useNavigate();

  return (
    <SpatialCampusExperience
      onStartExperience={() => navigate(`/school/${schools[0]?.id ?? "administrativas"}`)}
      onViewSchools={() => navigate("/")}
      onExploreSchool={(schoolId) => navigate(`/school/${schoolId}`)}
    />
  );
}

export function LuminaIntroRoute() {
  return <LuminaIntroWithRouter />;
}
