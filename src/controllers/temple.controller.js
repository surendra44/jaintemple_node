import httpStatus from "http-status";
const upload = require('../middleware/uploadFile')
import { successResponse, errorResponse } from "../helpers";
import { filter } from "lodash";
const { templeService } = require('../services');

// Controller to handle temple registration
export const registerTemple = async (req, res) => {
  try {
    const files = req.files;
    console.log(files);
    const templeData = req.body;

    console.log(templeData);
    const homePhotoFile = files.find(file => file.fieldname === 'homepageInfo[homePhoto]');
    if (homePhotoFile) {
      const homePhotoPath = homePhotoFile.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
      templeData.homepageInfo.homePhoto = homePhotoPath;
    }
    
    const mediaphoto = files.filter(file => file.fieldname.startsWith('mediaPageInfo')).map(file => file.path);
    if (mediaphoto && mediaphoto.length > 0) {
      templeData.mediaPageInfo = mediaphoto.map((data, index) => ({
        ...templeData.mediaPageInfo[index],
        mediaPhoto: data.replace(/\\/g, '/'), // Replace backslashes with forward slashes
      }));
    }
    
    const commiteMemberphoto = files.filter(file => file.fieldname.startsWith('commiteMemberInfo')).map(file => file.path);
    if (commiteMemberphoto && commiteMemberphoto.length > 0) {
      templeData.commiteMemberInfo = commiteMemberphoto.map((data, index) => ({
        ...templeData.commiteMemberInfo[index],
        memeberPhoto: data.replace(/\\/g, '/'), // Replace backslashes with forward slashes
      }));
    }

    const barcodephoto1 = files.find(file => file.fieldname === 'barcode[barcode1]');
    const barcodephoto2 = files.find(file => file.fieldname === 'barcode[barcode2]');
    templeData.barcode = {};
    if (barcodephoto1) {
      templeData.barcode.barcode1 = barcodephoto1.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    }
    if (barcodephoto2) {
      templeData.barcode.barcode2 = barcodephoto2.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    }

    const maharajJiphoto = files.filter(file => file.fieldname.startsWith('maharajJiInfo')).map(file => file.path);
    if (maharajJiphoto && maharajJiphoto.length > 0) {
      templeData.maharajJiInfo = maharajJiphoto.map((data, index) => ({
        ...templeData.maharajJiInfo[index],
        maharajPhoto: data.replace(/\\/g, '/'), // Replace backslashes with forward slashes
      }));
    }

    const result = await templeService.addtemple(templeData);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};




export const updateTemple = async (req, res) => {
  const templeId = req.params.id;
  const files = req.files;
  const templeData = req.body;
  if (!templeData.barcode) {
    templeData.barcode = {};
  } 
  console.log(files);
  console.log(templeData);
  try {
    if (!templeData.homepageInfo) {
      templeData.homepageInfo = {};
    }
    const homePhotoFile = files.find(file => file.fieldname === 'homepageInfo[homePhoto]');
    if (homePhotoFile) {
      templeData.homepageInfo.homePhoto = homePhotoFile.path;
    }
    if (!templeData.mediaPageInfo) {
      templeData.mediaPageInfo = [];
   }
    const mediaphoto = files.filter(file => file.fieldname.startsWith('mediaPageInfo')).map(file => file.path);
    if (mediaphoto && mediaphoto.length > 0) {
      templeData.mediaPageInfo = mediaphoto.map((data, index) => ({
        ...templeData.mediaPageInfo[index], // Preserve existing properties if they exist
        mediaPhoto: data,
      }));
    }

  if (!templeData.commiteMemberInfo) {
    templeData.commiteMemberInfo = [];
  }
  const commiteMemberPhoto = files.filter(file => file.fieldname.startsWith('commiteMemberInfo')).map(file => file.path);
  if (commiteMemberPhoto && commiteMemberPhoto.length > 0) {
    templeData.commiteMemberInfo = commiteMemberPhoto.map((data, index) => ({
      ...templeData.commiteMemberInfo[index], // Preserve existing properties if they exist
      memeberPhoto: data, // Use 'memeberPhoto' as the fieldname
    }));
  }
  if (!templeData.barcode) {
    templeData.barcode = {};
  }
  const barcodephoto1 = files.find(file => file.fieldname === 'barcode[barcode1]');
  if (barcodephoto1) {
    templeData.barcode.barcode1 = barcodephoto1.path;
  }
  const barcodephoto2 = files.find(file => file.fieldname === 'barcode[barcode2]');
  if (barcodephoto2) {
    templeData.barcode.barcode2 = barcodephoto2.path;
  }

  const maharajJiPhoto = files.filter(file => file.fieldname.startsWith('maharajJiInfo')).map(file => file.path);
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
  

  

