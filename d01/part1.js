const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const lines = input.split('\n').filter(x => x);
	const left = lines.map(line => parseInt(line));
	const right = lines.map(line => parseInt(line.slice(8)));
	left.sort((a, b) => a - b); right.sort((a, b) => a - b);
	const output = left.reduce((c, n, i) => c + Math.abs(n - right[i]), 0)
	await fs.writeFile('solution' + part, output + '\n');
})();
