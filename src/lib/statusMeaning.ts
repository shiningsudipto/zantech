const allStatus = {
  orderStatus: {
    0: "Processing",
    1: "Order Received",
    2: "On Hold",
    3: "Refunded",
  },
} as const;

export const getStatusMeaning = (
  statusName: keyof typeof allStatus,
  code: number
): string => {
  const map = allStatus[statusName];
  return map[code as keyof typeof map] ?? "Unknown Status";
};
