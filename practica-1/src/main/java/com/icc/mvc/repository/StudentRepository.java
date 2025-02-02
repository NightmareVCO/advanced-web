package com.icc.mvc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.icc.mvc.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}