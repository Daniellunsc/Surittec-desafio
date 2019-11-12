package com.surittec.desafio.Desafio.Surittec.Cliente;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="cliente_endereco")
@EntityListeners(AuditingEntityListener.class)
public class ClienteEndereco {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name="cep", nullable = false)
    private String cep;

    @Column(name="logradouro", nullable = false)
    private String logradouro;

    @Column(name="bairro", nullable = false)
    private String bairro;

    @Column(name="cidade", nullable = false)
    private String cidade;

    @Column(name="uf", nullable = false)
    private String uf;
}
