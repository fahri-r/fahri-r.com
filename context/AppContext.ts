import { createContext } from "react";

import ContextProps from "@/types/context";

const initialValues = {
  showCommand: false,
  setShowCommand: () => undefined,
  showMenu: false,
  setShowMenu: () => undefined,
  name: "",
  setName: () => undefined,
  email: "",
  setEmail: () => undefined,
  message: "",
  setMessage: () => undefined,
  submitting: true,
  setSubmitting: () => undefined,
};

const AppContext = createContext<ContextProps>(initialValues);

export default AppContext;
