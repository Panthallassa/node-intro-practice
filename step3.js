const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleOutput(data, out) {
	if (out) {
		fs.writeFile(out, data, "utf8", (err) => {
			if (err) {
				console.error(`Couldn't write to ${out}:`, err);
				process.exit(1);
			}
		});
	} else {
		console.log(data);
	}
}

function cat(path, out) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(
				`Error reading file from path ${path}:`,
				err
			);
			process.exit(1);
		} else {
			handleOutput(data, out);
		}
	});
}

async function webCat(url, out) {
	try {
		const response = await axios.get(url);
		handleOutput(response.data, out);
	} catch (err) {
		console.error(`Error fetching ${url}:`);
		console.error(err);
		process.exit(1);
	}
}

function processArgs(args) {
	let out, pathOrUrl;
	if (args[0] === "--out") {
		out = args[1];
		pathOrUrl = args[2];
	} else {
		pathOrUrl = args[0];
	}

	if (!pathOrUrl) {
		console.error(
			"Please provide a file path or URL as an argument."
		);
		process.exit(1);
	}

	return { out, pathOrUrl };
}

function main() {
	const { out, pathOrUrl } = processArgs(
		process.argv.slice(2)
	);

	if (
		pathOrUrl.startsWith("http://") ||
		pathOrUrl.startsWith("https://")
	) {
		webCat(pathOrUrl, out);
	} else {
		cat(pathOrUrl, out);
	}
}

main();
