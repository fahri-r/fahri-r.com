export default interface ExperienceProps {
  name: string;
  role: string;
  entry: WorkDateProps;
  resign?: WorkDateProps;
}

interface WorkDateProps {
  month: number;
  year: number;
}
