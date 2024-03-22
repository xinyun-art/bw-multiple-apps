import request from './index'
import type { CommonResponse } from './types/common'
import type { Venues } from './types/game'

enum URL {
  VENUE_LIST = '/main/venueList',
}

// 查询商户游戏类型列表，如真人、体育、电子
export function queryGameAssortList(): Promise<CommonResponse<Venues[]>> {
  return request({
    url: URL.VENUE_LIST,
    method: 'post'
  })
}
