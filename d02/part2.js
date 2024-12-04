const fs = require('fs').promises;

const part = 2;
const test = false;

const safe = report => (f =>
		f.every(d => 1 <= d && d <= 3) ||
		f.every(d => -3 <= d && d <= -1)
	)(report.map((x, i, a) => x - a[i + 1]).filter(x => !isNaN(x)));

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const lines = input.split('\n').filter(x => x);
	const levels = lines.map(l => l.split(' ').map(x => parseInt(x)));
	const safes = levels.map(l =>
		safe(l) || l.some((a, i) => safe(l.filter((x, j) => i != j))));
	const output = safes.filter(s => s).length;
	await fs.writeFile('solution' + part, output + '\n');
})();
