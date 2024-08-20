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

export async function onUpdateItem(values: Partial<ItemType>) {
  try {
    const response = await ItemService.updateItem(values);

    revalidatePath(AppRoutes.home);
    revalidatePath(`${AppRoutes.item}/${response.id}`);

    return response;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}

export async function onDeleteItem(id: number) {
  try {
    await ItemService.deleteItem(id);

    revalidatePath(AppRoutes.home);
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}
