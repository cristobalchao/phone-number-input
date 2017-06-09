export function getSplitValues(min=0, max=999) {
	return {
		min,
		max,
		value: parseInt(((max - min) / 2) + min, 10)
	}
}

export function updateSplitValues(index, values, type) {
	return [...values].map((value, valueIndex) => {
		if (index === valueIndex && type === 'greater') {
			return getSplitValues(values[index].value, values[index].max);
		}

		if (index === valueIndex && type === 'less') {
			return getSplitValues(values[index].min, values[index].value);
		}

		return value;
	});
}
