// import RoadUtils from '@/utils/road/roadUtils'

/**
 * 小路 / 大眼仔路 / 小强路
 * value 红蓝
 */
class RoadNode {
	constructor(value, color) {
		this.baseValue = value
		this.baseColor = color
		this.trueValue = this.getTrueValue(value)
		this.trueColor = this.getTrueColor(color)
	}

	getTrueValue(value) {
		return { 0: '无值', 1: '有值' }[value]
	}
	getTrueColor(color) {
		return { 0: '蓝色', 1: '红色' }[color]
	}
}

export function handlerSmallRoad(instance, { maxColumn, range }) {
	const obj = { nodes: [] }
	obj.instance = instance
	obj.verson = instance.getNextInteger(8)
	obj.row = instance.getNextInteger(8)
	obj.col = instance.getNextInteger(8)
	const total = obj.row * obj.col
	const nodes = []

	for (let i = 0; i < total; i++) {
		nodes.push(
			new RoadNode(instance.getNextInteger(1), instance.getNextInteger(1))
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

// 小路 / 大眼仔路 / 小强路
// const roadInstance2 = new RoadUtils('FgYLwAgA/woAwAqqAC8AqAwAgAAAsBCg')
// const smallRoad = handlerSmallRoad(roadInstance2)
// console.table(smallRoad.nodes)
