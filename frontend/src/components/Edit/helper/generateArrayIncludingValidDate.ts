import { EditLogFormType } from "../types/EditLogsFormType";

export const generateArrayIncludingValidDate = (logs: EditLogFormType[]) => {
  return logs.map((log, index) => {
    const previousLogDate =
      index === 0
        ? new Date("1990-01-01")
        : new Date(logs[index - 1].purchaseDate);
    const nextLogDate =
      index === logs.length - 1
        ? new Date("2099-01-01")
        : new Date(logs[index + 1].purchaseDate);

    return {
      ...log,
      previousLogDate,
      nextLogDate,
    };
  });
};
