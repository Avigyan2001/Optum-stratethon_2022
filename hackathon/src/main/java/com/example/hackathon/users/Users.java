package com.example.hackathon.users;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class Users {

    Map<String,User> users = new HashMap<>();

    public synchronized boolean registerUser(String userName, String password) {
        if(users.containsKey(userName)) {
            return false;
        } else {
            User user = new User();
            user.setPassword(password);
            users.put(userName, user);
            return true;
        }
    } 

    public boolean loginUser(String userName, String password) {
        if(users.containsKey(userName)) {
            if(users.get(userName).getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public void setAge(String userName, Integer age) {
        User user = users.get(userName);
        user.setAge(age);
        users.put(userName, user);
    }

    public void setLocation(String userName, String location) {
        User user = users.get(userName);
        user.setLocation(location);
        users.put(userName, user);
    }

    public void setGender(String userName, String gender) {
        User user = users.get(userName);
        user.setGender(gender);
        users.put(userName, user);
    }

    public User getUser(String userName) {
        return users.get(userName);
    }
}
