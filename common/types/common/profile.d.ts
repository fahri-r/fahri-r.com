import EducationProps from "./education";
import ExperienceProps from "./work";
import SkillProps from "./skill";
import SocialProps from "./social";

type ProfileProps = {
  name: string;
  initials: string;
  description: string;
  job: string;
  dob: string;
  location: string;
  socials: SocialProps[];
  imgUrl: string;
  works: ExperienceProps[];
  education: EducationProps[];
};

export default ProfileProps;
