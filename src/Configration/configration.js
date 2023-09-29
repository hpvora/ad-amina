// export const BASE_URL = "http://192.168.29.119:1000";
// export const BASE_URL = "http://192.168.29.243:1000";
// export const BASE_URL = "https://ad-anima.com:8080"; // development
export const BASE_URL = "https://ad-anima.com:8081"; //staging

export const APP_VERSION = "/v1";

export const GOOGLE_API_KEY = "AIzaSyAECw5ncpHgZrKY1Wud8LwefYuOC6Ijnzs"
export const URL_PATH = {
  login: "/user/sign_in",
  user_details: "/user/get_profile",
  service_list: "/user/description_list",
  sign_up: "/user/sign_up",
  edit_service: "/user/edit_service_amount",
  logout: "/user/logout",
  delete_user: "/user/delete_account",
  change_password: "/user/change_password",
  send_otp: "/user/send_otp",
  email_send_otp: "/user/email_send_otp",
  verify_otp: "/user/verify_otp",
  reset_password: "/user/reset_password",
  edit_profile: "/user/edit_profile",
  get_banner_image: "/user/add_provider_banner_image",
  add_services: "/user/add_user_service",
  get_user_service: "/user/user_service_list",
  check_mail: "/user/check_email",
  home_service_list: '/my_page/home_service_list',
  save_service: '/my_page/save_unsave_service',
  get_my_page_details : "/my_page/get_my_page"
};
