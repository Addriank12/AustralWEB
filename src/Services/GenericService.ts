import { Page } from "../Models/Page";

export abstract class GenericService<T> {
  abstract serviceUrl: string;
  private readonly baseUrl = "https://localhost:7035";

  async getPage(
    page: number,
    itemsPerPage: number,
    filter: string,
    options: { signal: AbortSignal }
  ): Promise<Page<T>> {
    const params = new URLSearchParams({
      pagina: page.toString(),
      maximoPorPagina: itemsPerPage.toString(),
      filtro: filter,
    });

    const response = await fetch(
      `${this.baseUrl}${this.serviceUrl}?${params.toString()}`,
      {
        signal: options.signal, // Pasamos el signal aquí
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

  async getById(id: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }

  async create(item: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    return await response.json();
  }

  async update(id: string, item: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    return await response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  }
}
