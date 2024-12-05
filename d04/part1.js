const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const grid = input.split('\n').filter(x => x).map(l => l.split(''));
	let count = 0;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (j < grid.length - 3) {
				const row = grid[i].slice(j, j + 4).join('');
				if (row == 'XMAS' || row == 'SAMX') count++;
			}
			if (i < grid.length - 3) {
				const col = grid.slice(i, i + 4).map(x => x[j]).join('');
				if (col == 'XMAS' || col == 'SAMX') count++;
			}
			if (i < grid.length - 3 && j < grid.length - 3) {
				const diag = grid.slice(i, i + 4).map((x, d) => x[j + d]).join('');
				if (diag == 'XMAS' || diag == 'SAMX') count++;
			}
			if (i < grid.length - 3 && j > 2) {
				const udg = grid.slice(i, i + 4).map((x, d) => x[j - d]).join('');
				if (udg == 'XMAS' || udg == 'SAMX') count++;
			}
		}
	}
	const output = count;
	await fs.writeFile('solution' + part, output + '\n');
})();
