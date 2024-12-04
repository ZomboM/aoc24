const fs = require('fs').promises;

// TODO change these
const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });

	const output = 'TEMPLATE'; // TODO change this
	await fs.writeFile('solution' + part, output + '\n');
})();
