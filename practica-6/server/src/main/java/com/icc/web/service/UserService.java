/* (C)2025 */
package com.icc.web.service;

import com.icc.web.model.User;
import com.icc.web.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public boolean existsByUsername(String username) {
        return this.getUserByUsername(username).isPresent();
    }

    public boolean existsByEmail(String email) {
        return this.getUserByEmail(email).isPresent();
    }

    public Optional<User> saveUser(User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return Optional.ofNullable(userRepository.save(user));
    }

    public Optional<User> deleteUser(Long id) {
        Optional<User> user = this.getUserById(id);
        if (user.isPresent()) userRepository.deleteById(id);

        return user;
    }
}
