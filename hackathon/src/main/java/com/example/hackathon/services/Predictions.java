package com.example.hackathon.services;

import java.io.File;
import java.io.FileReader;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

@Service
public class Predictions {

    private Double mapGender(String string) {
        if(string.equals("M")) {
            return 20.0;
        } else {
            return 0.0;
        }
    }

    private Double mapAge(String string) {
        return 2022 - Double.parseDouble(string.substring(0, 4));
    }

    private void increment(Map<String,Double> m, String key, Double d) {
        if (m.get(key) == null) {
            m.put(key, d);
        } else {
            Double val = m.get(key);
            val += d;
            m.put(key, val);
        }
    }
     
    public List <String> predictImmunization(Double age, String genderString) {

        Double gender = mapGender(genderString);

        Map <String,Double> sumGender = new HashMap<>();
        Map <String,Double> countGender = new HashMap<>();
        Map <String,Double> sumAge = new HashMap<>();
        Map <String,Double> countAge = new HashMap<>();
 
        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/DF.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String row[] : allData) {
                String currentName = row[5];
                Double currentGender = mapGender(row[1]);
                Double currentAge = mapAge(row[3]);
                increment(sumGender, currentName, currentGender);
                increment(countGender, currentName, 1.0);
                increment(sumAge, currentName, currentAge);
                increment(countAge, currentName, 1.0);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        List <Pair<Double,String>> l = new ArrayList<>();

        for(Map.Entry<String, Double> entry : sumGender.entrySet()) {
            String currentName = entry.getKey();
            Double averageGender = sumGender.get(currentName) / countGender.get(currentName);
            Double averageAge = sumGender.get(currentName) / countGender.get(currentName);
            Double d1 = Math.abs(averageAge - age);
            Double d2 = Math.abs(averageGender - gender);
            Double distance = Math.sqrt(d1 * d1 + d2 * d2);
            l.add(new ImmutablePair<Double, String>(distance, currentName));
        }

        Collections.sort(l);
        
        List <String> ret = new ArrayList<>();

        for(int i = 0; i < 5; i ++) {
            ret.add(l.get(i).getValue());
        }

        return ret;
    }
}
