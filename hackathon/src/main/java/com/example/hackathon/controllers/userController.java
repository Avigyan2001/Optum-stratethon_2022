package com.example.hackathon.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.hackathon.services.Predictions;
import com.example.hackathon.services.Statistics;
import com.example.hackathon.users.User;
import com.example.hackathon.users.Users;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class userController {

    @Autowired
    Users users;

    @Autowired
    Predictions predictions;

    @Autowired
    Statistics statistics;

    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public Map<String,String> signup(@RequestBody Map<String,Object> payload) {
        Map <String,String> m = new HashMap<>();
        if(users.registerUser(payload.get("userName").toString(), payload.get("password").toString())) {
            m.put("success", "true");
        } else {
            m.put("success", "false");
        }
        return m;
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public Map<String,String> login(@RequestBody Map<String,Object> payload) {
        Map <String,String> m = new HashMap<>();
        if(users.loginUser(payload.get("userName").toString(), payload.get("password").toString())) {
            m.put("success", "true");
        } else {
            m.put("success", "false");
        }
        return m;
    }

    @RequestMapping(value="/setDetails", method=RequestMethod.POST)
    public void setDetails(@RequestBody Map<String,Object> payload) {
        String userName = payload.get("userName").toString();
        String location = payload.get("location").toString();
        String gender = payload.get("gender").toString();
        Integer age = Integer.parseInt(payload.get("age").toString());
        users.setAge(userName, age);
        users.setGender(userName, gender);
        users.setLocation(userName, location);
    }

    @RequestMapping(value="/getDetails", method=RequestMethod.POST)
    public Map<String,String> getDetails(@RequestBody Map<String,Object> payload) {
        String userName = payload.get("userName").toString();
        User user = users.getUser(userName);
        Map<String,String> m = new HashMap<>();
        m.put("location", user.getLocation());
        m.put("gender", user.getGender());
        m.put("age", user.getAge() == null ? null : user.getAge().toString());
        return m;
    }

    @RequestMapping(value="/getImmunizations", method=RequestMethod.POST)
    public List<String> getImmunizations(@RequestBody Map<String,Object> payLoad) {
        Double age = Double.parseDouble(payLoad.get("age").toString());
        String genderString = payLoad.get("gender").toString();
        List<String> list = predictions.predictImmunization(age, genderString);
        return list;
    }

    @RequestMapping(value="/getConditions", method=RequestMethod.GET)
    public List<String> getConditions() {
        return statistics.getConditions();
    }

    @RequestMapping(value="/predictCosts", method=RequestMethod.POST)
    public Map<String,Double> predictCosts(@RequestBody Map<String,Object> payload) {
        return statistics.predictCosts(payload.get("condition").toString());
    }
}
