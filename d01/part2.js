const fs = require('fs').promises;

const part = 2;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const lines = input.split('\n').filter(x => x);
	const left = lines.map(line => parseInt(line));
	const right = lines.map(line => parseInt(line.slice(8)));
	const bank = [];
	const scores = left.map(v => bank[v] ?? (bank[v] = right.filter(x => x == v).length * v))
	const output = scores.reduce((c, n) => c + n, 0);
	await fs.writeFile('solution' + part, output + '\n');
})();
