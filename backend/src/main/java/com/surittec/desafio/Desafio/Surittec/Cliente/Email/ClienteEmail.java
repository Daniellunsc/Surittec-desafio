package com.surittec.desafio.Desafio.Surittec.Cliente.Email;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.surittec.desafio.Desafio.Surittec.Cliente.Cliente;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="cliente_email")
@EntityListeners(AuditingEntityListener.class)
public class ClienteEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="email", nullable = false)
    private String email;

    @OneToOne()
    @JsonBackReference
    private Cliente cliente;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
