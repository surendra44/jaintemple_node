import httpStatus from "http-status";
const upload = require('../middleware/uploadFile')
import { successResponse, errorResponse } from "../helpers";
import { filter } from "lodash";
const { templeService } = require('../services');
const fs = require('fs');
const path = require('path');

// Controller to handle temple registration
export const registerTemple = async (req, res) => {
  try {
    const files = req.files
    console.log(files);
    const templeData = req.body;
   
    
    console.log(templeData);
    const homePhotoFile = files.find(file => file.fieldname === 'homepageInfo[homePhoto]');
    if (homePhotoFile) {
      const homePhotoPath = homePhotoFile.filename;
      templeData.homepageInfo.homePhoto = homePhotoPath;
    }
    const mediaphoto =  files.filter((file)=>file.fieldname.startsWith('mediaPageInfo')).map((e)=>e.filename)
    if (mediaphoto) {
      mediaphoto.map((data,index)=>templeData.mediaPageInfo[index].mediaPhoto= data )
    }
    const blogphoto =  files.filter((file)=>file.fieldname.startsWith('blogPageInfo')).map((e)=>e.filename)
    if (blogphoto) {
      blogphoto.map((data,index)=>templeData.blogPageInfo[index].blogphoto= data )
    }
    const newsmediaPhoto =  files.filter((file)=>file.fieldname.startsWith('newsPageInfo')).map((e)=>e.filename)
    if (newsmediaPhoto) {
      newsmediaPhoto.map((data,index)=>templeData.newsPageInfo[index].newsmediaPhoto= data )
    }
    const commiteMemberphoto =  files.filter((file)=>file.fieldname.startsWith('commiteMemberInfo')).map((e)=>e.filename)
    if (commiteMemberphoto) {
    commiteMemberphoto.map((data,index)=>templeData.commiteMemberInfo[index].memeberPhoto= data )
    }

    const barcodephoto1 = files.find(file => file.fieldname === 'barcode[barcode1]');
    const barcodephoto2 = files.find(file => file.fieldname === 'barcode[barcode2]');
    templeData.barcode = {};
    if (barcodephoto1) {
      templeData.barcode.barcode1 = barcodephoto1.filename;
    }
    if (barcodephoto2) {
      templeData.barcode.barcode2 = barcodephoto2.filename;
    }

    const normalTiming = files.find(file => file.fieldname === 'artiTime[normalTiming]');
    const eventTiming = files.find(file => file.fieldname === 'artiTime[eventTiming]');
    templeData.artiTime = {};
    if (normalTiming) {
      templeData.artiTime.normalTiming = normalTiming.filename;
    }
    if (barcodephoto2) {
      templeData.artiTime.eventTiming = eventTiming.filename;
    }


    const maharajJiphoto =  files.filter((file)=>file.fieldname.startsWith('maharajJiInfo')).map((e)=>e.filename)
    if (maharajJiphoto) {
      maharajJiphoto.map((data,index)=>templeData.maharajJiInfo[index].maharajPhoto= data )
    }
    const eventphoto =  files.filter((file)=>file.fieldname.startsWith('eventPageInfo')).map((e)=>e.filename)
    if (eventphoto) {
      eventphoto.map((data,index)=>templeData.eventPageInfo[index].eventPhoto= data )
    }

    const result = await templeService.addtemple(templeData);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}




const deleteFile = async (filePath) => {
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


export const updateTemple = async (req, res) => {
  const templeId = req.params.id;
  const files = req.files;
  console.log(files);
  const templeData = req.body;
  const existingTemple = await templeService.getTempleById(templeId);
  try {

    if (templeData.homepageInfo) {
      if (typeof templeData.homepageInfo !== 'object') {
        templeData.homepageInfo = {};
      }
    
      const homePhotoFile = files.find(file => file.fieldname === 'homepageInfo[homePhoto]');
      if (homePhotoFile) {
        if (existingTemple.homepageInfo.homePhoto !== templeData.homepageInfo.homePhoto) {
          deleteFile(existingTemple.homepageInfo.homePhoto);
        }
        templeData.homepageInfo.homePhoto = homePhotoFile.filename;
      }
    } else {
      templeData.homepageInfo = undefined; // Set it to undefined if it doesn't exist in the updated data
    }

    if (templeData.mediaPageInfo) {
      templeData.mediaPageInfo.forEach((media, index) => {
        const mediaPhotoFile = files.find(file => file.fieldname === `mediaPageInfo[${index}][mediaPhoto]`);
        if (mediaPhotoFile) {
          if (existingTemple.mediaPageInfo[index] && existingTemple.mediaPageInfo[index].mediaPhoto !== mediaPhotoFile.filename) {
            deleteFile(existingTemple.mediaPageInfo[index].mediaPhoto);
          }
          if (!templeData.mediaPageInfo[index]) {
            templeData.mediaPageInfo[index] = {};
          }
          templeData.mediaPageInfo[index].mediaPhoto = mediaPhotoFile.filename;
        }
      });
    }


    if (Array.isArray(files)) {
      // Iterate through each file object in the array
      files.forEach(file => {
        if (file.fieldname.startsWith('artiTime')) {
          // Check if the fieldname starts with 'artiTime'
          const fieldnameParts = file.fieldname.split('['); // Split the fieldname by '['
          const timingType = fieldnameParts[1].slice(0, -1); // Get the timing type (either 'normalTiming' or 'eventTiming')
    
          // Initialize templeData.artiTime as an empty object if it doesn't exist
          if (!templeData.artiTime) {
            templeData.artiTime = {};
          }
    
          // Process the file based on timingType
          if (timingType === 'normalTiming') {
            if (existingTemple.artiTime && existingTemple.artiTime.normalTiming !== file.filename) {
              deleteFile(existingTemple.artiTime.normalTiming);
            }
            templeData.artiTime.normalTiming = file.filename;
          } else if (timingType === 'eventTiming') {
            if (existingTemple.artiTime && existingTemple.artiTime.eventTiming !== file.filename) {
              deleteFile(existingTemple.artiTime.eventTiming);
            }
            templeData.artiTime.eventTiming = file.filename;
          }
        }
      });
    } else {
      templeData.artiTime = undefined;
    }
    
    

    if (templeData.blogPageInfo) {
      templeData.blogPageInfo.forEach((blog, index) => {
        const blogPhotoFile = files.find(file => file.fieldname === `blogPageInfo[${index}][blogPhoto]`);
        if (blogPhotoFile) {
          if (existingTemple.blogPageInfo[index] && existingTemple.blogPageInfo[index].blogPhoto !== blogPhotoFile.filename) {
            deleteFile(existingTemple.blogPageInfo[index].blogPhoto);
          }
          if (!templeData.blogPageInfo[index]) {
            templeData.blogPageInfo[index] = {};
          }
          templeData.blogPageInfo[index].blogPhoto = blogPhotoFile.filename;
        }
      });
    }


    if (templeData.newsPageInfo) {
      templeData.newsPageInfo.forEach((news, index) => {
        const newsPhotoFile = files.find(file => file.fieldname === `newsPageInfo[${index}][newsmediaPhoto]`);
        if (newsPhotoFile) {
          if (existingTemple.newsPageInfo[index] && existingTemple.newsPageInfo[index].newsmediaPhoto !== newsPhotoFile.filename) {
            deleteFile(existingTemple.newsPageInfo[index].newsmediaPhoto);
          }
          if (!templeData.newsPageInfo[index]) {
            templeData.newsPageInfo[index] = {};
          }
          templeData.newsPageInfo[index].newsmediaPhoto = newsPhotoFile.filename;
        }
      });
    }


    if (templeData.commiteMemberInfo) {
      if (!Array.isArray(templeData.commiteMemberInfo)) {
        templeData.commiteMemberInfo = [];
      }
      
      templeData.commiteMemberInfo.forEach((member, index) => {
        const memberPhotoFile = files.find(file => file.fieldname === `commiteMemberInfo[${index}][memeberPhoto]`);
        if (memberPhotoFile) {
          if (!existingTemple.commiteMemberInfo[index]) {
            existingTemple.commiteMemberInfo[index] = {};
          }
          if (existingTemple.commiteMemberInfo[index].memeberPhoto !== memberPhotoFile.filename) {
            deleteFile(existingTemple.commiteMemberInfo[index].memeberPhoto);
          }
          templeData.commiteMemberInfo[index].memeberPhoto = memberPhotoFile.filename;
        }
      });
    }
  
  
    if (Array.isArray(files)) {
      // Iterate through each file object in the array
      files.forEach(file => {
        if (file.fieldname.startsWith('barcode')) {
          // Check if the fieldname starts with 'barcode'
          const fieldnameParts = file.fieldname.split('['); // Split the fieldname by '['
          const barcodeType = fieldnameParts[1].slice(0, -1); // Get the barcode type (e.g., 'barcode1' or 'barcode2')
    
          // Initialize templeData.barcode as an empty object if it doesn't exist
          if (!templeData.barcode) {
            templeData.barcode = {};
          }
    
          // Process the file based on barcodeType
          if (barcodeType === 'barcode1') {
            if (existingTemple.barcode && existingTemple.barcode.barcode1 !== file.filename) {
              deleteFile(existingTemple.barcode.barcode1);
            }
            templeData.barcode.barcode1 = file.filename;
          } else if (barcodeType === 'barcode2') {
            if (existingTemple.barcode && existingTemple.barcode.barcode2 !== file.filename) {
              deleteFile(existingTemple.barcode.barcode2);
            }
            templeData.barcode.barcode2 = file.filename;
          }
        }
      });
    } else {
      templeData.barcode = undefined;
    }
    

    if (templeData.maharajJiInfo) {
      if (!Array.isArray(templeData.maharajJiInfo)) {
        templeData.maharajJiInfo = [];
      }
    
      templeData.maharajJiInfo.forEach((maharajJi, index) => {
        const maharajPhotoFile = files.find(file => file.fieldname === `maharajJiInfo[${index}][maharajPhoto]`);
        if (maharajPhotoFile) {
          if (!existingTemple.maharajJiInfo[index]) {
            existingTemple.maharajJiInfo[index] = {};
          }
          if (existingTemple.maharajJiInfo[index].maharajPhoto !== maharajPhotoFile.filename) {
            deleteFile(existingTemple.maharajJiInfo[index].maharajPhoto);
          }
          templeData.maharajJiInfo[index].maharajPhoto = maharajPhotoFile.filename;
        }
      });
    }


    if (templeData.eventPageInfo) {
      if (!Array.isArray(templeData.eventPageInfo)) {
        templeData.eventPageInfo = [];
      }
    
      templeData.eventPageInfo.forEach((evnet, index) => {
        const eventPhotoFile = files.find(file => file.fieldname === `eventPageInfo[${index}][eventPhoto]`);
        if (eventPhotoFile) {
          if (!existingTemple.eventPageInfo[index]) {
            existingTemple.eventPageInfo[index] = {};
          }
          if (existingTemple.eventPageInfo[index].eventPhoto !== eventPhotoFile.filename) {
            deleteFile(existingTemple.eventPageInfo[index].eventPhoto);
          }
          templeData.eventPageInfo[index].eventPhoto = eventPhotoFile.filename;
        }
      });
    }


   const updateData = {
      $set: templeData,
    };
      const result = await templeService.updateTemple(templeId, updateData);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }



  export const deleteTemple = async (req, res) => {
    try {
      const templeId = req.params.id;
      const result = await templeService.deleteTemple(templeId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  export const getTempleById = async(req, res)=> {
    try {
      const templeId = req.params.id;
      const result = await templeService.getTempleById(templeId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getAllTemples = async(req, res)=>  {
    try {
      const result = await templeService.getAllTemples();
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
  

  

