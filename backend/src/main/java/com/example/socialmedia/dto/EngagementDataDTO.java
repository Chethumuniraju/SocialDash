package com.example.socialmedia.dto;

import java.time.LocalDate;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EngagementDataDTO {
    private LocalDate date;
    private Map<String, Integer> platformData;
}