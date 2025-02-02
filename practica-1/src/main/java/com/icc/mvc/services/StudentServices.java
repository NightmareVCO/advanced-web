package com.icc.mvc.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icc.mvc.model.Student;
import com.icc.mvc.repository.StudentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServices {
  private final StudentRepository studentRepository;

  public List<Student> getStudents() {
    return studentRepository.findAll();
  }

  public Student getStudentById(Long id) {
    return studentRepository.findById(id).orElse(null);
  }

  public Student saveStudent(Student student) {
    return studentRepository.save(student);
  }

  public Student updateStudent(Student student) {
    return studentRepository.save(student);
  }

  public Student deleteStudent(Long id) {
    Student student = this.getStudentById(id);
    studentRepository.deleteById(id);

    return student;
  }
}
