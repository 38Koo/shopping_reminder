import { Stack, VStack } from "@yamada-ui/react";
import { EditHistoryFormCard } from "../EditHistoryFormCard";
import { EditShortDescription } from "../EditShortDescription";
import { EditLogFormType } from "../../types/EditLogsFormType";
import { generateArrayIncludingValidDate } from "../../helper/generateArrayIncludingValidDate";

type EditPurchaseHistoryFormGroupProps = {
  token: string | null;
  data: {
    Logs: EditLogFormType[];
  };
};

export const EditPurchaseHistoryFormGroup = ({
  token,
  data,
}: EditPurchaseHistoryFormGroupProps) => {
  if (!data.Logs) {
    return null;
  }

  const logsIncludingValidDate = generateArrayIncludingValidDate(data.Logs);

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
        {logsIncludingValidDate.map((history) => (
          <EditHistoryFormCard key={history.ID} data={history} token={token} />
        ))}
      </VStack>
    </Stack>
  );
};
