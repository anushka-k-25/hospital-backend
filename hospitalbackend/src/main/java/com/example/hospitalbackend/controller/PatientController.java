package com.example.hospitalbackend.controller;

import com.example.hospitalbackend.entity.Patient;
import com.example.hospitalbackend.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatientController {

    @Autowired
    PatientRepository repo;

    // ================= SAVE PATIENT =================

    @PostMapping("/addPatient")
    public Patient addPatient(
            @RequestBody Patient patient) {

        return repo.save(patient);
    }

    // ================= DISPLAY PATIENTS =================

    @GetMapping("/patients")
    public List<Patient> getPatients() {

        return repo.findAll();
    }

    // ================= DELETE PATIENT =================

    @DeleteMapping("/deletePatient/{id}")
    public String deletePatient(
            @PathVariable int id) {

        repo.deleteById(id);

        return "Patient Deleted";
    }
}