import imgMap from './imageMap'

export default class RenderNode {
	constructor() {
		this.element = null
		this.canvas = null
		this.ctx = null
		this.width = 0
		this.height = 0
		this.totalCol = 0
		this.totalRow = 0
		this.baseWidth = 0
		this.imgCache = {}
		this.pair = {
			0: 'M 11,0 A 11,11 0 1,0 11,22 A 11,11 0 1,0 11,0 Z',
			1: 'M18.8584 14.1427C16.2547 14.1427 14.1441 16.2534 14.1441 18.857C14.1441 19.757 14.3963 20.5981 14.8339 21.3134C13.6401 21.7574 12.3484 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 12.3477 21.7576 13.6388 21.3141 14.8321C20.5989 14.3947 19.7581 14.1427 18.8584 14.1427Z',
			2: 'M3.14593 7.8573C5.74955 7.8573 7.86021 5.74665 7.86021 3.14302C7.86021 2.24247 7.60771 1.40091 7.16964 0.685253C8.36244 0.242134 9.65294 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 9.6515 0.242651 8.35968 0.686672 7.16582C1.40265 7.60445 2.24476 7.8573 3.14593 7.8573Z',
			3: 'M14.1398 18.857C14.1398 16.2534 16.2504 14.1427 18.8541 14.1427C19.7552 14.1427 20.5974 14.3956 21.3133 14.8342C21.7573 13.6403 22 12.3485 22 11C22 4.92487 17.0751 0 11 0C9.65164 0 8.35994 0.242601 7.16618 0.686537C7.60386 1.40197 7.85612 2.24316 7.85612 3.14326C7.85612 5.74689 5.74546 7.85755 3.14183 7.85755C2.24203 7.85755 1.40111 7.60546 0.685839 7.16806C0.242348 8.3613 0 9.65235 0 11C0 17.0751 4.92487 22 11 22C12.3471 22 13.6376 21.7579 14.8304 21.3147C14.3923 20.5991 14.1398 19.7575 14.1398 18.857Z'
		}
	}

	initArea({ dom, baseWidth, totalCol, totalRow }) {
		this.baseWidth = baseWidth
		this.totalCol = totalCol
		this.totalRow = totalRow
		this.width = totalCol * baseWidth
		this.height = totalRow * baseWidth

		this.createContent(dom)
		this.createCanvas(this.width, this.height)
		this.drawArea()
	}

	createContent(dom) {
		const contentElement = document.getElementById(dom)
		if (!contentElement) {
			throw new Error('dew的容器不是一个正确的元素')
		}
		this._removeChildNodes(contentElement)
		this.element = contentElement
	}

	createCanvas() {
		this.canvas = document.createElement('canvas')
		if (this.canvas && this.canvas.getContext) {
			this.element.appendChild(this.canvas)
			this.ctx = this.canvas.getContext('2d')

			this.canvas.width = this.width
			this.ctx.width = this.width

			this.canvas.height = this.height
			this.ctx.height = this.height
		}
	}

	createSVGUrl(textContent, textColor, fillColor, pair = 0) {
		// textContent:文本内容, textColor: 文本颜色, fillColor: 背景颜色, pair: 0-无对，1-闲对, 2-庄对, 3-庄闲对
		// 创建命名空间
		const xmlns = 'http://www.w3.org/2000/svg'

		// 创建SVG元素
		const svg = document.createElementNS(xmlns, 'svg')
		svg.setAttribute('width', '22')
		svg.setAttribute('height', '22')
		svg.setAttribute('viewBox', '0 0 22 22')
		svg.setAttribute('fill', 'none')

		// 创建group (g) 元素并设置属性
		const g1 = document.createElementNS(xmlns, 'g')
		g1.setAttribute('clip-path', 'url(#clip0_327_15565)')
		// 创建第 path 元素
		const path = document.createElementNS(xmlns, 'path')
		path.setAttribute('fill-rule', 'evenodd')
		path.setAttribute('clip-rule', 'evenodd')
		path.setAttribute('d', this.pair[pair])
		path.setAttribute('fill', fillColor)

		// 创建包含动态文本的 <g> 标签
		const g2 = document.createElementNS(xmlns, 'g')
		g2.setAttribute('mask', 'url(#mask0_327_15565)')

		// 替换掉 path 的 <text> 标签
		const text = document.createElementNS(xmlns, 'text')
		text.setAttribute('x', '50%') // 设置文本的 x 位置为 SVG 的中心
		text.setAttribute('y', '50%') // 设置文本的 y 位置为 SVG 的中心
		text.setAttribute('fill', textColor) // 设置文本颜色
		text.setAttribute('font-size', '12') // 设置文本字体大小
		text.setAttribute('font-family', 'Arial, sans-serif') // 设置字体
		text.setAttribute('text-anchor', 'middle') // 水平居中
		text.setAttribute('dominant-baseline', 'middle') // 垂直居中
		text.textContent = textContent // 动态传入文本内容
		// 在g2中添加 text 标签
		g2.appendChild(text)

		// 创建一个 <circle> 元素

		const zhuangCircle = document.createElementNS(xmlns, 'circle')
		zhuangCircle.setAttribute('cx', '3.33929')
		zhuangCircle.setAttribute('cy', '3.33929')
		zhuangCircle.setAttribute('r', '3.33929')
		zhuangCircle.setAttribute('fill', '#c22720')

		const xianCircle = document.createElementNS(xmlns, 'circle')
		xianCircle.setAttribute('cx', '18.6616')
		xianCircle.setAttribute('cy', '18.6606')
		xianCircle.setAttribute('r', '3.33929')
		xianCircle.setAttribute('fill', '#1E51B4')
		// 依次将所有元素添加到 SVG 中
		g1.appendChild(path)
		svg.appendChild(g1)
		svg.appendChild(g2) // 添加包含动态文本的g标签
		switch (pair) {
			case 1:
				svg.appendChild(xianCircle)
				break

			case 2:
				svg.appendChild(zhuangCircle)
				break
			case 3:
				svg.appendChild(xianCircle)
				svg.appendChild(zhuangCircle)
				break
			default:
				break
		}

		// 把svg 转成url
		const serializer = new XMLSerializer()
		const svgString = serializer.serializeToString(svg)
		const blob = new Blob([svgString], { type: 'image/svg+xml' })
		return URL.createObjectURL(blob)
	}

	createSvgBigRoadURl(color, isBig) {
		const xmlns = 'http://www.w3.org/2000/svg'
		// 创建SVG元素
		const svg = document.createElementNS(xmlns, 'svg')
		svg.setAttribute('width', '30px')
		svg.setAttribute('height', '30px')
		svg.setAttribute('viewBox', '0 0 12 12')
		svg.setAttribute('fill', 'none')

		// 创建mask元素
		const mask = document.createElementNS(xmlns, 'mask')
		mask.setAttribute('id', 'mask0_1951_77780')
		mask.setAttribute('style', 'mask-type:luminance')
		mask.setAttribute('maskUnits', 'userSpaceOnUse')
		mask.setAttribute('x', '0')
		mask.setAttribute('y', '0')
		mask.setAttribute('width', '12')
		mask.setAttribute('height', '12')

		const rect = document.createElementNS(xmlns, 'rect')
		rect.setAttribute('width', '12')
		rect.setAttribute('height', '12')
		rect.setAttribute('fill', 'white')
		mask.appendChild(rect)

		// 创建defs和linearGradient元素
		const defs = document.createElementNS(xmlns, 'defs')
		const linearGradient = document.createElementNS(xmlns, 'linearGradient')
		linearGradient.setAttribute('id', 'paint0_linear_1951_77780')
		linearGradient.setAttribute('x1', '-6')
		linearGradient.setAttribute('y1', '6')
		linearGradient.setAttribute('x2', '6')
		linearGradient.setAttribute('y2', '18')
		linearGradient.setAttribute('gradientUnits', 'userSpaceOnUse')

		const stop = document.createElementNS(xmlns, 'stop')
		stop.setAttribute('stop-color', color)
		linearGradient.appendChild(stop)
		defs.appendChild(linearGradient)

		// 创建g元素和circle元素
		const g = document.createElementNS(xmlns, 'g')
		g.setAttribute('mask', 'url(#mask0_1951_77780)')
		const circle = document.createElementNS(xmlns, 'circle')
		circle.setAttribute('cx', '6')
		circle.setAttribute('cy', '6')
		circle.setAttribute('r', '5.19911')
		circle.setAttribute('stroke', 'url(#paint0_linear_1951_77780)')
		circle.setAttribute('stroke-width', '1.60177')
		g.appendChild(circle)

		// 创建path元素
		const path = document.createElementNS(xmlns, 'path')
		path.setAttribute('d', 'M3.5 5.77968L6.6 2L6.09231 4.90068H8.5L4.2 9L5.81539 5.77968H3.5Z')
		path.setAttribute('fill', color)
		path.setAttribute('transform', isBig ? 'scale(1.5) translate(-2, -2)' : '')

		// 组装SVG
		svg.appendChild(mask)
		svg.appendChild(g)
		svg.appendChild(path)
		svg.appendChild(defs)

		// 把svg 转成url
		const serializer = new XMLSerializer()
		const svgString = serializer.serializeToString(svg)
		const blob = new Blob([svgString], { type: 'image/svg+xml' })
		return URL.createObjectURL(blob)
	}

	// 绘制棋盘和行列图
	drawArea() {
		this.ctx.lineWidth = 2
		this.ctx.strokeStyle = '#E2E4E7'
		this.ctx.strokeRect(0, 0, this.width, this.height) // 向上向下扩展像素的兼容

		this.ctx.lineWidth = 1
		this.ctx.strokeStyle = '#E2E4E7'
		this._drawRow()
		this._drawCol()
	}

	_drawRow() {
		const length = this.totalRow + 1
		for (let index = 0; index < length; index++) {
			if (index === 0 || index === this.totalRow) {
				continue
			} else {
				this._drawLine(0, index * this.baseWidth, this.canvas.width, index * this.baseWidth)
			}
		}
	}

	_drawCol() {
		const length = this.totalCol + 1
		for (let index = 0; index < length; index++) {
			if (index === 0 || index === this.totalCol) {
				continue
			} else {
				this._drawLine(index * this.baseWidth, 0, index * this.baseWidth, this.canvas.height)
			}
		}
	}

	// 绘制珠盘路数据
	drawBeadPlateRoad(bigRoad, { width, move = 0, radius = 10, isLighting = false, isDragon }) {
		const { nodes } = bigRoad
		const length = nodes.length
		const minus = 1
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = minus + col * width - width * move
				const y = minus + row * width
				const sum = nodes[index].baseSum
				const pair = nodes[index].basePair
				const trueSum = nodes[index].trueSum
				const lighting = nodes[index].linghting
				let imgurl = ''
				let color = ''
				let dragonContext = ''
				switch (sum) {
					case 0:
						color = '#1E51B4'
						dragonContext = '虎'
						break

					case 1:
					case 3:
						color = '#D82E20'
						dragonContext = '龙'
						break

					case 2:
						color = '#346E25'
						dragonContext = '和'
						break
				}
				if (lighting !== '' && isLighting) {
					imgurl = this.createSVGUrl(lighting, '#FFFFFF', color)
				} else if (lighting > 0 && !isLighting) {
					let textColor = ''
					textColor = lighting === 1 ? '#FFFFFF' : '#f3935e'
					imgurl = this.createSVGUrl('7', textColor, color, pair)
				} else if (isDragon) {
					imgurl = this.createSVGUrl(dragonContext, '#FFFFFF', color)
				} else {
					sum === 0 && (imgurl = imgMap[`xian${pair}`]) // 闲
					sum === 1 && (imgurl = imgMap[`zhuang${pair}`]) // 庄
					sum === 2 && (imgurl = imgMap[`he${pair}`]) // 和
					sum === 3 && (trueSum === '庄6' && !isLighting ? (imgurl = imgMap[`liu${pair}`]) : (imgurl = imgMap[`zhuang${pair}`])) // 庄6
				}

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制大小珠盘路数据
	drawDXBeadPlateRoad(bigRoad, { width, move = 0 }) {
		const { nodes } = bigRoad
		const length = nodes.length
		const minus = 1
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = minus + col * width - width * move
				const y = minus + row * width
				const pair = nodes[index].basePair
				const bigSmall = nodes[index].baseBigSmall
				const win = nodes[index].baseWin
				let imgurl = ''
				let basePath = ''
				let path = ''

				if (win === 0) {
					if (bigSmall) {
						basePath = 'com_zyxz_red_da'
					} else {
						basePath = 'com_zyxz_red_xiao'
					}
				} else {
					if (bigSmall) {
						basePath = 'com_zyxz_blue_da'
					} else {
						basePath = 'com_zyxz_blue_xiao'
					}
				}

				pair === 0 && (path = `${basePath}1`) // 闲
				pair === 1 && (path = `${basePath}2`) // 庄
				pair === 2 && (path = `${basePath}3`) // 和
				pair === 3 && (path = `${basePath}2`) // 庄6

				imgurl = imgMap[path]

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制点数珠盘路数据
	drawPointBeadPlateRoad(bigRoad, { width, move = 0, radius = 10 }) {
		const { nodes } = bigRoad
		const length = nodes.length
		const minus = 1
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = minus + col * width - width * move
				const y = minus + row * width
				const win = nodes[index].baseWin
				const point = nodes[index].basePoint
				const map = { 0: '00', 1: '01', 2: '10', 3: '11' }
				let imgurl = ''
				let base = ''

				win === 0 && (base = 'b') // 闲
				win === 1 && (base = 'p') // 庄
				win === 2 && (base = 't') // 和
				win === 3 && (base = 'p') // 庄6

				imgurl = imgMap[`${base}_${map[win]}_${point}`]

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制龙宝珠盘路数据
	drawDragonBeadPlateRoad(bigRoad, { width, move = 0, radius = 10 }) {
		const { nodes } = bigRoad
		const length = nodes.length
		const minus = 1
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = minus + col * width - width * move
				const y = minus + row * width
				const win = nodes[index].baseWin
				const pair = nodes[index].basePair
				const dragon = nodes[index].baseDragon
				const map = { 0: '00', 1: '01', 2: '10', 3: '11' }
				let imgurl = ''

				if (dragon) {
					win === 0 && (imgurl = imgMap[`red_${map[win]}`]) // 闲
					win === 1 && (imgurl = imgMap[`blue_${map[win]}`]) // 庄
					win === 3 && (imgurl = imgMap[`blue_${map[win]}`]) // 庄6
				} else {
					win === 0 && (imgurl = imgMap[`xian${pair}`]) // 闲
					win === 1 && (imgurl = imgMap[`zhuang${pair}`]) // 庄
					win === 3 && (imgurl = imgMap[`zhuang${pair}`]) // 庄6
				}
				win === 2 && (imgurl = imgMap[`he${pair}`]) // 和

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制大路数据
	drawBigRoad(bigRoad, { width, move = 0 }) {
		const { nodes } = bigRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = col * width - move * width
				const y = row * width
				const trueNum = nodes[index].trueNum
				const baseColor = nodes[index].baseColor
				const lightning = nodes[index].lightning
				// const pair = nodes[index].pair
				let imgurl = ''
				if (baseColor === 0) {
					const color = '#1E51B4'
					if (lightning && lightning === 'big') {
						imgurl = this.createSvgBigRoadURl(color, true)
					} else if (lightning && lightning === 'samll') {
						imgurl = this.createSvgBigRoadURl(color, false)
					} else {
						imgurl = imgMap[`dl_lan_${trueNum}`]
					}
				}
				// else if (baseColor === 0 && pair === 1 && trueNum === 0) {
				// 	imgurl = require(`../../assets/bigRoad/lan/dl_lan_xian_dui.svg`)
				// } else if (baseColor === 0 && pair === 2 && trueNum===0) {
				// 	imgurl = require(`../../assets/bigRoad/lan/dl_lan_zhuang_dui_xian.svg`)
				// } else if (baseColor === 0 && pair === 3 && trueNum===0) {
				// 	imgurl = require(`../../assets/bigRoad/lan/dl_zhuang_xian_dui_lan.svg`)
				// }

				if (baseColor === 1) {
					const color = '#D82E20'
					if (lightning && lightning === 'big') {
						imgurl = this.createSvgBigRoadURl(color, true)
					} else if (lightning && lightning === 'samll') {
						imgurl = this.createSvgBigRoadURl(color, false)
					} else {
						imgurl = imgMap[`dl_hong_${trueNum}`]
					}
				}
				// else if (baseColor === 1 && pair === 1 && trueNum === 0) {
				// 	imgurl = require(`../../assets/bigRoad/hong/dl_hong_xian_dui.svg`)
				// } else if (baseColor === 1 && pair === 2 && trueNum===0) {
				// 	imgurl = require(`../../assets/bigRoad/hong/dl_hong_zhuang_dui.svg`)
				// } else if (baseColor === 1 && pair === 3 && trueNum===0) {
				// 	imgurl = require(`../../assets/bigRoad/hong/dl_zhuang_xian_dui.svg`)
				// }

				if (baseColor === 2) {
					const color = '#4C9C2C'
					if (lightning && lightning === 'big') {
						imgurl = this.createSvgBigRoadURl(color, true)
					} else if (lightning && lightning === 'samll') {
						imgurl = this.createSvgBigRoadURl(color, false)
					} else {
						imgurl = imgMap[`dl_lan_${trueNum}`]
					}
				}

				if (baseColor === 3) {
					const color = '#D82E20'
					if (lightning && lightning === 'big') {
						imgurl = this.createSvgBigRoadURl(color, true)
					} else if (lightning && lightning === 'samll') {
						imgurl = this.createSvgBigRoadURl(color, false)
					} else {
						imgurl = imgMap[`dl_hong_${trueNum}`]
					}
				}

				this._drawImg({
					imgurl,
					width: width - 3,
					x: x + 2,
					y: y + 2
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制输赢路数据
	drawWinLossRoad(winLossRoad, { width, move = 0 }) {
		const { nodes } = winLossRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = col * width - move * width
				const y = row * width
				const win = nodes[index].baseWin
				const color = nodes[index].trueColor
				let imgurl = ''

				if (win === 0) {
					imgurl = imgMap[`wei_${color}`]
				}
				if (win === 1) {
					imgurl = imgMap[`kuisun_${color}`]
				}
				if (win === 2) {
					imgurl = imgMap[`he_${color}`]
				}
				if (win === 3) {
					imgurl = imgMap[`yinli_${color}`]
				}

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制输赢路数据 - 对子 - 百家乐靴
	drawWinLossRoadWithPair(winLossRoad, { width, move = 0 }) {
		const { nodes } = winLossRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = col * width - move * width
				const y = row * width
				const pair = nodes[index].basePair
				const color = nodes[index].trueColor
				let imgurl = ''

				if (pair === 0) {
					imgurl = imgMap[`win_${color}0`]
				}
				// 图片2是闲对
				if (pair === 1) {
					imgurl = imgMap[`win_${color}2`]
				}
				if (pair === 2) {
					imgurl = imgMap[`win_${color}1`]
				}
				if (pair === 3) {
					imgurl = imgMap[`win_${color}3`]
				}

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制小路
	drawSmallRoad(smallRoad, { width }) {
		const { nodes } = smallRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		while (index < length) {
			if (nodes[index].baseValue) {
				const x = col * width
				const y = row * width
				let imgurl = ''

				if (nodes[index].trueColor === '蓝色') {
					imgurl = imgMap[`small-road-blue`]
				}

				if (nodes[index].trueColor === '红色') {
					imgurl = imgMap[`small-road-red`]
				}

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制小强路
	drawXQRoad(XQRoad, { width }) {
		const { nodes } = XQRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0
		// 大路需要将起始行列往前移动

		while (index < length) {
			if (nodes[index].baseValue) {
				if (nodes[index].baseColor) {
					this._drawRect({ width, row, col, fillStyle: 'red' })
				} else {
					this._drawRect({ width, row, col, fillStyle: 'blue' })
				}
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	// 绘制大眼路
	drawBigEyeRoad(bigEyeRoad, { width }) {
		const { nodes } = bigEyeRoad
		const length = nodes.length
		let row = 0 // 行
		let col = 0 // 列
		let index = 0

		// 大路需要将起始行列往前移动
		while (index < length) {
			if (nodes[index].baseValue) {
				const x = col * width
				const y = row * width
				let imgurl = ''

				if (nodes[index].trueColor === '蓝色') {
					imgurl = imgMap[`circle-blue`]
				}

				if (nodes[index].trueColor === '红色') {
					imgurl = imgMap[`circle-red`]
				}

				this._drawImg({
					imgurl,
					width: width - 1,
					x,
					y
				})
			}

			if (row < 5) {
				row++
			} else {
				row = 0
				col++
			}
			index++
		}
	}

	_drawLine(startX, startY, endX, endY) {
		this.ctx.beginPath()
		this.ctx.moveTo(startX + 0.5, startY + 0.5)
		this.ctx.lineTo(endX + 0.5, endY + 0.5)
		this.ctx.stroke()
		this.ctx.closePath()
	}

	// 画一般的空心圆和实心圆
	_drawArc({ strokeStyle, fillStyle, radius, x, y }) {
		this.ctx.strokeStyle = strokeStyle
		this.ctx.fillStyle = fillStyle
		this.ctx.beginPath()
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, true)
		fillStyle && this.ctx.fill()
		!fillStyle && this.ctx.stroke()
	}

	_drawRect({ fillStyle, width, col, row }) {
		const minus = width / 4
		this.ctx.lineWidth = 3
		this.ctx.fillStyle = fillStyle
		this.ctx.beginPath()
		this.ctx.moveTo(col * width, width - minus + row * width)
		this.ctx.lineTo(col * width + minus, width + row * width)
		this.ctx.lineTo(col * width + width, minus + row * width)
		this.ctx.lineTo(col * width + width - minus, row * width)
		this.ctx.fill()
	}

	_drawText({ text, x, y }) {
		this.ctx.fillStyle = '#ffffff'
		this.ctx.font = '12px Microsoft YaHei'
		this.ctx.textAlign = 'center'
		this.ctx.fillText(text, x, y)
	}

	async _drawImg({ imgurl, x, y, width }) {
		const result = await createImage(imgurl)
		this.ctx.drawImage(result, x, y, width, width)
	}

	_removeChildNodes(element) {
		while (element.hasChildNodes()) {
			element.removeChild(element.firstChild)
		}
	}
}

if (!window.imageElementMap) {
	window.imageElementMap = {}
}

function createImage(imgurl) {
	return new Promise((resolve, reject) => {
		if (window.imageElementMap[`${imgurl}`]) {
			resolve(window.imageElementMap[`${imgurl}`])
		} else {
			const element = new Image()
			element.onload = function() {
				window.imageElementMap[`${imgurl}`] = element
				resolve(element)
			}
			element.onerror = function() {
				reject(imgurl + ' 图片加载错误')
			}
			element.src = imgurl
		}
	})
}
