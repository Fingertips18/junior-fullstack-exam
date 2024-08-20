"use server";

import { revalidatePath } from "next/cache";

import { ItemService } from "@/lib/services/item-service";
import { ItemType } from "@/lib/types/item-type";
import { AppRoutes } from "@/constants/routes";

export async function onCreateItem(values: Partial<ItemType>) {
  try {
    const response = await ItemService.createItem(values);

    revalidatePath(AppRoutes.home);

    return response;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}
