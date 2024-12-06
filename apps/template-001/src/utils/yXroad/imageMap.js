const imgMap = {}

// 添加庄闲和6
;['zhuang', 'xian', 'he', 'liu'].forEach((name) => {
	Array.from({ length: 4 }).forEach((key, index) => {
		imgMap[`${name}${index}`] = require(`../../assets/beadPlate/${name}${index +
			1}.svg`)
	})
})

// 添加点数珠盘
;[
	'b_00',
	'b_01',
	'b_10',
	'b_11',
	'p_00',
	'p_01',
	'p_10',
	'p_11',
	't_00',
	't_01',
	't_10',
	't_11'
].forEach((name) => {
	Array.from({ length: 10 }).forEach((item, index) => {
		imgMap[
			`${name}_${index}`
		] = require(`../../assets/dsBeadPlate/${name}/${index}.png`)
	})
})

// 添加龙宝珠盘
;[
	'red_00',
	'red_01',
	'red_10',
	'red_11',
	'blue_00',
	'blue_01',
	'blue_10',
	'blue_11'
].forEach((color) => {
	imgMap[`${color}`] = require(`../../assets/lbBeadPlate/${color}.png`)
})

// 添加大小珠盘
;[
	'com_zyxz_blue_da',
	'com_zyxz_blue_xiao',
	'com_zyxz_red_da',
	'com_zyxz_red_xiao'
].forEach((name) => {
	Array.from({ length: 4 }).forEach((item, index) => {
		imgMap[
			`${name}${index + 1}`
		] = require(`../../assets/dxBeadPlate/${name}${index + 1}.svg`)
	})
})

// 添加大眼路
imgMap[
	'big-eye-road-blue'
] = require(`../../assets/big_eye_road/com_zylu_dyz_lan.png`)
imgMap[
	'big-eye-road-red'
] = require(`../../assets/big_eye_road/com_zylu_dyz_hong.png`)

// 添加小路
imgMap['small-road-blue'] = require(`../../assets/bigRoad/com_zy_xl_lan.svg`)
imgMap['small-road-red'] = require(`../../assets/bigRoad/com_zy_xl_hong.svg`)

// 添加小路的图
imgMap['circle-blue'] = require(`../../assets/bigRoad/circle-blue.svg`)
imgMap['circle-red'] = require(`../../assets/bigRoad/circle-red.svg`)
imgMap['circle-lv'] = require(`../../assets/bigRoad/circle-lv.svg`)

// 添加大路的图
;['lan', 'hong'].forEach((color) => {
	Array.from({ length: 16 }).forEach((i, index) => {
		imgMap[
			`dl_${color}_${index}`
		] = require(`../../assets/bigRoad/${color}/dl_${color}${index}.svg`)
	})
})

// 添加输赢路
;['yinli', 'kuisun', 'he', 'wei'].forEach((name) => {
	['hong', 'lan', 'lv'].forEach((color) => {
		imgMap[
			`${name}_${color}`
		] = require(`../../assets/winLossRoad/${name}_${color}.svg`)
	})
})

// 添加输赢路在百家乐靴的路纸
Array.from({ length: 4 }).forEach((i, index) => {
	['hong', 'lan', 'lv'].forEach((color) => {
		imgMap[
			`win_${color}${index}`
		] = require(`../../assets/winLossRoad/${color}/win_${color}${index}.svg`)
	})
})

export default imgMap
