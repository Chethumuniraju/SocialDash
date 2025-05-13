package com.example.socialmedia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlatformComparisonDTO {
    private String name;
    private Integer followers;
    private Double engagement;
    private Integer impressions;
}