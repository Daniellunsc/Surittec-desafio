package com.surittec.desafio.Desafio.Surittec.Cliente.Telefone;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.surittec.desafio.Desafio.Surittec.Cliente.Cliente;
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
    @JsonBackReference
    private Cliente cliente;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
