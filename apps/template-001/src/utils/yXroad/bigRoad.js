// import RoadUtils from '@/utils/road/roadUtils'

/**
 * 解大路数据
 * value 红蓝绿
 */
class RoadNode {
	constructor(value, color, num, pair, lightning) {
		this.baseValue = value
		this.baseColor = color
		this.baseNum = num
		this.trueValue = this.getTrueValue(value)
		this.trueColor = this.getTrueColor(color)
		this.pair = this.getTruePair(pair)
		this.lightning = this.getLinght(lightning)
		this.trueNum = num
	}

	getTrueValue(value) {
		return { 0: '无值', 1: '有值' }[value]
	}
	getTrueColor(color) {
		return { 0: '蓝色', 1: '红色', 2: '绿色' }[color]
	}
	// 对子
	getTruePair(pair) {
		return { 0: '无对', 1: '闲对', 2: '庄对', 3: '庄闲对' }[pair]
	}

	getLinght(lightning) {
		if (lightning === 1) {
			return 'samll'
		} else if (lightning === 2) {
			return 'big'
		}
		return null
	}
}

export function handlerBigRoad(instance, { maxColumn, range, isLighting }) {
	const obj = { nodes: [] }
	obj.instance = instance
	obj.verson = instance.getNextInteger(8)
	obj.row = instance.getNextInteger(8)
	obj.col = instance.getNextInteger(8)
	const total = obj.row * obj.col
	const nodes = []
	for (let i = 0; i < total; i++) {
		if (isLighting) {
			const val = instance.getNextInteger(1)
			const color = instance.getNextInteger(2)
			const num = instance.getNextInteger(4)
			const pair = instance.getNextInteger(2)
			const lightning = instance.getNextInteger(2)
			nodes.push(new RoadNode(val, color, num, pair, lightning))
		} else {
			// nodes.push(new RoadNode(instance.getNextInteger(1), instance.getNextInteger(2), instance.getNextInteger(4)))
			// nodes.push(new RoadNode(instance.getNextInteger(2), instance.getNextInteger(1), instance.getNextInteger(4), instance.getNextInteger(2), instance.getNextInteger(2)))
			nodes.push(new RoadNode(instance.getNextInteger(2), instance.getNextInteger(1), instance.getNextInteger(4), instance.getNextInteger(2)))
		}
	}

	if (maxColumn && maxColumn < obj.col) {
		// 动态计算多出的node,然后在赋值时将多余node删除
		const minus = obj.col - maxColumn
		nodes.splice(0, minus * range)
	}

	obj.nodes = nodes
	return obj
}

// 大路
// const roadInstance3 = new RoadUtils(
// 	'IQYUoAAAAAAgQAAAAAoAAAAAAgAAAAAAoAAAAAAgAAAAAAoAAAAAAgAAAAAAoUAAAAAgAAAAAAoAAAAAAgQQAAAAoUQAAAAggAAAAAogAAAAAgAAAAAAoAAAAAAgQAAAAAo0aAAAAgQAAAAAABQCEwAA'
// )
// const bigRoad = handlerBigRoad(roadInstance3)
// console.table(bigRoad.nodes)
