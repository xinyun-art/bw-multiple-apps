// import RoadUtils from '@/utils/road/roadUtils'

/**
 * 解珠盘路数据
 * value 有无值
 * sum 庄闲和
 * pair 庄闲对
 */
class RoadNode {
	constructor(value, sum, pair, linghting, isfirstWin, isLighting) {
		this.baseValue = value
		this.baseSum = sum
		this.basePair = pair
		this.trueValue = this.getTrueValue(value)
		this.trueSum = this.getTrueSum(sum)
		this.truePair = this.getTruePair(pair)
		this.linghting = isLighting ? this.getLinght(linghting) : linghting
	}

	getTrueValue(value) {
		return { '0': '无值', '1': '有值' }[value]
	}

	getTrueSum(sum) {
		return { '0': '闲', '1': '庄', '2': '和', '3': '庄6' }[sum]
	}

	getTruePair(pair) {
		return { '0': '无对', '1': '闲对', '2': '庄对', '3': '庄闲对' }[pair]
	}
	getLinght(linghting) {
		return linghting > 1 ? linghting + 'X' : ''
	}
}

export function beadPlateRoad(instance, { maxColumn, range, isLighting }) {
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
			const sum = instance.getNextInteger(2)
			const pair = instance.getNextInteger(2)
			const lightning = instance.getNextInteger(8)
			nodes.push(new RoadNode(val, sum, pair, lightning, '', isLighting))
		} else {
			nodes.push(
				new RoadNode(
					instance.getNextInteger(1),
					instance.getNextInteger(2),
					instance.getNextInteger(2),
					instance.getNextInteger(2),
					instance.getNextInteger(2),
					isLighting
				)
			)
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

// 珠盘路
// const roadInstance = new RoadUtils(
// 	'IAYG7GVZ3n+P5fhDXu5ljuIWjKuO6/GIAAAwUDBQAA=='
// )
// const beadPlate = beadPlateRoad(roadInstance)
// console.table(beadPlate.nodes)
