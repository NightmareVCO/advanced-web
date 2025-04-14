package com.icc.web.repositories;

import com.icc.web.model.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsername(String username);

    boolean existsByUsernameIgnoreCase(String username);

    void deleteByUsername(String username);
    Page<UserInfo> findAll(Pageable pageable);
}