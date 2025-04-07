package com.icc.web.services;

import com.icc.web.model.UserInfo;
import com.icc.web.model.UserDetailsImpl;
import com.icc.web.repositories.UserInfoRepository;
import com.icc.web.utils.constants.Role;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;

    public UserDetailsServiceImpl(UserInfoRepository userInfoRepository, BCryptPasswordEncoder encoder) {
        this.userInfoRepository = userInfoRepository;

        if(userInfoRepository.count() == 0) {
            UserInfo admin = UserInfo.builder()
                    .username("admin")
                    .password(encoder.encode("admin"))
                    .name("Admin")
                    .email("admin@admin.com")
                    .active(true)
                    .role(Role.ADMIN).build();
            userInfoRepository.save(admin);
        }
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = userInfoRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserDetailsImpl(user);
    }
}