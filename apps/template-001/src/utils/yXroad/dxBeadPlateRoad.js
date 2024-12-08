// import RoadUtils from '@/utils/road/roadUtils'

/**
 * 解大小珠盘路数据
 * value 有无值
 * bigSmall 大小
 * win 庄闲和值
 * pair 庄闲对
 */
class RoadNode {
	constructor(value, bigSmall, win, pair) {
		this.baseValue = value
		this.baseBigSmall = bigSmall
		this.baseWin = win
		this.basePair = pair
		this.trueValue = this.getTrueValue(value)
		this.truebBigSmall = this.getTrueBigSmall(bigSmall)
		this.trueWin = this.getTrueWin(win)
		this.truePair = this.getTruePair(pair)
	}

	getTrueValue(value) {
		return { '0': '无值', '1': '有值' }[value]
	}

	getTrueBigSmall(value) {
		return { '0': '小', '1': '大' }[value]
	}

	getTrueWin(win) {
		return { '1': '庄', '0': '闲', '2': '和', '3': '庄6' }[win]
	}

	getTruePair(pair) {
		return { '1': '闲对', '0': '无对', '2': '庄对', '3': '庄闲对' }[pair]
	}
}

export function dxBeadPlateRoad(instance, { maxColumn, range }) {
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
				instance.getNextInteger(2),
				instance.getNextInteger(2),
				instance.getNextInteger(2)
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

// 点数珠盘路
// const roadInstance = new RoadUtils(
// 	'IAYGzsRqVFueXwd/sMvuWPyGQnUens5qUotsYiEWyNiqtoptqj9hsIAAAAAwUDBQAAA='
// )
// const dsBeadPlate = dsBeadPlateRoad(roadInstance)
// console.table(dsBeadPlate.nodes)
