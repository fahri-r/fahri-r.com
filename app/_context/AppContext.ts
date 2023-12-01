import { createContext } from "react";

import ContextProps from "@/app/_types/context";

const initialValues = {
  showMenu: false,
  setShowMenu: () => undefined,
  name: "",
  setName: () => undefined,
  email: "",
  setEmail: () => undefined,
  message: "",
  setMessage: () => undefined,
  visible: true,
  setVisible: () => undefined,
  submitting: true,
  setSubmitting: () => undefined,
  isVisible: false,
  setIsVisible: () => undefined,
};

const AppContext = createContext<ContextProps>(initialValues);

export default AppContext;
