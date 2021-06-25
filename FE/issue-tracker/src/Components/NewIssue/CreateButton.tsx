import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { createButtonFlagState, newIssueState } from "@/stores/newIssueAtoms";
import { NewIssue as S } from "@/Components/NewIssue/NewIssueStyles";
import API from "@/Utils/api";
import { userLoggedIn } from "@/stores/loginAtoms";

const CreateButton = () => {
  const createButtonFlag = useRecoilValue(createButtonFlagState);
  const newIssue = useRecoilValue(newIssueState);
  const logInData = useRecoilValue(userLoggedIn);

  const handleOnClick = (e: any) => {
    if (e.target.childNodes[0].disabled) e.preventDefault();

    API.withAuth("/api/issue", newIssue, logInData.userToken);
    API.get("/api/issue", logInData.userToken);
  };

  return (
    <Link to={"/issue"} onClick={handleOnClick}>
      <S.CreateButton
        variant="contained"
        color="primary"
        disabled={createButtonFlag}
      >
        완료
      </S.CreateButton>
    </Link>
  );
};

export default CreateButton;
