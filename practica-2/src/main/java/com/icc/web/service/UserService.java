package com.icc.web.service;

import com.icc.web.model.User;
import com.icc.web.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
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
