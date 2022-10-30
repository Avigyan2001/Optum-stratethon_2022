package com.example.hackathon.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.hackathon.services.Statistics;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/dashboard")
public class dashboardController {
    
    @Autowired
    Statistics statistics;

    @RequestMapping(value="/allergies", method=RequestMethod.GET)
    public Map<String,Integer> getAllergies() {
        return statistics.commonAllergies();
    }

    @RequestMapping(value = "/devices", method = RequestMethod.GET)
    public Map<String,Integer> getDevices() {
        return statistics.commonDevices();
    }

    @RequestMapping(value = "/immunizations", method = RequestMethod.GET)
    public Map<String, Integer> getImmunizations() {
        return statistics.commonImmunizations();
    }

    @RequestMapping(value = "/medications", method = RequestMethod.GET)
    public Map<String, Double> getMedications() {
        return statistics.averageMedicationPrice();
    }

    @RequestMapping(value = "/procedures", method = RequestMethod.GET)
    public Map<String, Double> getProcedures() {
        return statistics.averageProcedurePrice();
    }
}
