/** @format */

export function formatSize(bytes: number): string {
	if (bytes < 1024) {
		return `${bytes} bytes`;
	}

	const kb = bytes / 1024;
	if (kb < 1024) {
		return `${kb.toFixed(1)} KB`;
	}

	const mb = kb / 1024;
	if (mb < 1024) {
		return `${mb.toFixed(1)} MB`;
	}

	const gb = mb / 1024;
	return `${gb.toFixed(1)} GB`;
}

/**
 * crypto.randomUUID() is a native browser method used to generate a universally unique
 * identifier (UUID) without needing external libraries
 */
export const generateUUID = () => crypto.randomUUID();
