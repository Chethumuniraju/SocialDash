package com.example.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.model.SocialAccount;
import com.example.socialmedia.model.User;

@Repository
public interface SocialAccountRepository extends JpaRepository<SocialAccount, Long> {
    List<SocialAccount> findByUser(User user);
    List<SocialAccount> findByUserAndPlatform(User user, String platform);
}