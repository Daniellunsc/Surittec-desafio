package com.surittec.desafio.Desafio.Surittec.User;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.surittec.desafio.Desafio.Surittec.Cliente.ClienteEmail;
import com.surittec.desafio.Desafio.Surittec.Log.Log;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="usuario", nullable = false)
    private String usuario;

    @Column(name="senha", nullable = false)
    private String senha;

    @OneToMany(mappedBy = "usuario", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private List<Log> logs;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Log> getLogs() {
        return logs;
    }

    public void setLogs(List<Log> logs) {
        this.logs = logs;
    }
}
