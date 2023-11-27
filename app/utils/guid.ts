function guid() {
	// S4函数用于生成4位的十六进制数
	const S4 = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}

	// guid函数返回一个UUID
	return (
		S4() +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		"-" +
		S4() +
		S4() +
		S4()
	)
}
export { guid }
