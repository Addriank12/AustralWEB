import { Page } from "../Models/Page";

export abstract class GenericService<T> {
  abstract serviceUrl: string;
  private readonly baseUrl = "https://localhost:7035";

  private getAuthHeader(): { [key: string]: string } {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async handleResponse(response: Response): Promise<any> {
    if (response.status === 401) {
      // Si el error es Unauthorized, lanzamos un error específico
      alert("Debe iniciar sesión para acceder a este recurso.");
    }

    if (!response.ok) {
      // Para otros errores, lanzamos un error genérico
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }

  async getPage(
    page: number,
    itemsPerPage: number,
    filter: string,
    options?: { signal: AbortSignal }
  ): Promise<Page<T>> {
    const params = new URLSearchParams({
      pagina: page.toString(),
      maximoPorPagina: itemsPerPage.toString(),
      filtro: filter,
    });

    const response = await fetch(
      `${this.baseUrl}${this.serviceUrl}?${params.toString()}`,
      {
        signal: options?.signal,
        headers: {
          ...this.getAuthHeader(),
        },
      }
    );

    return this.handleResponse(response);
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async getById(id: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async create(item: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse(response);
  }

  async update(id: string, item: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(item),
    });
    return this.handleResponse(response);
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}${this.serviceUrl}/${id}`, {
      method: "DELETE",
      headers: {
        ...this.getAuthHeader(),
      },
    });
    await this.handleResponse(response);
  }
}