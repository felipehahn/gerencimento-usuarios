package com.gerenusers.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gerenusers.model.Usuario;

import jakarta.transaction.Transactional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	public Optional<Usuario> findByLogin(String login);
	
	@Transactional
	@Modifying
	@Query("SELECT u FROM Usuario u WHERE u.id != ?1 and u.nome ILIKE %?2%")
	public List<Usuario> getList(Long id, String nome);
	
	
}
