type WorkProps = {
  company: string;
  role: string;
  entry: WorkDateProps;
  resign?: WorkDateProps;
  description?: string;
  logoUrl?: string;
  initials: string;
};

type WorkDateProps = {
  month: number;
  year: number;
};

export default WorkProps;
