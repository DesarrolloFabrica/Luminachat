import { useNavigate } from "react-router";
import { schools } from "../../lib/schools";
import { SpatialCampusExperience } from "../components/intro/SpatialCampusExperience";

export function HomePage() {
  const navigate = useNavigate();

  const goToSchool = (schoolId: string) => {
    navigate(`/school/${schoolId}`);
  };

  return (
    <SpatialCampusExperience
      onStartExperience={() => goToSchool(schools[0].id)}
      onViewSchools={() => {}}
      onExploreSchool={goToSchool}
    />
  );
}
