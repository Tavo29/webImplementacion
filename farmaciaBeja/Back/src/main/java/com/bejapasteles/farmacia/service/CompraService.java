package com.bejapasteles.farmacia.service;

import com.bejapasteles.farmacia.entity.Compra;
import com.bejapasteles.farmacia.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    public List<Compra> getAllCompras() {
        return compraRepository.findAll();
    }

    public Compra createCompra(Compra compra) {
        return compraRepository.save(compra);
    }
}
