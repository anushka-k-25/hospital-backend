package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")

@CrossOrigin("*")

public class PatientController {

    @Autowired
    PatientRepository repository;

    // ================= GET ALL PATIENTS =================

    @GetMapping

    public List<Patient> getAllPatients() {

        return repository.findAll();
    }

    // ================= ADD PATIENT =================

    @PostMapping

    public Patient addPatient(
            @RequestBody Patient patient) {

        return repository.save(patient);
    }

    // ================= DELETE PATIENT =================

    @DeleteMapping("/{id}")

    public String deletePatient(
            @PathVariable int id) {

        repository.deleteById(id);

        return "Patient Deleted";
    }
}