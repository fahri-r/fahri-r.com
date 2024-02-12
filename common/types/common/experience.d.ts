type ExperienceProps = {
  name: string;
  role: string;
  entry: WorkDateProps;
  resign?: WorkDateProps;
};

type WorkDateProps = {
  month: number;
  year: number;
};

export default ExperienceProps;
