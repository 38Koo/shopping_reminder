import { Box, Card, Stack, Tab, TabPanel, Tabs } from "@yamada-ui/react";
import { EditFormGroup } from "./EditFormGroup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { EditPurchaseHistoryFormGroup } from "./EditPurchaseHistoryFormGroup";
import { useGetItem } from "../hooks/useGetItem";
import { SectionHeader } from "../../SectionHeader/component";

export const Edit = () => {
  const router = useRouter();
  const { itemID } = router.query;

  const { data } = useGetItem(itemID);

  const [token, setToken] = useState<string | null>(null);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  if (!data) {
    return null;
  }
  return (
    <Box justifyContent="center">
      <Stack width="100%">
        <SectionHeader title="Edit" />
        <Tabs width="100%" isFitted>
          <Tab>Item</Tab>
          <Tab>History</Tab>
          <TabPanel>
            <EditFormGroup token={token} data={data} />
          </TabPanel>
          <TabPanel>
            <EditPurchaseHistoryFormGroup data={data} token={token} />
          </TabPanel>
        </Tabs>
      </Stack>
    </Box>
  );
};
