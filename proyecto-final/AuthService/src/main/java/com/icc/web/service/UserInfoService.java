package com.icc.web.service;

import com.icc.web.model.UserInfo;
import com.icc.web.repository.UserInfoRepository;
import org.bson.types.ObjectId;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final BCryptPasswordEncoder encoder;

    public UserInfoService(UserInfoRepository userInfoRepository, BCryptPasswordEncoder encoder) {
        this.userInfoRepository = userInfoRepository;
        this.encoder = encoder;
    }

    public void save (UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        userInfoRepository.save(userInfo);
    }

    public UserInfo findByUsername(String username) {
        return userInfoRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userInfoRepository.existsByUsernameIgnoreCase(username);
    }

    public void deleteByUsername(String username) {
        userInfoRepository.deleteByUsername(username);
    }

    public void deleteById(ObjectId id) {
        userInfoRepository.deleteById(id);
    }

    public List<UserInfo> findAll() {
        return userInfoRepository.findAll();
    }

}
