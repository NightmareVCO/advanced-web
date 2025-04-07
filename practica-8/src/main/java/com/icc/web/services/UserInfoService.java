package com.icc.web.services;

import com.icc.web.model.UserInfo;
import com.icc.web.repositories.UserInfoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoService {
    private final UserInfoRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserInfoService(UserInfoRepository userInfoRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userInfoRepository;
        this.encoder = encoder;
    }

    public void save(UserInfo userInfo) {
        if (userInfo.getPassword() != null && !userInfo.getPassword().startsWith("$2a$")) {
            userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        }
        userRepository.save(userInfo);
    }

    public UserInfo findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsernameIgnoreCase(username);
    }

    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserInfo> findAll() {
        return userRepository.findAll();
    }

    public Page<UserInfo> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public long count() {
        return userRepository.count();
    }
}