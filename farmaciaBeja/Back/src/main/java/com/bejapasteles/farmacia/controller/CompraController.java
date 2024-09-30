package com.bejapasteles.farmacia.controller;

import com.bejapasteles.farmacia.entity.Compra;
import com.bejapasteles.farmacia.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @GetMapping
    public List<Compra> getAllCompras() {
        return compraService.getAllCompras();
    }

    @PostMapping
    public Compra createCompra(@RequestBody Compra compra) {
        return compraService.createCompra(compra);
    }
}
