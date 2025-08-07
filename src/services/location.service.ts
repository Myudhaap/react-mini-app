import axios from "axios"
import type { ILocationReq, ILocationRes } from "../interfaces/location"

export const getCurrentLocation = async (payload: ILocationReq) => {
    try {
        const res = await axios.get<ILocationRes>(`/api/weather/administration?lat=${payload.latitude}&long=${payload.longitude}`)
        return res.data
    }catch(err) {
        console.log({err})
        return err
    }
}  