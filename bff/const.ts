
// indexでのimportの際、nextの初期処理より後にロードを行うこと
// DotenvのロードがNextの初期処理で行われる
const BffConst = {
  API_BASE_URL: process.env.NODE_ENV === 'production'
   ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV,
  BASE_URL: process.env.NODE_ENV === 'production'
  ? process.env.BASE_URL : process.env.BASE_URL_DEV,

  //Backend API
  API_MUTER_TOP_SLUG: '/muter_top',
  API_MUTED_LIST_SLUG: '/muted_list_api',
  API_STORE_LOGIN_SLUG: '/login_store_api',
  API_CHECK_LOGIN_API: '/login_check_api',
  API_MUTE_USER_SLUG: '/mute_api',
  API_UNMUTE_USER_SLUG: '/unmute_api',

  //Bff Slugs
  LOGIN_CHECK_SLUG: '/login',
  MUTER_TOP_SLUG: '/muter',
  CALLBACK_SLUG: '/callback',
  LOGIN_SUCESS: '/success',
  LOGIN_FAILED: '/fail',
  MUTED_LIST_SLUG: '/muted_list',
  USER_INFO_SLUG: '/user_info',
  TWITTER_LOGIN_SLUG: '/twitter_login',
  MUTE_USER_SLUG: '/mute',
  UNMUTE_USER_SLUG: '/unmute',

  //Front Slugs
  FRONT_MUTER_SLUG:'/mutereminder',

  //Messages
  MSG_API_LOGIN_FAIL: 'login failure',

  //Twitter
  TWITTER_CONSUMER_KEY: process.env.CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.CONSUMER_SECRET,

  //Firebase
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,

} as const;

export default BffConst;

