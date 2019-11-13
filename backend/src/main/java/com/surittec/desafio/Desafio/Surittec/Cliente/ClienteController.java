package com.surittec.desafio.Desafio.Surittec.Cliente;

import com.surittec.desafio.Desafio.Surittec.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente createCliente(@Valid @RequestBody Cliente cliente){
        List<Cliente> duplicatedClientes = clienteRepository.findByCPF(cliente.getCPF());
        if(duplicatedClientes.size() == 0) {
            return clienteRepository.save(cliente);
        }
        Cliente errorCLiente = new Cliente();
        errorCLiente.setCPF("Já existe um cliente com esse CPF");
        return errorCLiente;
    }
}
