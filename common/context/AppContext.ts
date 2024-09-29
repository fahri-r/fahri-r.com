import { createContext } from "react";

import ContextProps from "@/common/types/context";

const initialValues = {
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
