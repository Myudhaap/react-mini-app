import {createSlice} from '@reduxjs/toolkit'

const locationSlice = createSlice({
    name: 'locations',
    initialState: {
        location: {
            longitude: '',
            latitude: '',
            province: '',
            city: '',
            subdistrict: '',
            village: '',
        },
        loading: false,
        error: false,
        message: '',
    },
    reducers: {
        getlocation: (state, action) => {
            state.loading = true
        },

        setLocation: (state, action) => {
            state.loading = false
            state.location = {
                ...action.payload
            }
        },
    }
})

export const {
    getlocation,
    setLocation
} = locationSlice.actions

export default locationSlice.reducer