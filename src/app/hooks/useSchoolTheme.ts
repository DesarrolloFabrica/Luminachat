import { useMemo } from "react";
import { useParams } from "react-router";
import { schools } from "../../lib/schools";
import {
  getSchoolTheme,
  getSchoolThemeFromSchool,
  type SchoolTheme,
} from "../data/schoolThemes";

export function useSchoolTheme(): {
  schoolId: string | undefined;
  school: (typeof schools)[number] | undefined;
  theme: SchoolTheme;
} {
  const { schoolId } = useParams<{ schoolId: string }>();

  return useMemo(() => {
    const school = schools.find((s) => s.id === schoolId);
    const theme = school
      ? getSchoolThemeFromSchool(school)
      : schoolId
        ? getSchoolTheme(schoolId)
        : getSchoolTheme("administrativas");
    return { schoolId, school, theme };
  }, [schoolId]);
}
