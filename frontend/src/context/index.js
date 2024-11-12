import { createContext, useContext } from "react";

const Context = createContext(null)

export const UseUser = () => useContext(Context)

export default Context