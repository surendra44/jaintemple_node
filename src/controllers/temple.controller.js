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
  const templeData = req.body;
  const existingTemple = await templeService.getTempleById(templeId);
  console.log(templeId);
  if (!templeData.barcode) {
    templeData.barcode = {};
  } 
  console.log(files);
  console.log(JSON.stringify(templeData));
  try {
    if (templeData.homepageInfo) {
      templeData.homepageInfo = {};
      const homePhotoFile = files.find(file => file.fieldname === 'homepageInfo[homePhoto]');
      if (homePhotoFile) {
        console.log(existingTemple.homepageInfo.homePhoto);
        deleteFile(existingTemple.homepageInfo.homePhoto);
        templeData.homepageInfo.homePhoto = homePhotoFile.filename;
      }
    }
   

    if (!templeData.mediaPageInfo) {
      templeData.mediaPageInfo = [];
    }
    if (templeData.mediaPageInfo && Array.isArray(templeData.mediaPageInfo)) {
      templeData.mediaPageInfo.forEach((media, index) => {
        const mediaPhotoFile = files.find(file => file.fieldname === `mediaPageInfo[${index}][mediaPhoto]`);
        
        if (mediaPhotoFile) {
          deleteFile(existingTemple.mediaPageInfo[index].mediaPhoto);
          templeData.mediaPageInfo[index].mediaPhoto = mediaPhotoFile.filename;
        }
      });
    }




  if (templeData.commiteMemberInfo) {
    templeData.commiteMemberInfo = [];
    if (templeData.commiteMemberInfo && Array.isArray(templeData.commiteMemberInfo)) {
      templeData.commiteMemberInfo.forEach((media, index) => {
        const memeberPhotoFile = files.find(file => file.fieldname === `commiteMemberInfo[${index}][memeberPhoto]`);
        if (memeberPhotoFile) {
          deleteFile(existingTemple.commiteMemberInfo[index].memeberPhoto);
          templeData.commiteMemberInfo[index].memeberPhoto = memeberPhotoFile.filename;
        }
      });
    }
  }
  
  
  if (!templeData.barcode) {
    templeData.barcode = {};
  }
  const barcodephoto1 = files.find(file => file.fieldname === 'barcode[barcode1]');
  if (barcodephoto1) {
    templeData.barcode.barcode1 = barcodephoto1.filename;
  }
  const barcodephoto2 = files.find(file => file.fieldname === 'barcode[barcode2]');
  if (barcodephoto2) {
    templeData.barcode.barcode2 = barcodephoto2.filename;
  }

  const maharajJiPhoto = files.filter(file => file.fieldname.startsWith('maharajJiInfo')).map(file => file.filename);
  if (maharajJiPhoto && maharajJiPhoto.length > 0) {
    templeData.maharajJiInfo = maharajJiPhoto.map((data, index) => ({
      ...templeData.maharajJiInfo[index], 
      maharajPhoto: data, 
    }));
  }
      const result = await templeService.updateTemple(templeId, templeData);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }

  };


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
  

  

