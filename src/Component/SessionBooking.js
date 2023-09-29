import React from 'react';
import {Box, Grid} from "@mui/material";
import Header from "./Header";
import profileImg from "../assets/images/2.png";
import loactionIcon from "../assets/images/Discovery.svg";
import {Select, Space} from 'antd';

const SessionBooking = () => {
    return (
        <Box>
            <section className="main-page">
                <Header/>
                <div className="main-inner">
                    <div className="container">
                        <h3>Book Private Session</h3>
                        <Grid container spacing={2}>
                            <Grid sx={7}>
                                <div className="inner-gred">
                                    <h3>Book Private Session</h3>

                                    {/*.......profile......*/}

                                    <div className="d-flex border-gred">
                                        <div className="inner-gred d-flex w-100">
                                            <div className="p_image_shape me-2 me-sm-3">
                                                <img src={profileImg} alt="profile"/>
                                            </div>
                                            <div>
                                                <p className="m-0">Phillip’s Schedule</p>
                                                <div className="d-flex align-items-center">
                                                    <img src={loactionIcon} alt=""/>
                                                    <p className="m-0 font-weight-bold map_des">RIO DE JANERIO, BRAZIL</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*......Therapy......*/}

                                    <div className="d-flex border-gred session-select">
                                        <Select
                                            defaultValue="lucy"
                                            style={{width: "100%", height: "45px"}}
                                            // onChange={handleChange}
                                            options={[
                                                {value: 'cuppingTherapy', label: 'Cupping Therapy'},
                                                {value: 'dream', label: 'Dream interpreter'},
                                                {value: 'breathwork', label: 'Breathwork'},
                                                {value: 'chakra', label: 'Chakra Healer'},
                                            ]}
                                        />
                                    </div>

                                    {/*    ......details section.........*/}

                                    <div className="inner-gred box_shadow">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <div className="border-gred ">
                                                    <div className="session-input d-flex">
                                                        <p className="m-0">Participants</p>
                                                        <input type="number" value={1}/>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="border-gred session-select">
                                                    <Select
                                                        defaultValue="inperson"
                                                        style={{width: "100%", height: "45px"}}
                                                        // onChange={handleChange}
                                                        options={[
                                                            {value: 'inperson', label: 'In person'},
                                                            {value: 'virtual', label: 'virtual'}
                                                        ]}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="border-gred m-0 session-select">
                                                    <Select
                                                        defaultValue="myPlace"
                                                        style={{width: "100%", height: "45px"}}
                                                        // onChange={handleChange}
                                                        options={[
                                                            {value: 'myPlace', label: 'My Place'},
                                                            {value: 'theirplace', label: 'Their Place'}
                                                        ]}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="session-address">
                                                    <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                            <Grid sx={5}>

                            </Grid>
                        </Grid>
                    </div>
                </div>
            </section>
            <Box>

            </Box>
        </Box>
    )
}

export default SessionBooking;