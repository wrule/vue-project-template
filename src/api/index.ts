import { http } from './http';

export const queryBaselineByRangeTime = (params: any) => {
  return http.post(`xsea/report/queryBaselineByRangeTime`, params);
};

export const reportSummaryCompare = (params: any) => {
  return http.post(`xsea/report/reportSummaryCompare`, params);
};

export const clusterIndicatorDataComparing = (params: any) => {
  return http.post(`xsea/report/clusterIndicatorDataComparing`, {}, {params});
};

export const clusterIndicatorDataTrend = (params: any) => {
  return http.post(`xsea/report/clusterIndicatorDataTrend`, params);
};

export const clusterRunningDataTrendCatalog = (params: any) => {
  return http.post(`xsea/report/clusterRunningDataTrendCatalog`, params);
};

export const clusterRunningDataTrend = (params: any) => {
  return http.post(`xsea/report/clusterRunningDataTrend`, params);
};
