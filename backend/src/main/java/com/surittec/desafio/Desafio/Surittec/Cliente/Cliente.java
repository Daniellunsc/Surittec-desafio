package com.surittec.desafio.Desafio.Surittec.Cliente;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="clientes")
@EntityListeners(AuditingEntityListener.class)
public class Cliente {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name="nome", nullable = false)
    private String nome;

    @Column(name="cpf", nullable = false)
    private String cpf;


    private ClienteEndereco Endereco;
    private List<String> Telefones;
    private List<String> Email;

}
