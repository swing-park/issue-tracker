import { IssueType } from "@/Components/Home/homeTypes";

export const pipe =
  (...fns: any) =>
  (value: IssueType[]) =>
    fns.reduce((acc: any, fn: any) => fn(acc), value);

export const getLabelFilteredData =
  (clickedLabel: string) => (issues: IssueType[]) =>
    issues.filter(
      (issue) =>
        issue.labels.filter((label) => label.title === clickedLabel).length !==
        0
    );

export const getMilestoneFilteredData =
  (clickedMilestone: string) => (issues: IssueType[]) =>
    issues.filter((issue) => issue.milestone?.title === clickedMilestone);

export const getAuthorFilteredData =
  (clickedAuthor: string) => (issues: IssueType[]) =>
    issues.filter((issue) => issue.author.name === clickedAuthor);

export const getAssigneeFilteredData =
  (clickedAsignee: string) => (issues: IssueType[]) =>
    issues.filter((issue) => {
      const filterAssignee = issue.assignee.find(
        (user) => user.name === clickedAsignee
      );
      return filterAssignee;
    });
