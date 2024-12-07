const fs = require('fs').promises;

const part = 2;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const ogrid = input.split('\n').filter(x => x).map(l => l.split(''));
	const [width, height] = [ogrid[0].length, ogrid.length];
	const inbounds = p => p[0] >= 0 && p[0] < height && p[1] >= 0 && p[1] < width;
	const checkLoops = (grid, i, j) => {
		grid[i][j] = '#';
		let guard = grid.map((l, i) => [i, l.indexOf('^')]).filter(x => x[1] >= 0)[0];
		let dir = 0;
		const visited = new Set();
		while (1) {
			let state = `${guard[0]},${guard[1]},${dir}`
			let next = [guard[0] + (dir % 2 - 1) * (1 - dir), guard[1] + (dir % 2) * (2 - dir)];
			if (!inbounds(next)) break;
			if (grid[next[0]][next[1]] == '.' || grid[next[0]][next[1]] == '^') {
				guard = next;
			} else {
				while(1) {
					dir = (dir + 1) % 4;
					next = [guard[0] + (dir % 2 - 1) * (1 - dir), guard[1] + (dir % 2) * (2 - dir)];
					if (!inbounds(next)) break;
					if (grid[next[0]][next[1]] != '#') break;
				}
				if (!inbounds(next)) break;
			}
			if (visited.has(state)) return 1;
			visited.add(state);
		}
		return 0;
	}
	let num = 0;
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (ogrid[i][j] != '.') continue;
			const check = ogrid.map(x => x.map(x => x));
			num += checkLoops(check, i, j);
		}
	}
	const output = num;
	await fs.writeFile('solution' + part, output + '\n');
})();
