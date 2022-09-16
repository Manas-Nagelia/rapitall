import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import { AuthenticationImage } from "../components/Login/AuthenticationImage";

const Login: NextPage = () => {
  deleteCookie("mantine-color-scheme");
  
  return (
    <AuthenticationImage />
  );
};

export default Login;
