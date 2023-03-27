package com.gerenusers.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.gerenusers.model.Usuario;
import com.gerenusers.model.UsuarioType;
import com.gerenusers.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	private final PasswordEncoder encoder;
	
	public UsuarioController(PasswordEncoder encoder) {
		this.encoder = encoder;
	}
	
	@GetMapping("/show")
	public List<Usuario> show(Long id, @RequestParam String filter)  {
		return usuarioRepository.getList(id, filter);
	}
	
	@GetMapping("/index")
	public ResponseEntity<Object> index(@RequestParam Long id, Authentication authentication) {
		
		Usuario loggedUser = getLoggedUser(authentication);
		
		if (loggedUser.getTipo() != UsuarioType.administrador && id != loggedUser.getId()) {
			
			return new ResponseEntity<Object>(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
		}
		
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		
		usuario.get().setPassword((usuario.get().getPassword()));
		
		return new ResponseEntity<Object>(usuario, new HttpHeaders(), HttpStatus.OK);
	}
	
	@GetMapping("/get-current-user")
	public Usuario getCurrentUser(Authentication authentication) {
		return getLoggedUser(authentication);
	}
	
	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> store(@RequestBody Usuario usuario, @RequestParam boolean changePassword, Authentication authentication){
		Usuario loggedUser = getLoggedUser(authentication);
		
		if (loggedUser.getTipo() != UsuarioType.administrador && (usuario.getId() != loggedUser.getId())) {
			
			return new ResponseEntity<Object>(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
		}
		
		
		Optional<Usuario> usuarioDb = usuarioRepository.findByLogin(usuario.getLogin());
		
		if (usuarioDb.isPresent() && usuarioDb.get().getId() > 0 && usuarioDb.get().getId() != usuario.getId()) {
			return new ResponseEntity<Object>("Já existe um usuário com esse e-mail.", new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (changePassword) {
			usuario.setPassword(encoder.encode(usuario.getPassword()));
		}
		
		usuario.setLogin(usuario.getLogin().toLowerCase());
		usuario = usuarioRepository.save(usuario);
		
		return new ResponseEntity<Object>(usuario, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/destroy")
	public ResponseEntity<Object> destroy(@RequestParam Long id, Authentication authentication) {	
		Usuario user = getLoggedUser(authentication);
		
		if (user.getTipo() != UsuarioType.administrador) {
			return new ResponseEntity<Object>(new HttpHeaders(), HttpStatus.UNAUTHORIZED);
		}
		
		usuarioRepository.deleteById(id);
		
		return new ResponseEntity<Object>(new HttpHeaders(), HttpStatus.OK);
	}
	
	private Usuario getLoggedUser(Authentication authentication) {
		String usuarioData = (String) authentication.getPrincipal();
		Optional<Usuario> user =  usuarioRepository.findByLogin(usuarioData);
		
		return user.get();
	}
	
}
