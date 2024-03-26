// @ts-ignore
import zhJson from './json/zh.json'
// @ts-ignore
import enJson from './json/en.json'
// @ts-ignore
import viJson from './json/vi.json'
// @ts-ignore
import thJson from './json/th.json'
// import termsMessagesFn from './termsMessages'

const zh = {
  ...zhJson,
  countTime: '{msg}秒后重新发送',
  transferTips: '您的余额已转入{msg}，是否结束游戏并一键转回至中心钱包？',
  loginName: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  password: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  alipayAccount: '请输入{0}~{1}位字母或数字组合的支付宝账号', // 支付宝账号
  unReadCount: '{count}条未读', // 未读消息
  accountLevel: '尊敬的 {level} 级VIP会员',
  canBeWithdrawn: '可提现金额：{count}元，不包括游戏平台未转出余额'
  // lotteryGameInner: `超过百种彩票玩法任您赢！${appTitle} 为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。`,
  // hotGameSubText: `您想要的${appText}都有，带给您丰富的游戏体验`,
  // serviceSubText: `${appText}全心全意为您提供最优质的服务`,
  // ...termsMessages.zh
}

const en = {
  ...enJson
}

const vi = {
  ...viJson
}

const th = {
  ...thJson
}

export default {
  zh,
  en,
  vi,
  th
}