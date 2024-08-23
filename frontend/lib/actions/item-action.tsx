"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { ItemService } from "@/lib/services/item-service";
import { ItemType } from "@/lib/types/item-type";
import { AppRoutes } from "@/constants/routes";

export async function onCreateItem(values: Partial<ItemType>) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) throw new Error("Access token not found");

    const response = await ItemService.createItem(values, token);

    revalidatePath(AppRoutes.home);

    return response;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}

export async function onUpdateItem(values: Partial<ItemType>) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) throw new Error("Access token not found");

    const response = await ItemService.updateItem(values, token);

    revalidatePath(AppRoutes.home);
    revalidatePath(`${AppRoutes.item}/${response.id}`);

    return response;
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}

export async function onDeleteItem(id: number) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) throw new Error("Access token not found");

    await ItemService.deleteItem(id, token);

    revalidatePath(AppRoutes.home);
  } catch (e) {
    throw new Error(`Server error: ${e}`);
  }
}
