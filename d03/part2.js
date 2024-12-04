const fs = require('fs').promises;

const part = 2;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const pdos = input.split('do()');
	const nstr = pdos.map(p => p.split('don\'t()')[0]).join('');
	const ops = Array.from(nstr.matchAll(/mul\(\d+,\d+\)/g)).flat(1);
	const parsed = ops.map(o => [parseInt(o.slice(4)), parseInt(o.split(',')[1])]);
	const output = parsed.reduce((c, n) => c + n[0] * n[1], 0);
	await fs.writeFile('solution' + part, output + '\n');
})();
