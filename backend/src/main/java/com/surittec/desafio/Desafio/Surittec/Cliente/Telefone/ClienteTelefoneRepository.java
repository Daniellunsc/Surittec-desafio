package com.surittec.desafio.Desafio.Surittec.Cliente.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteTelefoneRepository extends JpaRepository<ClienteTelefone, Long> {
}
