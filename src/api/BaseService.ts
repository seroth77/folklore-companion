export default abstract class BaseService {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async delete(path: string, query?: { [key: string]: string | string[] }): Promise<Response> {
    const queryString = this.createQueryString(query);
    const response = await fetch(`/api/${this.endpoint}/${path}?${queryString}`, {
      headers: this.getDefaultHeaders(),
      method: "DELETE",
    });

    return response;
  }

  protected async get<TResult>(path: string, query?: { [key: string]: string | string[] }): Promise<TResult> {
    const queryString = this.createQueryString(query);

    const response = await fetch(`/api/${this.endpoint}/${path}?${queryString}`, {
      cache: "no-cache",
      credentials: "include",
      headers: this.getDefaultHeaders(),
    });

    if (response.status === 204) {
      return null;
    } else if (response.status === 401) {
      // Auth is invalid, reload the page to go through the auth flow
      location.reload();
      // Await a never resolving promise to stop any failures from occurring that are awaiting data
      await new Promise(() => null);
    } else if (response.status < 200 || response.status >= 300) {
      // TODO: Build a custom Error object to return better messages
      throw Error(`API error: ${response.status}: ${response.statusText}`);
    }

    const result: TResult = await response.json();

    return result;
  }

  protected getDefaultHeaders(): HeadersInit {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  protected async post<TRequest, TResult>(
    dataToPost: TRequest,
    path: string,
    query?: { [key: string]: string },
  ): Promise<TResult> {
    const queryString = this.createQueryString(query);

    const response = await fetch(`/api/${this.endpoint}/${path}?${queryString}`, {
      body: JSON.stringify(dataToPost),
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.getDefaultHeaders(),
      method: "POST",
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer",
    });
    if (response.status === 204) {
      return null;
    } else if (response.status === 401) {
      // Auth is invalid, reload the page to go through the auth flow
      location.reload();
      // Await a never resolving promise to stop any failures from occurring that are awaiting data
      await new Promise(() => null);
    } else if (response.status < 200 || response.status >= 300) {
      // TODO: Build a custom Error object to return better messages
      throw Error(`API error: ${response.status}: ${response.statusText}`);
    }

    const result: TResult = await response.json();

    return result;
  }

  private createQueryString(query?: { [key: string]: string | string[] }): string {
    if (!query) {
      return "";
    }

    return Object.keys(query)
      .filter((key) => typeof query[key] !== "undefined")
      .reduce<string[]>((prev, key) => {
        const curr = query[key];
        if (Array.isArray(curr)) {
          return [...prev, ...curr.map((e) => `${encodeURIComponent(key)}=${encodeURIComponent(e)}`)];
        } else {
          return [...prev, `${encodeURIComponent(key)}=${encodeURIComponent(curr)}`];
        }
      }, [])
      .join("&");
  }
}

export interface IPageResponse<T> {
  items: T[];
  rowCount: number;
}
