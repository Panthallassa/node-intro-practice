const fs = require("fs");
const process = require("process");
const axios = require("axios");

// Function to read file contents and print them
function cat(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(
				`Error reading file from path ${path}:`,
				err
			);
			process.exit(1);
		} else {
			console.log(data);
		}
	});
}

// Function to fetch content from a url and print it
async function webCat(url) {
	try {
		const res = await axios.get(url);
		console.log(res.data);
	} catch (err) {
		console.error(`Error fetching ${url}:`);
		console.error(err);
		process.exit(1);
	}
}

const pathOrUrl = process.argv[2];

if (!pathOrUrl) {
	console.error(
		"Please provide a file path or URL as an argument."
	);
	process.exit(1);
}

if (
	pathOrUrl.startsWith("http://") ||
	pathOrUrl.startsWith("https://")
) {
	webCat(pathOrUrl);
} else {
	cat(pathOrUrl);
}
