import Social from "./social";

export default interface ProfileProps {
  name: string;
  description: string;
  job: string;
  dob: string;
  location: string;
  socials: Social[];
  imgUrl: string;
}
