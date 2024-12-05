const fs = require('fs').promises;

const part = 2;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const grid = input.split('\n').filter(x => x).map(l => l.split(''));
	let count = 0;
	for (let i = 1; i < grid.length - 1; i++) {
		for (let j = 1; j < grid.length - 1; j++) {
			if (grid[i][j] != 'A') continue;
			const x = grid[i - 1][j - 1] + grid[i - 1][j + 1] + grid[i + 1][j - 1] + grid[i + 1][j + 1];
			if (['MMSS', 'MSMS', 'SMSM', 'SSMM'].includes(x)) count++;
		}
	}
	const output = count;
	await fs.writeFile('solution' + part, output + '\n');
})();
