import { Box } from "@yamada-ui/react";
import { AddFormGroup } from "./AddFormGroup";
import { SectionHeader } from "../../SectionHeader/component";

export const Add = () => {
  return (
    <Box width="100%">
      <SectionHeader title="新規アイテム登録" />
      <AddFormGroup />
    </Box>
  );
};
