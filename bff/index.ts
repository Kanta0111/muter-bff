require('dotenv').config()
const express = require("express");
const next = require("next");
const http = require("http");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port :any = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
import BffConst from './const'; //Nextの初期処理以降に記述しなければDotenvが動作しない

const auth = require('./modules/twitterPassport');
const passport = auth.passport;
const router = require('./routes/router');
const FirebaseStore = require('connect-session-firebase')(session);
const firebase = require('firebase-admin');
const cert = {
  projectId: BffConst.FIREBASE_PROJECT_ID,
  clientEmail: BffConst.FIREBASE_CLIENT_EMAIL,
  privateKey: BffConst.FIREBASE_PRIVATE_KEY,
};
const ref = firebase.initializeApp({
  credential: firebase.credential.cert(cert),
  databaseURL: BffConst.FIREBASE_DATABASE_URL,
});

export {};

const app = async () => {
  await nextApp.prepare()
  const server = express();
  server.use(cookieParser());
  server.use(
    session({
      store: new FirebaseStore({
        database: ref.database()
      }),
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      // trueが推奨だがhttps通信が必須になるのでproiductionのみとする
      // httpsでも有効化するとセッションが保持されない。
      // cookie: { secure: process.env.NODE_ENV === 'production' }
    })
  )
  //認証のセッションを初期化
  server.use(passport.initialize());
  server.use(passport.session());
  //router
  server.use("/", router);
  // pages/muteriminder
  server.get(BffConst.FRONT_MUTER_SLUG,async (req: any, res: any) => {
    const token = req.cookies.token || "";
    if (token) {
      await handle(req, res);
    } else {
      res.redirect(BffConst.LOGIN_CHECK_SLUG);
    }
  })

  server.get("*",async (req :any, res:any) => {
    await handle(req, res);
  });
  return server;
}

app().then((server) => {
  const devServer = http.createServer(server);
  devServer.listen(port, (err :any) => {
    if (err) throw err;
  });
});
