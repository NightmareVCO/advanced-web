package com.icc.web.services;

import com.icc.web.model.UserInfo;
import com.icc.web.repositories.UserInfoRepository;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    private final UserInfoRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserInfoService(UserInfoRepository userInfoRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userInfoRepository;
        this.encoder = encoder;
    }

    public void save(UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
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
}
