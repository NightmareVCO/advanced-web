package com.icc.web.service;

import com.icc.web.model.UserInfo;
import com.icc.web.repository.UserInfoRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;

    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    public Optional<UserInfo> getUserById(ObjectId id) {
        return userInfoRepository.findById(id);
    }

    public List<UserInfo> getUsersByIds(List<ObjectId> ids) {
        return userInfoRepository.findAllById(ids);
    }

    public Optional<UserInfo> getUserByUsername(String username) {
        return Optional.ofNullable(userInfoRepository.findByUsername(username));
    }

    public Optional<UserInfo> getUserByEmail(String email) {
        return Optional.ofNullable(userInfoRepository.findByEmail(email));
    }

    public boolean existsById(ObjectId id) {
        return userInfoRepository.existsById(id);
    }

    public String userExistByRole(ObjectId id) {
        return this.getUserById(id)
                .map(UserInfo::getRole)
                .orElse(null);
    }

    public boolean existsByUsername(String username) {
        return this.getUserByUsername(username).isPresent();
    }

    public boolean existsByEmail(String email) {
        return this.getUserByEmail(email).isPresent();
    }

    public Optional<UserInfo> saveUser(UserInfo userInfo) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));

        return Optional.of(userInfoRepository.save(userInfo));
    }

    public Optional<UserInfo> deleteUser(ObjectId id) {
        Optional<UserInfo> userInfo = this.getUserById(id);
        if (userInfo.isPresent()) {
            userInfoRepository.deleteById(id);
        }
        return userInfo;
    }

    public boolean checkPassword(String receivedPassword, String storedPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(receivedPassword, storedPassword);
    }
}
