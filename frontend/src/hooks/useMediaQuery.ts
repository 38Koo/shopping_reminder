import { useMediaQuery } from "@yamada-ui/react";
import { useEffect } from "react";

export const useCustomMediaQuery = () => {
  const [isSp, isPc, isTablet] = useMediaQuery([
    "(max-width: 752px)",
    "(min-width: 752px)",
    "(min-width: 1112px)",
  ]);

  useEffect(() => {
    console.log(isPc, isTablet);
  }, [isPc]);

  return {
    isSp,
    isPc,
    isTablet,
  };
};
