import { decode } from './base64Utils'

// 解路纸
class RoadUtils {
	constructor(base64String) {
		this._pointer = 0
		const buf = decode(base64String)
		this._bitString = this.getBits(buf)
	}
	getBits(buf) {
		const bytesArray = new Uint8Array(buf)
		const _legnth = bytesArray.length
		let str = ''
		for (let i = 0; i < _legnth; i++) {
			const item = bytesArray[i]
			const bitsStr = item.toString(2)
			str += this.coverZero(8 - bitsStr.length)
			str += bitsStr
		}
		return str
	}
	coverZero(count) {
		let tempStr = ''
		for (let i = 0; i < count; i++) {
			tempStr += '0'
		}
		return tempStr
	}
	getNextInteger(size) {
		const int = parseInt(this._bitString.substr(this._pointer, size), 2)
		this._pointer += size
		return int
	}
}

export default RoadUtils
