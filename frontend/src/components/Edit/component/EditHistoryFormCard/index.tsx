import { Box, HStack, Stack } from "@yamada-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

type EditHistoryFormCardProps = {
  data: any; //TODO: 適切な型に修正する
};

export const EditHistoryFormCard = ({}: EditHistoryFormCardProps) => {
  return (
    <Box
      minW="600px"
      width="auto"
      padding="3rem"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
    >
      1
    </Box>
  );
};
