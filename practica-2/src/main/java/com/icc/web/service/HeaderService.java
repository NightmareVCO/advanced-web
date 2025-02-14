package com.icc.web.service;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import com.icc.web.model.Header;
import com.icc.web.repository.HeaderRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class HeaderService {
  private final HeaderRepository headerRepository;

  public List<Header> getAllHeaders() {
    return headerRepository.findAll();
  }

  public Optional<Header> getHeaderById(Long id) {
    return headerRepository.findById(id);
  }

  public Optional<Header> saveHeader(Header header) {
    return Optional.ofNullable(headerRepository.save(header));
  }

  public Optional<Header> deleteHeader(Long id) {
    Optional<Header> header = this.getHeaderById(id);
    if (header.isPresent())
      headerRepository.deleteById(id);

    return header;
  }

}
