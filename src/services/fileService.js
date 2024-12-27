const path = require('path');

const uploadSingleFile = async (fileObject) => {
    //create path to upload folder
    let uploadPath = path.resolve(__dirname, '../public/images/upload');

    //get img extention
    let extName = path.extname(fileObject.name);

    //get img's name (without extention)
    let baseName = path.basename(fileObject.name, extName)

    //create final name and path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    // Use the mv() method to place the file somewhere on your server
    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (error) {
        console.log('check error: ', error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }
}

const uploadMultipleFile = async (fileArr) => {
    try {
        let uploadPath = path.resolve(__dirname, '../public/images/upload');
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < fileArr.length; i++) {
            //get img extention
            let extName = path.extname(fileArr[i].name);

            //get img's name (without extention)
            let baseName = path.basename(fileArr[i].name, extName)

            //create final name and path
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            // Use the mv() method to place the file somewhere on your server
            try {
                await fileArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: fileArr[i].name,
                    error: null
                });
                countSuccess++;
            } catch (error) {
                console.log('check error: ', error);
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: fileArr[i].name, 
                    error: JSON.stringify(error)
                });
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFile
}