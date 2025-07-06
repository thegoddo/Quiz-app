package project.quiz.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import project.quiz.security.jwt.AuthEntryPointJwt;
import project.quiz.security.jwt.AuthTokenFilter;
import project.quiz.security.jwt.JwtUtils;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableMethodSecurity // Enables @PreAuthorize, @PostAuthorize annotations
public class WebSecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final JwtUtils jwtUtils; // Inject JwtUtils here

    public WebSecurityConfig(UserDetailsServiceImpl userDetailsService, AuthEntryPointJwt unauthorizedHandler, JwtUtils jwtUtils) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService); // Pass JwtUtils and UserDetailsService
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Replace "http://localhost:3000" with the actual origin of your frontend application.
        // For multiple origins, use: Arrays.asList("http://localhost:3000", "http://anotherdomain.com")
        // For development, you might use Collections.singletonList("*") but AVOID THIS IN PRODUCTION for security.
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); // e.g., your React/Angular app
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept")); // Allowed request headers
        configuration.setAllowCredentials(true); // Allow sending credentials (cookies, HTTP authentication, JWTs)
        configuration.setMaxAge(3600L); // How long the pre-flight request can be cached (in seconds)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply this CORS config to ALL paths (/**)
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for stateless API
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // Handle auth errors
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless sessions
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Public endpoints for authentication
                        .requestMatchers("/api/test/**").permitAll() // Example: Public test endpoint
                        .requestMatchers("/api/countries/populate").hasRole("ADMIN") // Only Admin can populate
                        .requestMatchers("/api/countries/**").hasAnyRole("USER", "ADMIN") // User or Admin can access country data
                        .requestMatchers("/api/scores/**").permitAll() // Public leaderboard
                        .anyRequest().authenticated() // All other requests require authentication
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
