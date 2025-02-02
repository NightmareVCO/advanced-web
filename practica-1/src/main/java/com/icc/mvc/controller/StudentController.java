package com.icc.mvc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icc.mvc.dto.StudentDTO;
import com.icc.mvc.mapper.StudentMapper;
import com.icc.mvc.model.Student;
import com.icc.mvc.services.StudentServices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@ControllerAdvice
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
@Slf4j
public class StudentController {
  private final StudentServices studentServices;

  @GetMapping()
  public List<Student> getStudents() {
    return studentServices.getStudents();
  }

  @GetMapping("/{id}")
  public StudentDTO getStudent(@PathVariable Long id) {
    Student student = studentServices.getStudentById(id);
    return StudentMapper.INSTANCE.studentToDto(student);
  }

  @PostMapping
  public StudentDTO saveStudent(@RequestBody StudentDTO studentDTO) {
    Student student = StudentMapper.INSTANCE.dtoToStudent(studentDTO);
    Student savedStudent = studentServices.saveStudent(student);
    return StudentMapper.INSTANCE.studentToDto(savedStudent);
  }

  @PutMapping("/{id}")
  public StudentDTO updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
    Student student = StudentMapper.INSTANCE.dtoToStudent(studentDTO);
    student.setId(id);
    Student updatedStudent = studentServices.updateStudent(student);
    return StudentMapper.INSTANCE.studentToDto(updatedStudent);
  }

  @DeleteMapping("/{id}")
  public StudentDTO deleteStudent(@PathVariable Long id) {
    Student deletedStudent = studentServices.deleteStudent(id);
    return StudentMapper.INSTANCE.studentToDto(deletedStudent);
  }
}
