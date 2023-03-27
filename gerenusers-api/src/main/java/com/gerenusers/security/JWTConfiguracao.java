package com.gerenusers.security;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.ldap.EmbeddedLdapServerContextSourceFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.gerenusers.service.DetalheUsuarioServiceImpl;

@EnableWebSecurity
@Configuration
public class JWTConfiguracao{
	
	private final DetalheUsuarioServiceImpl usuarioService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationConfiguration authenticationConfiguration;
	
	public JWTConfiguracao(DetalheUsuarioServiceImpl usuarioService, PasswordEncoder passwordEncoder, AuthenticationConfiguration authenticationConfiguration) {
		super();
		this.usuarioService = usuarioService;
		this.passwordEncoder = passwordEncoder;
		this.authenticationConfiguration = authenticationConfiguration;
	}
	
	@Bean	
	AuthenticationManager authenticationManager() throws Exception {
	    return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       http.csrf().disable().authorizeHttpRequests()
            	.requestMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated()
                .and()
               .addFilter(new JWTAutenticarFilter(authenticationManager()))
              .addFilter(new JWTValidarFilter(authenticationManager()))
             .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       
       List<String> allowedMethods = Arrays.asList(new String[]{"GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT"});;
       
       CorsConfiguration corsConfigurationn = new CorsConfiguration();
       corsConfigurationn.setAllowedMethods(allowedMethods);
       
       http.cors().configurationSource(request -> corsConfigurationn.applyPermitDefaultValues());
       
       return http.build();
    }
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", corsConfiguration);
		
		return source;
	}
	
}
