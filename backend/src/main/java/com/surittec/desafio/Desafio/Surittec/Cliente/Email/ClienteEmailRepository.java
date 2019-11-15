package com.surittec.desafio.Desafio.Surittec.Cliente.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteEmailRepository extends JpaRepository<ClienteEmail, Long> {
}
