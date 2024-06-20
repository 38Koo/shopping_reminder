import useSWRMutation from "swr/mutation";
type UseDeleteItemArgs = {
  itemID: number;
  purchaseCount: number;
};

export const useDeleteLog = ({ itemID, purchaseCount }: UseDeleteItemArgs) => {
  const { trigger, error } = useSWRMutation(
    `http://localhost:8989/api/delete/${itemID}/${purchaseCount}`,
    deleteLog
  );

  return {
    trigger,
    error,
  };
};

const deleteLog = async (url: string, { arg }: { arg: string }) => {
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${arg}`,
      credentials: "include",
    },
  });
};
