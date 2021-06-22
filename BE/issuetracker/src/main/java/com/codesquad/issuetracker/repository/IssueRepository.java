package com.codesquad.issuetracker.repository;

import com.codesquad.issuetracker.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findAllByOpenTrue();

    List<Issue> findByIdIn(List<Long> ids);
}
