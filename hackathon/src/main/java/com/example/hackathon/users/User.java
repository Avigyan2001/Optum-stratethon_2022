package com.example.hackathon.users;

import lombok.Data;

@Data
public class User {
    String password;
    Integer age;
    String location;
    String gender;
}