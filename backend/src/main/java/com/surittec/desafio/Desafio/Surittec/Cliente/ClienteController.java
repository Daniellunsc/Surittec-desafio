package com.surittec.desafio.Desafio.Surittec.Cliente;

import com.surittec.desafio.Desafio.Surittec.Cliente.Email.ClienteEmail;
import com.surittec.desafio.Desafio.Surittec.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> getOneCliente(@PathVariable(value="id") Long userId){
        Cliente cliente =
                clienteRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado :: " + userId));
        return ResponseEntity.ok().body(cliente);
    }

    @PostMapping("/clientes")
    public Cliente createCliente(@Valid @RequestBody Cliente cliente){
        return clienteRepository.save(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> updateCliente(
            @PathVariable(value = "id") Long clienteId, @Valid @RequestBody Cliente cliente) throws ResourceNotFoundException {
        Cliente clientToSave =
                clienteRepository
                        .findById(clienteId)
                        .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado " + clienteId));
        clientToSave.setNome(cliente.getNome());
        clientToSave.setCPF(cliente.getCPF());
        final Cliente clienteAtualizado = clienteRepository.save(clientToSave);
        return ResponseEntity.ok(clienteAtualizado);
    }

    @DeleteMapping("/clientes/{id}")
    public Cliente deleteCliente(@PathVariable(value="id") Long clientId){
        Cliente emailToDelete = clienteRepository.findById(clientId).orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado"));
        clienteRepository.delete(emailToDelete);
        return emailToDelete;
    }
}
