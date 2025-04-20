package com.icc.web.service;

import com.icc.web.model.UserDetailsImpl;
import com.icc.web.model.UserInfo;
import com.icc.web.repository.UserInfoRepository;
import com.icc.web.util.constants.Role;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;

    public UserDetailsServiceImpl(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (userInfoRepository.count() == 0) {
            UserInfo admin =
                    UserInfo.builder()
                            .firstName("Admin")
                            .lastName("Admin")
                            .username("admin")
                            .email("admin@admin.com")
                            .password(passwordEncoder.encode("admin"))
                            .active(true)
                            .role(Role.ADMIN)
                            .build();
            userInfoRepository.save(admin);
        }
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = userInfoRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserDetailsImpl(user);
    }
}
