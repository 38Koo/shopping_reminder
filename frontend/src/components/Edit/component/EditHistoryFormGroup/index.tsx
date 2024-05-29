import { HStack, Stack, VStack } from "@yamada-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { EditHistoryFormCard } from "../EditHistoryFormCard";

type EditHistoryFormGroupProps = {
  token: string | null;
  data: any; //TODO: 適切な型に修正する
};

export const EditHistoryFormGroup = ({
  token,
  data,
}: EditHistoryFormGroupProps) => {
  const { control } = useForm();
  const { fields } = useFieldArray({
    control,
    name: "editHistory",
  });

  return (
    <Stack>
      <VStack>
        <EditHistoryFormCard data={data} />
      </VStack>
    </Stack>
  );
};
