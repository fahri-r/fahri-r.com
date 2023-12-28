import ExperienceProps from "./experience";
import SkillProps from "./skill";
import SocialProps from "./social";

export default interface ProfileProps {
  name: string;
  description: string;
  job: string;
  dob: string;
  location: string;
  socials: SocialProps[];
  skills: SkillProps[];
  imgUrl: string;
  experiences: ExperienceProps[];
}
