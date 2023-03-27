package com.gerenusers.security;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gerenusers.data.DetalheUsuarioData;
import com.gerenusers.model.Usuario;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter{
	
	public static final int TOKEN_EXPIRACAO = 600_000;
	public static final String TOKEN_SENHA = "6c73a62e-8ef1-4487-8899-9b9616c21072";
	
	public final AuthenticationManager authenticationManager;
	
	public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		try {
			Usuario usuario = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);
			
			//List<SimpleGrantedAuthority> grantedAuthorities = usuario.getAuthorities().(authority -> new SimpleGrantedAuthority(authority)).collect(Collectors.toList());
			
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					usuario.getLogin(),
					usuario.getPassword()
					//usuario.getGrantedAuthorities()
				));
			
		} catch (IOException ex) {
			
			throw new RuntimeException("Falha ao autenticar: " + ex);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		DetalheUsuarioData usuarioData = (DetalheUsuarioData) authResult.getPrincipal();
		
		String token = JWT.create().
				withSubject(usuarioData.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRACAO))
				.sign(Algorithm.HMAC512(TOKEN_SENHA));
		
		response.getWriter().write(token);
		response.getWriter().flush();
	}

}
