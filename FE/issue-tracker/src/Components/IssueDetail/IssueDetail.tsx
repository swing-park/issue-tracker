import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { RouteComponentProps } from "react-router-dom";
import IssueDetailHeader from "./IssueDetailHeader/IssueDetailHeader";
import IssueContents from "./IssueContents/IssueContents";
import Header from "@/Components/Header/Header";
import { IssueDetail as S } from "@/Components/IssueDetail/IssueDetailStyles";
import useFetch from "@/Utils/useFetch";
import { issueDetailState } from "@/stores/issueDetailAtoms";
import { IssueDetailType } from "./issueDetailTypes";

interface MatchParams {
  id: string;
}

const IssueDetail = ({ match }: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;

  const setIssueDetailDatas = useSetRecoilState(issueDetailState);

  const { fetchedData: issueDetailData, loading } = useFetch(
    `/api/issue/${id}`
  );

  useEffect(() => {
    setIssueDetailDatas(issueDetailData as IssueDetailType);
  }, [issueDetailData]);

  console.log("why", issueDetailData);

  return (
    <>
      <Header />
      <S.IssueDetail>
        {issueDetailData && (
          <IssueDetailHeader issue={issueDetailData as IssueDetailType} />
        )}
        {issueDetailData && (
          <IssueContents issue={issueDetailData as IssueDetailType} />
        )}
        {loading && <div>loading..</div>}
      </S.IssueDetail>
    </>
  );
};

export default IssueDetail;
