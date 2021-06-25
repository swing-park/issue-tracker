import { useRecoilState, useRecoilValue } from "recoil";
import { checkedItemState, IssueList } from "@/stores/homeAtoms";

const TotalIssueCheckButton = () => {
  const [checkedItemList, setCheckedItemList] =
    useRecoilState(checkedItemState);
  const Issues = useRecoilValue(IssueList);
  console.log(checkedItemList);
  const handletotalCheck = () => {
    if (Issues.length === checkedItemList.size) {
      checkedItemList.clear();
      setCheckedItemList(new Set(checkedItemList.values()));
    } else {
      Issues.forEach((issue) => checkedItemList.add(issue.id));
      setCheckedItemList(new Set(checkedItemList.values()));
    }
  };

  return (
    Issues && (
      <input
        checked={checkedItemList.size === Issues.length}
        type="checkbox"
        onChange={handletotalCheck}
      />
    )
  );
};

export default TotalIssueCheckButton;
