import { Config } from "../constants"

export type FetchAdapterResponse<Data = any> = Response & {
  data: Data
}

class FetchLog {
  static id = 0

  static log(url: RequestInfo, init?: RequestInit) {
    const curId = this.id++
    console.log(`[${init?.method}][${curId}] ${url}`)
    return curId
  }

  static done(id: number) {
    console.log(`[${id}]Fetch DONE`)
  }
}

class FetchAdapter {
  static fetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<FetchAdapterResponse> {
    const url = `${Config.base_Url}${input}`
    const logId = FetchLog.log(url, init)
    return fetch(url, init).then(async res => {
      const fetchRes = res as FetchAdapterResponse

      try {
        fetchRes.data = await fetchRes.json()
        FetchLog.done(logId)
      } catch (e) {
        throw fetchRes
      }

      const isErrorFlagByResponse =
        fetchRes.data?.Status &&
        !(fetchRes.data?.Status >= 200 && fetchRes.data?.Status < 300)

      if (!res.ok || isErrorFlagByResponse) {
        throw fetchRes
      }

      return fetchRes
    })
  }

  static get<Data = any>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<FetchAdapterResponse<Data>> {
    
    return FetchAdapter.fetch(input, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    })
  }

  static post<Data = any>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<FetchAdapterResponse<Data>> {
    console.log(init)
    return FetchAdapter.fetch(input, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    })
  }
}

export default FetchAdapter
