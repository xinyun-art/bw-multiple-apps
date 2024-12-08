// import RoadUtils from '@/utils/road/roadUtils'

/**
 * http://47.75.15.97:8090/pages/viewpage.action?pageId=19080833
 * 玩家输赢路
 * value 红蓝绿
 */
class RoadNode {
	constructor(value, color, pair, win) {
		this.baseValue = value
		this.baseColor = color
		this.basePair = pair
		this.baseWin = win
		this.trueValue = this.getTrueValue(value)
		this.trueColor = this.getTrueColor(color)
		this.truePair = this.getTruePair(pair)
		this.trueWin = this.getTrueWin(win)
	}

	getTrueValue(value) {
		return { 0: '无值', 1: '有值' }[value]
	}
	getTrueColor(color) {
		return { 0: 'lan', 1: 'hong', 2: 'lv', 3: 'hong' }[color] // 3是庄6,按红色显示
	}
	getTruePair(pair) {
		return { '0': '无对', '1': '闲对', '2': '庄对', '3': '庄闲对' }[pair]
	}
	getTrueWin(win) {
		return { 0: '未', 1: '输', 2: '平', 3: '赢' }[win]
	}
}

export function handlerWinLossRoad(instance, { maxColumn, range }) {
	const obj = { nodes: [] }
	obj.instance = instance
	obj.verson = instance.getNextInteger(8)
	obj.row = instance.getNextInteger(8)
	obj.col = instance.getNextInteger(8)
	const total = obj.row * obj.col
	const nodes = []

	for (let i = 0; i < total; i++) {
		nodes.push(
			new RoadNode(
				instance.getNextInteger(1),
				instance.getNextInteger(2), // 庄闲和
				instance.getNextInteger(2), // 庄闲对
				instance.getNextInteger(2) // 输赢平
			)
		)
	}

	if (maxColumn && maxColumn < obj.col) {
		// 动态计算多出的node,然后在赋值时将多余node删除
		const minus = obj.col - maxColumn
		nodes.splice(0, minus * range)
	}

	obj.nodes = nodes
	return obj
}

// const roadInstance3 = new RoadUtils('CQYEvWaYAAAjRYEiMA1gAAAAAmAAAAAAAASAgYA=')
// const bigRoad = handlerWinLossRoad(roadInstance3, {
// 	range: 6,
// 	maxColumn: 12
// })
// console.table(bigRoad.nodes)
