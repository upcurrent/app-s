import axios from 'axios';

let base = 'http://192.168.1.9:8770/zebra';

export const getPrinterList = params => { return axios.post(`${base}/print/getPrinterList`, params).then(res => res.data); };

export const getUnusedPrinterList = params => { return axios.post(`${base}/print/getUnusedPrinterList`, params).then(res => res.data); };

export const savePrinter = params => { return axios.post(`${base}/print/savePrinter`, params).then(res => res.data); };

export const deletePrinter = params => { return axios.post(`${base}/print/deletePrinter`, params).then(res => res.data); };

export const getRecord = params => { return axios.post(`${base}/print/getRecord`, params).then(res => res.data); };

export const getRecordDetailed = params => { return axios.post(`${base}/print/getRecordDetailed`, params).then(res => res.data); };

export const url = base;

export const getFunList = params => { return axios.post(`${base}/print/getFunList`, params).then(res => res.data); };

export const getReportTemplateLis = params => { return axios.post(`${base}/print/getReportTemplateLis`, params).then(res => res.data); };

export const uploadUrl = base+"/print/upload";

export const deleteReportTemplate = params => { return axios.post(`${base}/print/deleteReportTemplate`, params).then(res => res.data); };

//updateReportTemplate

export const newTemplate = base+"/print/newTemplate";

export const download = base+"/print/download";

export const updateReportTemplate = params => { return axios.post(`${base}/print/updateReportTemplate`, params).then(res => res.data); };

export const printHistory =params =>{return axios.post(`${base}/print/History`, params).then(res => res.data);};

export const getUserList = params => { return axios.post(`${base}/user/list/`+params, null).then(res => res.data); };

export const getUserNode = params => { return axios.post(`${base}/user/node`, params).then(res => res.data); };

export const saveUser = params => { return axios.post(`${base}/user/save`, params).then(res => res.data); };











