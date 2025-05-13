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
@Table(name = "social_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialAccount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String platform;
    private String accountName;
    private String accountId;
    private Integer followers;
    private Double engagementRate;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}