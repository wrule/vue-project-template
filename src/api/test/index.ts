import { http } from '@/api/http';

export const queryBaselineByRangeTime = (params: any) => {
  return http.post(`xsea/report/queryBaselineByRangeTime`, params);
};
