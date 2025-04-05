export function sanitizeUrl(str: string) {
	return str
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric characters with hyphens
		.replace(/(^-|-$)+/g, ''); // remove leading/trailing hyphens
}
