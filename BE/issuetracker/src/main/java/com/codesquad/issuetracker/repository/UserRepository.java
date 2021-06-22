package com.codesquad.issuetracker.repository;

import com.codesquad.issuetracker.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByIdAndEmail(Long id, String email);

    List<User> findByIdIn(List<Long> ids);
}