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

      if (response.ok) {
        items = await response.json();
      }
    } catch (_) {
      items = [];
    }

    return items;
  },

  getItem: async (id: number) => {
    let item: ItemType | null = null;

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        item = await response.json();
      }
    } catch (_) {
      item = null;
    }

    return item;
  },

  createItem: async (values: Partial<ItemType>) => {
    const data = {
      name: values.name,
      desc: values.desc,
      price: values.price,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Server Error! status: ${response.status}, text: ${response.statusText}`
      );
    }

    const result: ItemType = await response.json();

    return result;
  },

  deleteItem: async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Server Error! status: ${response.status}, text: ${response.statusText}`
      );
    }
  },
};
