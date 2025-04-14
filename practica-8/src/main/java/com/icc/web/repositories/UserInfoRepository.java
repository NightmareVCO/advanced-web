package com.icc.web.repositories;

import com.icc.web.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsername(String username);

    boolean existsByUsernameIgnoreCase(String username);

    void deleteByUsername(String username);
}
