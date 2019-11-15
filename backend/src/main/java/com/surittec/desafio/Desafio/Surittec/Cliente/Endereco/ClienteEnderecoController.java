package com.surittec.desafio.Desafio.Surittec.Cliente.Endereco;

import com.surittec.desafio.Desafio.Surittec.Cliente.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClienteEnderecoController {

    @Autowired
    private ClienteEnderecoRepository enderecoRepository;

    @GetMapping("/clienteEndereco")
    public List<ClienteEndereco> getAllEnderecos() {
        return enderecoRepository.findAll();
    }

    @PostMapping("/clienteEndereco")
    public ClienteEndereco createEndereco(@RequestBody ClienteEndereco clienteEndereco) {
        return enderecoRepository.save(clienteEndereco);
    }

    @PutMapping("/clienteEndereco/{id}")
    public ResponseEntity<ClienteEndereco> updateEndereco(
            @PathVariable(value = "id") Long clEnderecoId, @Valid @RequestBody ClienteEndereco clEndereco) throws ResourceNotFoundException {
        ClienteEndereco clienteEndereco =
                enderecoRepository
                        .findById(clEnderecoId)
                        .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado " + clEnderecoId));
        clienteEndereco.setCliente(new Cliente(clEndereco.getCliente().getId()));
        clienteEndereco.setCep(clEndereco.getCep());
        clienteEndereco.setLogradouro(clEndereco.getLogradouro());
        clienteEndereco.setBairro(clEndereco.getBairro());
        clienteEndereco.setCidade(clEndereco.getCidade());
        clienteEndereco.setUf(clEndereco.getUf());
        clienteEndereco.setComplemento(clEndereco.getComplemento());
        final ClienteEndereco enderecoAtualizado = enderecoRepository.save(clienteEndereco);
        return ResponseEntity.ok(enderecoAtualizado);
    }

}
