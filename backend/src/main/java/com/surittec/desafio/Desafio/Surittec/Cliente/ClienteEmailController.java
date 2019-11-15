package com.surittec.desafio.Desafio.Surittec.Cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClienteEmailController {

    @Autowired
    private ClienteEmailRepository emailRepository;

    @GetMapping("/clienteEmails")
    public List<ClienteEmail> getAllEmails(){
        return emailRepository.findAll();
    }

    @PostMapping("/clienteEmails")
    public ClienteEmail createEmail(@RequestBody ClienteEmail clienteEmail){
        return emailRepository.save(clienteEmail);
    }

    @PutMapping("/clienteEmails/{id}")
    public ResponseEntity<ClienteEmail> updateEmail(
            @PathVariable(value = "id") Long clEmailId, @Valid @RequestBody ClienteEmail clEmail) throws ResourceNotFoundException {
        ClienteEmail clienteEmail =
                emailRepository
                        .findById(clEmailId)
                        .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado " + clEmail));
        clienteEmail.setCliente(new Cliente(clEmail.getCliente().getId()));
        clienteEmail.setEmail(clEmail.getEmail());
        final ClienteEmail emailAtualizado = emailRepository.save(clienteEmail);
        return ResponseEntity.ok(emailAtualizado);
    }

    @DeleteMapping("/clienteE" +
            "mails/{id}")
    public ClienteEmail deleteEmail(@PathVariable(value="id") Long clEmailId){
        ClienteEmail emailToDelete = emailRepository.findById(clEmailId).orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado"));
        emailRepository.delete(emailToDelete);
        return emailToDelete;
    }

}
