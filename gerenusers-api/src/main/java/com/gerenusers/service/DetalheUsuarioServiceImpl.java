package com.gerenusers.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.gerenusers.data.DetalheUsuarioData;
import com.gerenusers.model.Usuario;
import com.gerenusers.repository.UsuarioRepository;

@Component
public class DetalheUsuarioServiceImpl implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> usuario = usuarioRepository.findByLogin(username);
		if(usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuário " + username + " não encontrado");
		}
		
		return new DetalheUsuarioData(usuario);
	}
	

}
