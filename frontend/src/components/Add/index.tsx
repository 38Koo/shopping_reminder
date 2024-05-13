import { Box } from "@yamada-ui/react";
import { SectionHeader } from "../SectionHeader";
import { AddFormGroup } from "./AddFormGroup";

export const Add = () => {
  return (
    <Box width="100%">
      <SectionHeader title="新規アイテム登録" />
      <AddFormGroup />
    </Box>
  );
};
