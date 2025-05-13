package com.example.socialmedia.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String platform;
    private String content;
    private LocalDateTime date;
    private Integer impressions;
    private Integer likes;
    private Double engagement;
}