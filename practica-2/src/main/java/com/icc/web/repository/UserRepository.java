package com.icc.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.icc.web.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
