export interface GuestType {
  description: string;
  guestName: string;
  id: number;
  position: string;
}

export interface ActivityCityRef {
  cityName: string;
}

/**
 * /activities/by-city 返回的列表项：isTop 不同时字段可能不同，未用到的字段可为空。
 */
export interface ActivityItem {
  id: number;
  title: string;
  guests?: GuestType[];
  imgSrc: string;
  city?: ActivityCityRef;
  startTime?: string;
  publishTime: string;
  guestTitle: string;
  coverImage: string;
  contentJson?: string;
}

export interface ActivitiesTopData {
  items: ActivityItem[];
}

/** 通用分页响应（后端返回 page / pageSize / total / totalPages） */
export interface PaginatedResponse<TItem> {
  items: TItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
