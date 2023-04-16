interface ImportRow {
  front: string;
  back: string;
}

/**
 * Import a file and return an array of rows
 * @param file - The file to import
 */
export function importFile(file: File): Promise<ImportRow[]> {
  const reader = new FileReader();
  const rows: ImportRow[] = [];

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Failed to read file"));
    };

    reader.onload = () => {
      const contents = reader.result as string;
      const lines = contents.split(/\r?\n/);

      // Parse each row and add it to the rows array
      for (let i = 0; i < lines.length; i++) {
        const columns = lines[i].split("\t"); // Change to "," for CSV files
        if (columns.length === 2) {
          const row: ImportRow = {
            front: columns[0].trim(),
            back: columns[1].trim(),
          };
          rows.push(row);
        }
      }

      resolve(rows);
    };

    reader.readAsText(file);
  });
}
