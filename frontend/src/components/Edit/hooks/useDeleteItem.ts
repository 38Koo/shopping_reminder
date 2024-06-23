import useSWRMutation from "swr/mutation";

type UseDeleteItemArgs = {
  itemID: number;
};

export const useDeleteItem = ({ itemID }: UseDeleteItemArgs) => {
  const { trigger, error } = useSWRMutation(
    `http://localhost:8989/api/delete/item/${itemID}`,
    deleteItem
  );

  return {
    trigger,
    error,
  };
};

const deleteItem = async (url: string, { arg }: { arg: string }) => {
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${arg}`,
      credentials: "include",
    },
  });
};
