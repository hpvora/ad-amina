import React from 'react';
import {Box, Grid} from "@mui/material";
import Header from "../Component/Header";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import locationIcon from "../assets/images/Discovery.svg";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import greenArrow from "../assets/images/green_arrow.svg";

const BOOKINGUTILS = [
    {
        id: 1,
        img: img1,
        heading: "Sunrise Retreat",
        date: "June 10 - 20 2023",
        time: "12:00PM",
        participant: "12",
        type: "Event",
        address: "RUA AUGUSTA 1111, SAO PAULO, BRAZIL",
        massage: true,
    },
    {
        id: 2,
        img: img2,
        heading: "Sound Healing",
        date: "June 09 2023",
        time: "12:00PM",
        participant: "3",
        type: "Provider",
        provider: "John Smith",
        address: "RUA AUGUSTA 1111, SAO PAULO, BRAZIL",
        massage: true,
    },
    {
        id: 3,
        img: img3,
        heading: "Mindful Moments: Embracing Stillness",
        date: "June 10 - 20 2023",
        time: "12:00PM",
        participant: "12",
        type: "Event",
        address: "RUA AUGUSTA 1111, SAO PAULO, BRAZIL",
        massage: false,
    },
    {
        id: 4,
        img: img4,
        heading: "Sound Healing",
        date: "June 09 2023",
        time: "12:00PM",
        participant: "3",
        type: "Provider",
        provider: "John Smith",
        address: "RUA AUGUSTA 1111, SAO PAULO, BRAZIL",
        massage: true,
    },
    {
        id: 5,
        img: img5,
        heading: "Sunrise Retreat",
        date: "June 10 - 20 2023",
        time: "12:00PM",
        participant: "12",
        type: "Event",
        address: "RUA AUGUSTA 1111, SAO PAULO, BRAZIL",
        massage: true,
    },
]

const Booking = () => {
    return (
        <Box>
            <section className="main-page">
                <Header/>
                <div className="main-inner">
                    <div className="container">
                        <Grid container spacing={2}>
                            {
                                BOOKINGUTILS?.map((ele, i) => (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <Box
                                                className={`d-flex inner-gred box_shadow position-relative ${!ele.massage && "yellow_border"}`}>
                                                <div className="p_image_shape me-2 me-sm-3">
                                                    <img src={ele.img}/>
                                                </div>
                                                <div>
                                                    <h3 className="mb-0 input-label">{ele.heading}</h3>
                                                    <div className="d-flex gap-3 mt-1">
                                                        <div>
                                                            <p className="m-0 selected-item text-dark">{ele.date}</p>
                                                            <p className="m-0 selected-item text-dark">{ele.participant} Participants</p>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center">
                                                                <FiberManualRecordIcon
                                                                    style={{transform: "scale(0.4)", fill: "#919191"}}/>
                                                                <p className="m-0 selected-item text-dark">{ele.time}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <FiberManualRecordIcon
                                                                    style={{transform: "scale(0.4)", fill: "#919191"}}/>
                                                                <p className="m-0 selected-item text-dark">{ele.type}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img src={locationIcon} alt=""/>
                                                        <p className="m-0 selected-item">{ele.address}</p>
                                                    </div>
                                                    {
                                                        ele.massage ? <div>
                                                                <button className="massageBtn mt-3">Add Service</button>
                                                            </div> :
                                                            <div className="w-100 d-flex mt-3">
                                                                <div className="col-6">
                                                                    <button type="submit"
                                                                            className="btn_admina delete-button">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                                <div className="col-6">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn_admina delete-confirm-button"
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                </div>
                                                            </div>}
                                                </div>
                                                <div className="card_green_arrow">
                                                    {ele.massage && <img src={greenArrow} alt="validate"/>}
                                                </div>
                                            </Box>
                                        </Grid>
                                    </>
                                ))
                            }
                        </Grid>
                    </div>
                </div>
            </section>
        </Box>
    )
}

export default Booking;