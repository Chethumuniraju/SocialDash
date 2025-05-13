package com.example.socialmedia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "audience_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AudienceData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String platform;
    private String ageGroup;
    private Integer percentage;
    private String color;
    
    @ManyToOne
    @JoinColumn(name = "social_account_id")
    private SocialAccount socialAccount;
}