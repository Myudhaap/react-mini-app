export interface ILocationReq {
    longitude: number,
    latitude: number
}

export interface ILocationRes {
  status: number
  message: string
  data: Data
}

export interface Data {
  longitude: string
  latitude: string
  province: string
  city: string
  subdistrict: string
  village: string
}
