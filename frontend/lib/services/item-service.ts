import { ItemType } from "@/lib/types/item-type";

const url = `${process.env.BASE_URL}/api/items`;

export const ItemService = {
  getItems: async () => {
    let items: ItemType[] = [];

    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "force-cache",
      });

      if (response.status === 200) {
        items = await response.json();
      }
    } catch (error) {
      items = [];
    }

    return items;
  },
};
