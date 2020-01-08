import { http } from './http';

export const queryBaselineByRangeTime = (params: any) => {
  return http.post(`xsea/report/queryBaselineByRangeTime`, params);
};

export const reportSummaryCompare = (params: any) => {
  return http.post(`xsea/report/reportSummaryCompare`, params);
};
