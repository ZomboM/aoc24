const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const lines = input.split('\n').filter(x => x);
	const levels = lines.map(l => l.split(' ').map(x => parseInt(x)));
	const steps = levels.map(l => l.map((x, i, a) => x - a[i + 1]).filter(x => !isNaN(x)));
	const safes = steps.map(l => l.every(d => 1 <= d && d <= 3) || l.every(d => -3 <= d && d <= -1));
	const output = safes.filter(s => s).length;
	await fs.writeFile('solution' + part, output + '\n');
})();
