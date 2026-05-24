package com.example.hospitalbackend.service;
import java.util.List;
import com.example.hospitalbackend.entity.Patient;

import com.example.hospitalbackend.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service

public class PatientService {

    @Autowired

    PatientRepository repository;

    public Patient savePatient(
            Patient patient) {

        return repository.save(patient);
    }
    public List<Patient> getAllPatients() {

        return repository.findAll();
    }
}