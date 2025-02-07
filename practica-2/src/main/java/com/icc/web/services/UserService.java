package com.icc.web.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icc.web.model.User;
import com.icc.web.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
  private final UserRepository userRepository;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public User saveUser(User user) {
    return userRepository.save(user);
  }

  public User deleteUser(Long id) {
    User user = userRepository.findById(id).orElse(null);
    if (user != null)
      userRepository.deleteById(id);

    return user;
  }

}
