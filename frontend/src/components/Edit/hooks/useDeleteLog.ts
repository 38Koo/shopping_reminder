import useSWRMutation from "swr/mutation";
type UseDeleteItemArgs = {
  logID: number;
};

export const useDeleteLog = ({ logID }: UseDeleteItemArgs) => {
  const { trigger, error } = useSWRMutation(
    `http://localhost:8989/api/delete/log/${logID}`,
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
