package com.icc.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.icc.web.model.Header;

public interface HeaderRepository extends JpaRepository<Header, Long> {
}
