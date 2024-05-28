import { Box, Stack } from "@yamada-ui/react";
import { SectionHeader } from "../../SectionHeader";
import { EditFormGroup } from "./EditFormGroup";
import { useRouter } from "next/router";
import { getItem } from "../handlers/getItem";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { EditHistoryFormGroup } from "./EditHistoryFormGroup";

export const Edit = () => {
  const router = useRouter();
  const { itemID } = router.query;

  if (!itemID || Array.isArray(itemID)) {
    return null;
  }

  const { data } = getItem(parseInt(itemID));
  console.log(data);

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
      <Stack width="60%">
        <SectionHeader title="Edit" />
        <EditFormGroup token={token} data={data} />
        <EditHistoryFormGroup token={token} data={data} />
      </Stack>
    </Box>
  );
};
