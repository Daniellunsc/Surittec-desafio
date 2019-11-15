package com.surittec.desafio.Desafio.Surittec.Cliente.Telefone;

import com.surittec.desafio.Desafio.Surittec.Cliente.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClienteTelefoneController {

    @Autowired
    private ClienteTelefoneRepository telefoneRepository;

    @GetMapping("/clienteTelefones")
    public List<ClienteTelefone> getAllTelefones(){
        return telefoneRepository.findAll();
    }

    @PostMapping("/clienteTelefones")
    public ClienteTelefone createTelefone(@RequestBody ClienteTelefone clienteTelefone){
        return telefoneRepository.save(clienteTelefone);
    }

    @PutMapping("/clienteTelefones/{id}")
    public ResponseEntity<ClienteTelefone> updateTelefone(
            @PathVariable(value = "id") Long clTelefoneId, @Valid @RequestBody ClienteTelefone clTelefone) throws ResourceNotFoundException {
        ClienteTelefone clienteTelefone =
                telefoneRepository
                        .findById(clTelefoneId)
                        .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado " + clTelefone));
        clienteTelefone.setCliente(new Cliente(clTelefone.getCliente().getId()));
        clienteTelefone.setNumero(clTelefone.getNumero());
        clienteTelefone.setTipo(clTelefone.getTipo());
        final ClienteTelefone telefoneAtualizado = telefoneRepository.save(clienteTelefone);
        return ResponseEntity.ok(telefoneAtualizado);
    }

    @DeleteMapping("/clienteTelefones/{id}")
    public ClienteTelefone deleteTelefone(@PathVariable(value="id") Long clTelefoneId){
        ClienteTelefone telefoneToDelete = telefoneRepository.findById(clTelefoneId).orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado"));
        telefoneRepository.delete(telefoneToDelete);
        return telefoneToDelete;
    }

}
