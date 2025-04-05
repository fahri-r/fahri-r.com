import path from 'path';

const IMAGE_PATH = `src/images/posts`;

// IMPORTANT: This bit is required to allow dynamic importing of images via Astro & Vite
// postImageImport allows dynamically import images from local filesystem via Vite with variable names
export async function postImageImport(imageFileName: string) {
	// Image paths must be relative, and end with file extension to work in Vite build process
	// See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#meta
	const filename = path.parse(imageFileName);
	const name = filename.name;
	const ext = filename.ext;
	const relativePath = '../../public/images/posts';

	if (!name) {
		console.warn('No image, skipping', imageFileName);
		return;
	}

	switch (ext) {
		case '.webp':
			return await import(`${relativePath}/${name}.webp`);
		case '.jpg':
			return await import(`${relativePath}/${name}.jpg`);
		case '.png':
			return await import(`${relativePath}/${name}.png`);
		case '.svg':
			return await import(`${relativePath}/${name}.svg`);
		case '.gif':
			return await import(`${relativePath}/${name}.gif`);
		case '.avif':
			return await import(`${relativePath}/${name}.avif`);
		case '.jpeg':
			return await import(`${relativePath}/${name}.jpeg`);
		case '.bmp':
			return await import(`${relativePath}/${name}.bmp`);
		default:
			return await import(`${relativePath}/${name}.jpg`);
	}

	/*
  The returned imported image results are in this format:

  {
    default: {
      src: '/@fs/Users/json/Projects/astronot/src/images/posts/4f9edb242363447c8ed31c88e86fcb1766a93d2b938bf25c2528d52da4dc478b-cover.jpg?origWidth=1500&origHeight=1397&origFormat=jpg',
      width: 1500,
      height: 1397,
      format: 'jpg',
      orientation: 1
    },
    [Symbol(Symbol.toStringTag)]: 'Module'
  }
  */
}
