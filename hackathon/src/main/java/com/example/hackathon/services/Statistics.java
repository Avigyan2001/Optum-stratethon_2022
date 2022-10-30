package com.example.hackathon.services;

import java.io.File;
import java.io.FileReader;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

@Service
public class Statistics {

    private void increment(Map<String,Double> m, String key, Double d) {
        if (m.get(key) == null) {
            m.put(key, d);
        } else {
            Double val = m.get(key);
            val += d;
            m.put(key, val);
        }
    }

    private <T extends Comparable> Map<String, T> sortByValueDescending(Map<String, T> hm, int limit) {
        // Create a list from elements of HashMap
        List<Map.Entry<String, T> > list
            = new LinkedList<Map.Entry<String, T>>(
                hm.entrySet());
 
        // Sort the list using lambda expression
        Collections.sort(
            list,
            (i1,
             i2) -> i2.getValue().compareTo(i1.getValue()));
 
        // put data from sorted list to hashmap
        int count = 0;
        HashMap<String, T> temp
            = new LinkedHashMap<String, T>();
        for (Map.Entry<String, T> aa : list) {
            temp.put(aa.getKey(), aa.getValue());
            count += 1;
            if(count ==  limit) {
                break;
            }
        }
        return temp;
    }
    
    public Map<String,Integer> commonAllergies() {
        Map<String,Integer> allergiesMap = new HashMap<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/allergies.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                Integer count = allergiesMap.get(row[6]);
                if(count == null) {
                    count = 1;
                } else {
                    count += 1;
                }
                allergiesMap.put(row[6], count);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return sortByValueDescending(allergiesMap, 5);
    }

    public Map<String,Integer> commonDevices() {
        Map<String,Integer> devicesMap = new HashMap<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/devices.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                Integer count = devicesMap.get(row[5]);
                if(count == null) {
                    count = 1;
                } else {
                    count += 1;
                }
                devicesMap.put(row[5], count);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return sortByValueDescending(devicesMap, 5);
    }

    public Map<String,Integer> commonImmunizations() {
        Map<String,Integer> immunizationsMap = new HashMap<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/immunizations.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                Integer count = immunizationsMap.get(row[4]);
                if(count == null) {
                    count = 1;
                } else {
                    count += 1;
                }
                immunizationsMap.put(row[4], count);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return sortByValueDescending(immunizationsMap, 5);
    }

    public Map<String,Double> averageMedicationPrice() {
        Map <String, Double> countMap = new HashMap<>();
        Map <String, Double> sumMap = new HashMap<>();
        Map <String, Double> averageMap = new HashMap<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/medications.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                Double count = countMap.get(row[6]);
                Double sum = countMap.get(row[6]);
                if(count == null) {
                    count = 1.0;
                } else {
                    count += 1.0;
                }
                if(sum == null) {
                    sum = Double.parseDouble(row[10]);
                } else {
                    sum += Double.parseDouble(row[10]);
                }
                countMap.put(row[6], count);
                sumMap.put(row[6], sum);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        for(Map.Entry<String, Double> entry : sumMap.entrySet()) {
            averageMap.put(entry.getKey(), entry.getValue() / countMap.get(entry.getKey()));
        }

        return sortByValueDescending(averageMap,20);
    }

    public Map<String,Double> averageProcedurePrice() {
        Map <String, Double> countMap = new HashMap<>();
        Map <String, Double> sumMap = new HashMap<>();
        Map <String, Double> averageMap = new HashMap<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/procedures.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                Double count = countMap.get(row[5]);
                Double sum = countMap.get(row[5]);
                if(count == null) {
                    count = 1.0;
                } else {
                    count += 1.0;
                }
                if(sum == null) {
                    sum = Double.parseDouble(row[6]);
                } else {
                    sum += Double.parseDouble(row[6]);
                }
                countMap.put(row[5], count);
                sumMap.put(row[5], sum);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        for(Map.Entry<String, Double> entry : sumMap.entrySet()) {
            averageMap.put(entry.getKey(), entry.getValue() / countMap.get(entry.getKey()));
        }

        return sortByValueDescending(averageMap,20);
    }

    public List <String> getConditions() {
        List <String> conditionList = new ArrayList<>();

        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/DF2.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String [] row : allData) {
                String condition = row[1];
                if(!conditionList.contains(condition)) {
                    conditionList.add(condition);
                }
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return conditionList;
    }

    public Map<String,Double> predictCosts(String condition) {

        Map <String,Double> msum = new HashMap<>();
        Map <String,Double> mcount = new HashMap<>();
        Map <String,Double> ret = new HashMap<>();
        
        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/DF2.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String row[] : allData) {
                String currentCondition = row[1];
                Double currentCost = Double.parseDouble(row[2]);
                Boolean accurate = (row[2].equals(row[3]));

                increment(mcount, currentCondition, accurate ? 3.0 : 1.0);
                increment(msum, currentCondition, accurate ? 3 * currentCost : currentCost);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        ret.put("medication", msum.get(condition) / mcount.get(condition));
       
        Map <String,Double> psum = new HashMap<>();
        Map <String,Double> pcount = new HashMap<>();
        
        try {
            File file = new File(FileSystems.getDefault().getPath("").toAbsolutePath() + "/src/main/java/com/example/hackathon/csv/procedures.csv");
            FileReader fileReader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).withSkipLines(1).build();

            List <String[]> allData = csvReader.readAll();

            for(String row[] : allData) {
                String currentCondition = row[8];
                Double currentCost = Double.parseDouble(row[6]);
                Boolean accurate = false;

                increment(pcount, currentCondition, accurate ? 3.0 : 1.0);
                increment(psum, currentCondition, accurate ? 3 * currentCost : currentCost);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        ret.put("procedure", psum.get(condition) / pcount.get(condition));

        return ret;
    }
}
