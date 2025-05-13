package com.example.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.model.AudienceData;
import com.example.socialmedia.model.SocialAccount;

@Repository
public interface AudienceDataRepository extends JpaRepository<AudienceData, Long> {
    List<AudienceData> findBySocialAccount(SocialAccount socialAccount);
    List<AudienceData> findBySocialAccountAndPlatform(SocialAccount socialAccount, String platform);
}