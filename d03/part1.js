const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const ops = Array.from(input.matchAll(/mul\(\d+,\d+\)/g)).flat(1);
	const parsed = ops.map(o => [parseInt(o.slice(4)), parseInt(o.split(',')[1])]);
	const output = parsed.reduce((c, n) => c + n[0] * n[1], 0);
	await fs.writeFile('solution' + part, output + '\n');
})();
