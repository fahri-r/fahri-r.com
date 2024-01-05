export default interface ContextProps {
  showCommand: boolean;
  setShowCommand: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
