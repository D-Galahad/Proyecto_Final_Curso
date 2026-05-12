package com.tiendaBack.tiendaBack.service;

import com.tiendaBack.tiendaBack.model.UserRequest;
import com.tiendaBack.tiendaBack.model.models.Role;
import com.tiendaBack.tiendaBack.model.models.User;
import com.tiendaBack.tiendaBack.model.models.enums.Roles;
import com.tiendaBack.tiendaBack.repository.RoleRepository;
import com.tiendaBack.tiendaBack.repository.UserRepository;
import com.tiendaBack.tiendaBack.exception.ResourceNotFoundException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        // Create roles if they don't exist
        if (roleRepository.findByName(Roles.ROLE_ADMIN).isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName(Roles.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName(Roles.ROLE_USER).isEmpty()) {
            Role userRole = new Role();
            userRole.setName(Roles.ROLE_USER);
            roleRepository.save(userRole);
        }

        // Create default users if they don't exist
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setLastname("Administrator");
            admin.setEmail("admin@example.com");
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setAdmin(true);
            
            Role adminRole = roleRepository.findByName(Roles.ROLE_ADMIN).get();
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            admin.setRolesName(Arrays.asList(adminRole, userRole));
            
            userRepository.save(admin);
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            User user = new User();
            user.setName("User");
            user.setLastname("Regular");
            user.setEmail("user@example.com");
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setAdmin(false);
            
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            user.setRolesName(Collections.singletonList(userRole));
            
            userRepository.save(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        Collection<GrantedAuthority> authorities = user.getRolesName().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().toString()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
    }

    @Override
    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.isAdmin()) {
            Role adminRole = roleRepository.findByName(Roles.ROLE_ADMIN).get();
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            user.setRolesName(Arrays.asList(adminRole, userRole));
        } else {
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            user.setRolesName(Collections.singletonList(userRole));
        }

        return userRepository.save(user);
    }

    @Override
    public User update(UserRequest userRequest, Long id) {
        User user = findById(id);

        user.setName(userRequest.getName());
        user.setLastname(userRequest.getLastname());
        user.setEmail(userRequest.getEmail());
        user.setUsername(userRequest.getUsername());
        user.setAdmin(userRequest.isAdmin());

        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        if (userRequest.isAdmin()) {
            Role adminRole = roleRepository.findByName(Roles.ROLE_ADMIN).get();
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            user.setRolesName(Arrays.asList(adminRole, userRole));
        } else {
            Role userRole = roleRepository.findByName(Roles.ROLE_USER).get();
            user.setRolesName(Collections.singletonList(userRole));
        }

        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario", "id", id);
        }
        userRepository.deleteById(id);
    }
}
