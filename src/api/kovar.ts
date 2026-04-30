import { useMutation } from "@tanstack/react-query";
import { apiPostJson } from "@/api/client";

export type CreateReceivingPayload = {
  kovarAccount: string;
  address: string;
  amount: string;
  githubUrl?: string;
};

export async function createReceiving(
  payload: CreateReceivingPayload,
): Promise<void> {
  await apiPostJson("/receivings", payload);
}

export function useCreateReceiving() {
  return useMutation({
    mutationFn: createReceiving,
  });
}
