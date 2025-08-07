import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getlocation } from "../../redux/location/locationSlice";
import { Skeleton } from "@mui/material";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const {location, loading} = useSelector((state: RootState) => state.locations)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            dispatch(getlocation({ latitude, longitude }));
        },
        (error) => {
            console.error('Error getting location:', error);
        }
        );
    }, []);

    return (
        <>
            <div className="h-full flex flex-col gap-4 p-6">
                <div>
                    <h4 className="text-2xl mb-3 font-bold">Your Information</h4>

                    {loading ? (
                        <Skeleton height={400}/>
                    ) : (
                        <div className="flex flex-col gap-4 border border-dashed border-blue-500 rounded-md p-4">
                            <div className="flex gap-4">
                                <span className="font-bold w-44">Longitude:</span>
                                <span className="flex-1">{location.longitude}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold w-44">Latitude:</span>
                                <span className="flex-1">{location.latitude}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold w-44">Province:</span>
                                <span className="flex-1">{location.province}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold w-44">City:</span>
                                <span className="flex-1">{location.city}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold w-44">Subdistrict:</span>
                                <span className="flex-1">{location.subdistrict}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold w-44">Village:</span>
                                <span className="flex-1">{location.village}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="text-2xl mb-3 font-bold">Menu List</h4>
                    <div className="flex flex-wrap gap-4">
                        <Link to={'todos'}>
                            <Box
                            sx={{
                                width: 250,
                                height: 200,
                                bgcolor: 'primary.main',
                                cursor: 'pointer',
                                padding: '.5rem',
                                '&:hover': {
                                    bgcolor: 'primary.dark'
                                }
                            }}
                            borderRadius={'.5rem'}
                            >
                                <div className="flex flex-col h-full w-full justify-between">
                                    <Typography variant="h5" color="white" fontSize={'2rem'}>Todos</Typography>
                                    <FormatListBulletedIcon sx={{fontSize: '5rem', color: 'white', alignSelf: 'end'}}/>
                                </div>
                            </Box>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}