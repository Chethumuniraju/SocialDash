package com.example.socialmedia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatDTO {
    private String name;
    private String value;
    private Double change;
    private String color;
    private String icon;
}