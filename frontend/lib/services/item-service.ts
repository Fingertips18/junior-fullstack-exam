import { ItemType } from "@/lib/types/item-type";

const base =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : process.env.NEXT_PUBLIC_DEV_URL;
const url = `${base}/api/items`;

export const ItemService = {
  getItems: async (token: string) => {
    let items: ItemType[] = [];

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        items = await response.json();
      }
    } catch (_) {
      items = [];
    }

    return items;
  },

  getItem: async (id: number, token: string) => {
    let item: ItemType | null = null;

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        item = await response.json();
      }
    } catch (_) {
      item = null;
    }

    return item;
  },

  createItem: async (values: Partial<ItemType>, token: string) => {
    const data = {
      name: values.name,
      desc: values.desc,
      price: values.price,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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

  updateItem: async (values: Partial<ItemType>, token: string) => {
    const data = {
      name: values.name,
      desc: values.desc,
      price: values.price,
    };

    const response = await fetch(`${url}/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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

  deleteItem: async (id: number, token: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Server Error! status: ${response.status}, text: ${response.statusText}`
      );
    }
  },
};
