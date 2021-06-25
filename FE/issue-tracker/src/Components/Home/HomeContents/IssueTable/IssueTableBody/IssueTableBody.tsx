import { IssueTable as S } from "../../../HomeStyles";
import IssueTableRow from "./IssueTableRow/IssueTableRow";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  IssueList,
  pipeFunctionState,
  openCloseIssueToggle,
} from "@/stores/homeAtoms";
import { useEffect } from "react";
import useFetch from "@/Utils/useFetch";
import { IssueType } from "@/Components/Home/homeTypes";

const IssueTableBody = () => {
  const [issueList, setIssueList] = useRecoilState(IssueList);
  const [isOpen, setIsOpen] = useRecoilState(openCloseIssueToggle);

  const pipeFnsArray = useRecoilValue(pipeFunctionState);
  const resetPipe = useResetRecoilState(pipeFunctionState);

  const { fetchedData: openedIssue, loading } = useFetch("/api/issue?is=open");
  const { fetchedData: closedIssue } = useFetch("/api/issue?is=closed");

  const IssueDatas = pipeFnsArray
    ? Object.values(pipeFnsArray).reduce(
        (acc: IssueType[], fn: Function) => fn(acc),
        issueList
      )
    : issueList;

  useEffect(() => {
    isOpen
      ? setIssueList(openedIssue as IssueType[])
      : setIssueList(closedIssue as IssueType[]);

    resetPipe();
  }, [isOpen, openedIssue, closedIssue]);

  return (
    <S.TableBody>
      {IssueDatas &&
        IssueDatas?.map((issue: IssueType) => (
          <IssueTableRow issue={issue} key={issue.id} />
        ))}
      {loading && <div>loading..</div>}
    </S.TableBody>
  );
};

export default IssueTableBody;
