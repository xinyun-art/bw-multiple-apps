export type Options = {
  reconnectLimit: number // 最大连接次数
  reconectInterval: number // 重新连接的时间间隔
}

export enum ReadyState {
  CONNECTING = 0, // 等待连接
  OPEN = 1, // 连接中
  CLOSEING = 2, // 关闭中
  CLOSED = 3, // 已关闭
  ERROR = 4 // 异常
}

export class Ws {
  private url: string // 连接地址
  private options: Options
  private reConnectNum: number = 0 // 重新连接次数
  private readyState: ReadyState = ReadyState.CONNECTING // 连接状态
  private client: WebSocket | null = null // 连接实例

  constructor(
    url: string,
    options: Options = { reconnectLimit: 10, reconectInterval: 1000 }
  ) {
    this.url = url
    this.options = options
  }

  public connect() {
    const ws = new WebSocket(this.url)
    ws.onopen = this.onOpen.bind(this)
    ws.onmessage = this.onMessage.bind(this)
    ws.onclose= this.onClose.bind(this)
    ws.onclose = this.onError.bind(this)

    this.client = ws
  }

  private onOpen() {}

  private onMessage() {}

  private onClose() {}

  private onError() {}
}
