import { Box, Stack, VStack } from "@yamada-ui/react";
import { EditLogFormType } from "../../types/EditLogsFormType";
import { useCustomMediaQuery } from "../../../../hooks/useMediaQuery";
import { EditShortDescriptionForPC } from "../EditShortDescription/PC";
import { EditShortDescriptionForSP } from "../EditShortDescription/SP";
import { EditHistoryFormCardForSP } from "../EditHistoryFormCard/SP";
import { EditHistoryFormCardForPC } from "../EditHistoryFormCard/PC";

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
  const { isSp } = useCustomMediaQuery();

  if (!data.item.Logs) {
    return null;
  }

  return (
    <Stack
      minW={{ base: "768px", md: "350px" }}
      width="auto"
      // padding="3rem"
      border="solid 1px #e5e7eb"
      borderRadius="8px"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
    >
      <Box px="3rem" pt="3rem">
        {isSp ? (
          <EditShortDescriptionForSP data={data} />
        ) : (
          <EditShortDescriptionForPC data={data} />
        )}
      </Box>
      <VStack p="1rem">
        {data.item.Logs.map((history) =>
          isSp ? (
            <EditHistoryFormCardForSP
              key={history.ID}
              data={history}
              token={token}
            />
          ) : (
            <EditHistoryFormCardForPC
              key={history.ID}
              data={history}
              token={token}
            />
          )
        )}
      </VStack>
    </Stack>
  );
};
