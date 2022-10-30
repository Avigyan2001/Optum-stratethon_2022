This application has been developed as a part of [Optum Stratethon 2022](https://unstop.com/competition/optum-stratethon-e-track-optum-stratethon-season-4-optum-409946).

## Installation

To run the app :

* Clone the repository
* Unzip ```csv.zip``` and copy the folder over to ```/hackathon/src/main/java/com/example/hackathon/```
* Start the backend at ```/hackathon``` by running it as a [Spring Boot application](https://www.geeksforgeeks.org/how-to-run-spring-boot-application/) at port 8080
* Start the frontend at ```/frontend``` by using ```npm start``` at port 3000

## AI systems

* We have used a Minimum distance classifier as part of our backend in our webapp to predict the vaccine/immunization(s) to be reccommended to a user on the basis of their gender, age, and geographic location.

* We have also designed a ANN(Aritificial Neural Network) solution to solve the problem of suggesting vaccines to a user. Details are in the ipynb notebook - optum_strat_vaccine.ipynb. We have modified our training data by using a vector of size N(= number of unique vaccines available) as our labels, so that it can predict a set of most probable vaccines instead of just one.