package com.surittec.desafio.Desafio.Surittec.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteTelefoneRepository extends JpaRepository<ClienteTelefone, Long> {
}
