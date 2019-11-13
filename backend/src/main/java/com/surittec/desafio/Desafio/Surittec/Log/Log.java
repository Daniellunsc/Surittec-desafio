package com.surittec.desafio.Desafio.Surittec.Log;

import com.surittec.desafio.Desafio.Surittec.User.User;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="log")
@EntityListeners(AuditingEntityListener.class)
public class Log {

    public Log(){

    }

    public Log(User _usuario, String _hora, String _acao){
        this.setId(0);
        this.setUsuario(_usuario);
        this.setHora(_hora);
        this.setAcao(_acao);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private User usuario;

    @Column(name="acao_hora")
    private String hora;

    @Column(name="acao_executada")
    private String acao;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getAcao() {
        return acao;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }
}
