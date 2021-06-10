import React from "react";
import { Home as S } from "../HomeStyles";
import CreateIssueButton from "./CreateIssueButton";
import IssueSearchBar from "./IssueSearchBar";
import IssueTable from "./IssueTable/IssueTable";
import LabelButton from "./LabelButton";
import MileStoneButton from "./MileStoneButton";
import { StylesProvider } from "@material-ui/core";

const HomeContents = () => {
  return (
    <StylesProvider injectFirst>
      <S.HomeContent>
        <S.ContentNavDiv>
          <IssueSearchBar />
          <S.ContentNavRight>
            <S.ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <LabelButton />
              <MileStoneButton />
            </S.ButtonGroup>
            <CreateIssueButton />
          </S.ContentNavRight>
        </S.ContentNavDiv>
        <IssueTable />
      </S.HomeContent>
    </StylesProvider>
  );
};

export default HomeContents;