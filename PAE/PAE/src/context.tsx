import React, { createContext, useContext, useState } from "react";

export type DarkMode = {
  value: string;
  setValue: (c: string) => void;
};

export const UserContext = React.createContext<DarkMode>({
  value: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
});

const useDarkMode = () => useContext(UserContext);

export default useDarkMode;
