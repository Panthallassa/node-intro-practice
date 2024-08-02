const fs = require("fs");
const process = require("process");

// function to rea file contents and print them
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

const path = process.argv[2];

if (!path) {
	console.error(
		"Please provide a file path as an argument."
	);
	process.exit(1);
}

// Call the cat function
cat(path);
