package com.surittec.desafio.Desafio.Surittec.Cliente;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="cliente_telefone")
@EntityListeners(AuditingEntityListener.class)
public class ClienteTelefone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="tipo", nullable = false)
    private String tipo;

    @Column(name="numero", nullable = false)
    private String numero;

    @OneToOne()
    private Cliente cliente;
}
