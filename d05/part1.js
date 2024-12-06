const fs = require('fs').promises;

const part = 1;
const test = false;

(async () => {
	const input = await fs.readFile(test ? 'test' : 'input', { encoding: 'utf8' });
	const [rulest, pagest] = input.split('\n\n');
	const rules = rulest.split('\n').filter(x => x);
	const pages = pagest.split('\n').filter(x => x).map(l => l.split(','));
	let total = 0;
	pages.forEach(pagel => {
		if (pagel.every((pn, i) => pagel.slice(i + 1).every(pt => !rules.includes(pt + '|' + pn))))
			total += parseInt(pagel[Math.floor(pagel.length / 2)]);
	});
	const output = total;
	await fs.writeFile('solution' + part, output + '\n');
})();
