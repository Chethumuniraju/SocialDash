package com.example.socialmedia.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.model.EngagementData;
import com.example.socialmedia.model.SocialAccount;

@Repository
public interface EngagementDataRepository extends JpaRepository<EngagementData, Long> {
    List<EngagementData> findBySocialAccountAndDateBetweenOrderByDateAsc(
            SocialAccount socialAccount, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT e FROM EngagementData e WHERE e.socialAccount IN :accounts AND e.date BETWEEN :startDate AND :endDate ORDER BY e.date ASC")
    List<EngagementData> findByAccountsAndDateRange(List<SocialAccount> accounts, LocalDate startDate, LocalDate endDate);
}