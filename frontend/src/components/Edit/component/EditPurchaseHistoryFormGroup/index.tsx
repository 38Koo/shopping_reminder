import { Stack, VStack } from "@yamada-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { EditHistoryFormCard } from "../EditHistoryFormCard";
import { EditShortDescription } from "../EditShortDescription";

type EditPurchaseHistoryFormGroupProps = {
  token: string | null;
  data: any; //TODO: 適切な型に修正する
};

export const EditPurchaseHistoryFormGroup = ({
  token,
  data,
}: EditPurchaseHistoryFormGroupProps) => {
  const { control } = useForm();
  const { fields } = useFieldArray({
    control,
    name: "editHistory",
  });

  return (
    <Stack
      minW="600px"
      width="auto"
      padding="3rem"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
    >
      <EditShortDescription data={data} />
      <VStack>
        {data.Logs.map((history, index) => (
          <EditHistoryFormCard
            key={history.ID}
            data={history}
            index={index + 1}
          />
        ))}
      </VStack>
    </Stack>
  );
};
