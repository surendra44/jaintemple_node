const mongoose = require('mongoose');

const templeDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber:
    {
        Phonenumber1: String,
        Phonenumber2: String
    },

  address: {
    line_1: String,
    line_2: String,
    line_3: String,
    city: String,
    state: String,
    pincode: Number,
    country: String,
  },
  homepageInfo:{
    title: {
      type: String,
    },
    description:{
      type: String,
    },
    homePhoto:{
      type: String,
    }
  },
  aboutPageInfo:{
    title: {
      type: String,
    },
    description:{
      type: String,
    }
  },
  historyPageInfo:{
    title: {
      type: String,
    },
    description:{
      type: String,
    }
  },
  mediaPageInfo:[{
    title:{
      type: String,
    },
    description:{
      type: String,
    },
    mediaPhoto:{
      type: String,
    },
    _id:false
  }],
  newsPageInfo:[{
    newstitle:{
      type: String,
    },
    newsdescription:{
      type: String,
    },
    newsmediaPhoto:{
      type: String,
    },
    _id:false
  }],
  commiteMemberInfo:[{
    memeberName: {
      type: String,
    },
    memeberPhoto:{
      type: String,
    },
    _id:false
  }], 
  mandirVediosInfo:[{
    title: {
      type: String,
    },
    description:{
      type: String,
    },
    VedioId:{
      type: String,
    },
    _id:false
  }],
  liveVediosInfo:[{
    title: {
      type: String,
    },
    description:{
      type: String,
    },
    VedioId:{
      type: String,
    },
    _id:false
  }],
  bankInfo:{
    bankName: {
      type: String,
    },
    bankAccNo:{
      type: String,
    },
    ifscCode:{
      type: String,
    }
  },
  barcode: {
    "barcode1": {
      type: String,
    },
    "barcode2":{
      type: String,
    },
  },
  blogPageInfo:[{
    title:{
      type: String,
    },
    description:{
      type: String,
    },
    blogPhoto:{
      type: String,
    },
    _id:false
  }],
  artiTime: {
    "normalTiming": {
      type: String,
    },
    "eventTiming":{
      type: String,
    },
  },
  maharajJiInfo:[{
    maharajName: {
      type: String,
    },
    maharajDescription:{
      type: String,
    },
    maharajPhoto:{
      type: String,
    },
    maharajTime:{
      type: String,
    },
    _id:false
  }],

});

const TempleDetail = mongoose.model('TempleDetail', templeDetailSchema);

module.exports = TempleDetail;

