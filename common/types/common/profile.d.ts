import EducationProps from "./education";
import ExperienceProps from "./experience";
import SkillProps from "./skill";
import SocialProps from "./social";

type ProfileProps = {
  name: string;
  description: string;
  job: string;
  dob: string;
  location: string;
  socials: SocialProps[];
  skills: SkillProps[];
  imgUrl: string;
  experiences: ExperienceProps[];
  education: EducationProps[];
};

export default ProfileProps;
