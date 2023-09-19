/**
 * Process a single file field in the data and update it if a new file is provided.
 * @param {Object} data - The data to update.
 * @param {string} fieldname - The fieldname for the file.
 * @param {string} existingFilename - The existing filename (if any).
 * @param {Array} files - Array of uploaded files.
 * @returns {Object} - Updated data.
 */

export const deleteFile = async (filePath) => {
    console.log("diiii============")
    const fullPath = path.join(__dirname, '..', '..', 'uploads', filePath); // Adjust the path to match your project structure
    console.log(`fullPath ${fullPath}`);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    } else {
      console.log(`File not found: ${fullPath}`);
    }
  }


export const processFiles = (data, fieldname, existingFilename, files) => {
    const file = files.find((file) => file.fieldname === fieldname);
  
    if (file) {
      if (existingFilename && existingFilename !== file.filename) {
        deleteFile(existingFilename);
      }
  
      data = {
        ...data,
        [fieldname]: file.filename,
      };
    } else if (!data) {
      data = undefined;
    }
  
    return data;
  };
  
  /**
   * Process an array of file fields in the data and update them if new files are provided.
   * @param {Array} dataArray - The array of data to update.
   * @param {string} arrayFieldname - The fieldname of the array.
   * @param {Array} existingDataArray - The existing array of data (if any).
   * @param {Array} files - Array of uploaded files.
   * @returns {Array} - Updated array of data.
   */
  export const processArrayFiles = (dataArray, arrayFieldname, existingDataArray, files) => {
    if (!Array.isArray(dataArray)) {
      dataArray = [];
    }
  
    dataArray = dataArray.map((data, index) => {
      const fieldname = `${arrayFieldname}[${index}]`;
  
      if (existingDataArray[index]) {
        const existingFilename = existingDataArray[index].mediaPhoto; // Update this based on your fieldname structure
        const file = files.find((file) => file.fieldname === `${fieldname}[mediaPhoto]`);
  
        if (file) {
          if (existingFilename && existingFilename !== file.filename) {
            deleteFile(existingFilename);
          }
  
          return {
            ...data,
            [fieldname]: {
              ...data[fieldname],
              mediaPhoto: file.filename,
            },
          };
        }
      } else {
        return data;
      }
    });
  
    return dataArray;
  };
  