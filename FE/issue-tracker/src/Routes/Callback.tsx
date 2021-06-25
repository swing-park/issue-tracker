import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { userLoggedIn } from "@/stores/loginAtoms";

const Callback = ({ history, location }: RouteComponentProps) => {
  const setLoginData = useSetRecoilState(userLoggedIn);
  useEffect(() => {
    const getToken = async () => {
      let params = new URLSearchParams(location.search);
      let code = params.get("code"); // is the number 123

      try {
        const jwt_token = await fetch(
          `http://3.37.161.3/api/user/login/oauth/github?code=${code}`
        ).then((res) => res.json());

        console.log("토큰이 넘어오냐", jwt_token);

        setLoginData({
          userName: jwt_token.data.name[0],
          userProfileImg: jwt_token.data.image_url[0],
          userToken: jwt_token.data.Token[0],
        });

        localStorage.setItem("token", jwt_token.data.Token[0]);

        history.push("/issue");
      } catch (e) {
        //
      }
    };
    getToken();
    //user/login/oauth/github/code=`${code}`
  }, []);

  return null;
};

export default withRouter(Callback);
