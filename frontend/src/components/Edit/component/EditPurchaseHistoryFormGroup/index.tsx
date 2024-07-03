import { Stack, VStack } from "@yamada-ui/react";
import { EditHistoryFormCard } from "../EditHistoryFormCard";
import { EditShortDescription } from "../EditShortDescription";
import { EditLogFormType } from "../../types/EditLogsFormType";

type EditPurchaseHistoryFormGroupProps = {
  token: string | null;
  data: {
    item: {
      Logs: EditLogFormType[];
    };
  };
};

export const EditPurchaseHistoryFormGroup = ({
  token,
  data,
}: EditPurchaseHistoryFormGroupProps) => {
  if (!data.item.Logs) {
    return null;
  }

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
        {data.item.Logs.map((history, index) => (
          <EditHistoryFormCard key={history.ID} data={history} token={token} />
        ))}
      </VStack>
    </Stack>
  );
};
