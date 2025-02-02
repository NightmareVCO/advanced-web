package com.icc.mvc.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.icc.mvc.dto.StudentDTO;
import com.icc.mvc.model.Student;

@Mapper
public interface StudentMapper {
  StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

  StudentDTO studentToDto(Student student);

  Student dtoToStudent(StudentDTO studentDTO);
}