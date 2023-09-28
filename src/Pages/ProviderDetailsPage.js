import React, {useEffect, useState} from "react";
import {APP_VERSION, BASE_URL, URL_PATH} from "../Configration/configration";
import {toast} from "react-toastify";
import Header from "../Component/Header";
import {useDispatch, useSelector} from "react-redux";
import {getOtherProvider} from "../action/otherProviderConstant";
import {saveService} from "../action/userServiceConstant";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MapDiscoveryIcon from "../assets/images/mapDiscovery.svg";
import {useParams} from "react-router-dom";
import Carousel from "react-multi-carousel";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {CustomLeftArrow, CustomRightArrow} from "../Component/CarouselArrows";


const reviewResponsive = {
    desktop: {breakpoint: {max: 3000, min: 1024}, items: 1},
    tablet: {breakpoint: {max: 1024, min: 464}, items: 1},
    mobile: {breakpoint: {max: 464, min: 0}, items: 1}
};
const secoundResponsive = {
    desktop: {breakpoint: {max: 3000, min: 1024}, items: 4},
    tablet: {breakpoint: {max: 1024, min: 464}, items: 2},
    mobile: {breakpoint: {max: 464, min: 0}, items: 1}
};


const REVIEWS = [
    {
        name: "John Smith",
        time: "2 Hours Ago",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        name: "John",
        time: "5 Hours Ago",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
]


const ProviderDetailsPage = () => {
    const userAuth = JSON.parse(localStorage.getItem("AdAnima_auth"));
    let {providerId} = useParams();

    const [modelShow, setmodelShow] = useState(false);

    const [userService, setuserService] = useState();

    const getservice = async () => {
        const fdata = new FormData();
        fdata.append("user_id", userAuth._id);

        await fetch(`${BASE_URL}${APP_VERSION}${URL_PATH.get_user_service}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userAuth.token}`,
            },
            body: fdata,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setuserService(data.data);
                    console.log(data.data);
                } else {
                    toast.error(data?.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [loader, setloader] = useState(true);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.otherProviderDetails);

    useEffect(() => {
        if (userDetails?.user_type == "provider") {
            setloader(false);
        }

        if (userDetails?.user_type == "user") {
            setloader(false);
        }
    }, [userDetails]);

    useEffect(() => {
        if (userAuth?._id) {
            dispatch(getOtherProvider(providerId));
            getservice();
        }
    }, []);

    const saveProvider = (id, status) => {
        dispatch(saveService({id: id, status: status}));
    };

    return (
        <>
            {loader && (
                <>
                    <div class="preloader">
                        <svg
                            class="loader-svg"
                            width="150"
                            height="150"
                            viewBox="-0.1 -0.1 1.2 1.2"
                        >
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#00bc9b"/>
                                    <stop offset="100%" stop-color="#EFCE96 "/>
                                </linearGradient>
                            </defs>
                            <path
                                class="hexagon background"
                                d="M0.4625 0.01165063509
      a0.075 0.075 0 0 1 0.075 0
      l0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 0.0375 0.06495190528
      l0 0.4233974596
      a0.075 0.075 0 0 1 -0.0375 0.06495190528
      l-0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 -0.075 0
      l-0.3666729559 -0.2116987298
      a0.075 0.075 0 0 1 -0.0375 -0.06495190528
      l0 -0.4233974596
      a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z"
                                stroke="url(#gradient)"
                            />
                            <path
                                id="trace"
                                class="hexagon trace"
                                d="M0.4625 0.01165063509
      a0.075 0.075 0 0 1 0.075 0
      l0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 0.0375 0.06495190528
      l0 0.4233974596
      a0.075 0.075 0 0 1 -0.0375 0.06495190528
      l-0.3666729559 0.2116987298
      a0.075 0.075 0 0 1 -0.075 0
      l-0.3666729559 -0.2116987298
      a0.075 0.075 0 0 1 -0.0375 -0.06495190528
      l0 -0.4233974596
      a0.075 0.075 0 0 1 0.0375 -0.06495190528 Z"
                            />
                        </svg>
                    </div>
                </>
            )}

            <section class="main-page">
                <Header/>

                <div class="main-inner">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-lg-6 col-xl-6">
                                <div class="border-gred">
                                    <div class="inner-gred d-flex align-items-center">
                                        <div class="p_image_shape me-2 me-sm-3">
                                            {userDetails?.is_verified && (
                                                <>
                                                    <img src="images/check.svg" class="blue_check"/>
                                                </>
                                            )}

                                            <img src={userDetails?.profile_picture}/>
                                        </div>
                                        <div className="w-100">
                                            <h4 class="mb-1">{userDetails?.name}</h4>
                                            <p class="mb-1">
                                                {userDetails?.is_ambassador && (
                                                    <img
                                                        src="/images/ambassador.svg"
                                                        className="mb-1"
                                                        style={{height: "20px", marginLeft: "-5px"}}
                                                    />
                                                )}{" "}
                                                Provider
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-1">
                                                <div className="d-flex align-items-center">
                                                    <div class="me-2 me-sm-2">
                                                        <img
                                                            src={MapDiscoveryIcon}
                                                            style={{width: "18px"}}
                                                        />
                                                    </div>
                                                    <p
                                                        className="map_des m-0 p-0"
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#FFC107",
                                                        }}
                                                    >
                                                        {userDetails?.miles_distance} Mile Away
                                                    </p>
                                                </div>
                                                <div style={{color: "#FFC107"}}>
                                                    {userDetails?.average_rating > 0 ? (
                                                        <StarIcon/>
                                                    ) : (
                                                        <StarBorderIcon/>
                                                    )}
                                                    {userDetails?.average_rating > 1 ? (
                                                        <StarIcon/>
                                                    ) : (
                                                        <StarBorderIcon/>
                                                    )}
                                                    {userDetails?.average_rating > 2 ? (
                                                        <StarIcon/>
                                                    ) : (
                                                        <StarBorderIcon/>
                                                    )}
                                                    {userDetails?.average_rating > 3 ? (
                                                        <StarIcon/>
                                                    ) : (
                                                        <StarBorderIcon/>
                                                    )}
                                                    {userDetails?.average_rating > 4 ? (
                                                        <StarIcon/>
                                                    ) : (
                                                        <StarBorderIcon/>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 col-xl-6">
                                <div class="border-gred">
                                    <div class="inner-gred d-flex ">
                                        <div>
                                            <h4 class="mb-1">Description</h4>
                                            <div className="selected_services">
                                                {userDetails?.provider_services?.map((data) => {
                                                    return (
                                                        <>
                                                            {data?.description_name == "Other" ? (
                                                                <>
                                                                    <span>{userDetails?.other_desc}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>{data?.description_name}</span>
                                                                </>
                                                            )}
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 col-xl-6">
                                <div class="border-gred">
                                    <div class="inner-gred">
                                        <h4 class="dec_title">About</h4>
                                        <p class="about-desc">
                                            {userDetails?.provider_introduction}
                                        </p>
                                    </div>
                                </div>
                                <div class="border-gred">
                                    <div class="inner-gred">
                                        <h4 class="dec_title d-flex justify-content-between">
                                            Review{" "}
                                            <p
                                                className="map_des m-0 p-0"
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#FFC107",
                                                }}
                                            >
                                                Add Review
                                            </p>
                                        </h4>
                                        <div className="w-100">
                                            <Carousel
                                                responsive={reviewResponsive}
                                                autoPlay={true}
                                                autoPlaySpeed={2000}
                                                infinite={true}
                                                customLeftArrow={<CustomLeftArrow/>}
                                                customRightArrow={<CustomRightArrow/>}
                                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                            >
                                                {REVIEWS.map((ele) => (
                                                    <div>
                                                        <div className="d-flex mt-4">
                                                            <div className="review_shape me-2 me-sm-3">
                                                                <img src={`${userDetails?.profile_picture}`}/>
                                                            </div>
                                                            <div>
                                                                <div className="d-flex align-items-center">
                                                                    <span>{ele.name}</span>
                                                                    <FiberManualRecordIcon
                                                                        style={{transform: "scale(0.4)"}}/>
                                                                    <span>{ele.time}</span>
                                                                </div>
                                                                <div style={{color: "#FFC107"}}>
                                                                    <StarIcon/>
                                                                    <StarIcon/>
                                                                    <StarIcon/>
                                                                    <StarIcon/>
                                                                    <StarBorderIcon/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mt-3 selected-item">{ele.desc}</p>
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 col-xl-6 align-self-center text-center text-lg-end">
                                <div class="round-image">
                                    <div class="first d-flex justify-content-center">
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[0]?.file_name
                                                            ? userDetails?.provider_banner_images[0]
                                                                ?.file_name
                                                            : "/images/1.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[1]?.file_name
                                                            ? userDetails?.provider_banner_images[1]
                                                                ?.file_name
                                                            : "/images/2.png"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="first d-flex justify-content-center">
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[2]?.file_name
                                                            ? userDetails?.provider_banner_images[2]
                                                                ?.file_name
                                                            : "/images/3.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[3]?.file_name
                                                            ? userDetails?.provider_banner_images[3]
                                                                ?.file_name
                                                            : "/images/4.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[4]?.file_name
                                                            ? userDetails?.provider_banner_images[4]
                                                                ?.file_name
                                                            : "/images/5.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="first d-flex justify-content-center">
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[5]?.file_name
                                                            ? userDetails?.provider_banner_images[5]
                                                                ?.file_name
                                                            : "/images/6.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div class="polygon-imgae">
                                            <div class="p_image_shape">
                                                <img
                                                    src={
                                                        userDetails?.provider_banner_images[6]?.file_name
                                                            ? userDetails?.provider_banner_images[6]
                                                                ?.file_name
                                                            : "/images/7.jpg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Carousel
                                responsive={secoundResponsive}
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                infinite={true}
                                customLeftArrow={<CustomLeftArrow/>}
                                customRightArrow={<CustomRightArrow/>}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                            >
                                <div className="pro_carousel">
                                    <div className="pro_carousel_content">
                                        <span className="pro_carousel_title">Cupping Therapy</span>
                                        <span className="dec_title mb-0 mt-1">$25</span>
                                        <span className="pro_carousel_time">3 Hours</span>
                                        <span className="pro_carousel_desc mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting...</span>
                                    </div>
                                </div>
                                <div className="pro_carousel">
                                    <div className="pro_carousel_content">
                                        <span className="pro_carousel_title">Cupping Therapy</span>
                                        <span className="dec_title mb-0 mt-1">$25</span>
                                        <span className="pro_carousel_time">3 Hours</span>
                                        <span className="pro_carousel_desc mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting...</span>
                                    </div>
                                </div>
                                <div className="pro_carousel">
                                    <div className="pro_carousel_content">
                                        <span className="pro_carousel_title">Cupping Therapy</span>
                                        <span className="dec_title mb-0 mt-1">$25</span>
                                        <span className="pro_carousel_time">3 Hours</span>
                                        <span className="pro_carousel_desc mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting...</span>
                                    </div>
                                </div>
                                <div className="pro_carousel">
                                    <div className="pro_carousel_content">
                                        <span className="pro_carousel_title">Cupping Therapy</span>
                                        <span className="dec_title mb-0 mt-1">$25</span>
                                        <span className="pro_carousel_time">3 Hours</span>
                                        <span className="pro_carousel_desc mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting...</span>
                                    </div>
                                </div>
                                <div className="pro_carousel">
                                    <div className="pro_carousel_content">
                                        <span className="pro_carousel_title">Cupping Therapy</span>
                                        <span className="dec_title mb-0 mt-1">$25</span>
                                        <span className="pro_carousel_time">3 Hours</span>
                                        <span className="pro_carousel_desc mt-1">Lorem Ipsum is simply dummy text of the printing and typesetting...</span>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default ProviderDetailsPage;
