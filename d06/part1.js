const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const grid = input.split('\n').filter(x => x).map(l => l.split(''));
	const [width, height] = [grid[0].length, grid.length];
	const inbounds = p => p[0] >= 0 && p[0] < height && p[1] >= 0 && p[1] < width;
	let guard = grid.map((l, i) => [i, l.indexOf('^')]).filter(x => x[1] >= 0)[0];
	let dir = [-1, 0];
	const visited = Array(width).fill().map(x => Array(height).fill(0))
	while (1) {
		visited[guard[0]][guard[1]]++;
		const next = [guard[0] + dir[0], guard[1] + dir[1]];
		if (!inbounds(next)) break;
		if (grid[next[0]][next[1]] == '.' || grid[next[0]][next[1]] == '^') {
			guard = next;
		} else {
			dir = [dir[1], -dir[0]];
			guard = [guard[0] + dir[0], guard[1] + dir[1]];
		}
	}
	const output = visited.reduce((c, n) => c + n.filter(x => x).length, 0);
	await fs.writeFile('solution' + part, output + '\n');
})();
