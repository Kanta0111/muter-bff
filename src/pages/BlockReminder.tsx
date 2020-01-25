import { NextPage } from 'next';
import LoginPage from '../components/LoginPage/template/LoginPage';
import Head from '../components/Common/Header';
import LoginConst from '../components/LoginPage/LoginConst';

const Page: NextPage = () => {

  const base_path = process.env.NODE_ENV === "production"
  ? process.env.BASE_URL
  : process.env.BASE_URL_DEV;
  console.log(process.env);
  return (
    <>
      <Head />
      <LoginPage
        basePath={"https://muter-bff.now.sh/"}
        appName={LoginConst.APPNAME_BLOCKER}
      />
    </>
  );
}

export default Page;
