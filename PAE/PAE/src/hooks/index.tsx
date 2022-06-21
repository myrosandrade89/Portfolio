import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface IToastState {
  message: string;
  status: any;
  title: string;
}

export const useToastHook = (): [
  IToastState | undefined,
  React.Dispatch<IToastState>
] => {
  const [state, setState] = useState<IToastState | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { title, message, status } = state;

      toast({
        title: title,
        description: message,
        status: status,
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
};
