import { Box, HStack } from "@yamada-ui/react";
import { SectionHeader } from "../SectionHeader";
import { EditFormGroup } from "./EditFormGroup";
import { EditGraph } from "./EditGraph";

export const Edit = () => {
  return (
    <Box width="100%">
      <SectionHeader title="Edit" />
      <HStack height="700px" justifyContent="space-between" paddingX="50px">
        <EditFormGroup />
        <EditGraph />
      </HStack>
    </Box>
  );
};
