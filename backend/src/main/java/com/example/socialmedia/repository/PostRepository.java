package com.example.socialmedia.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.model.Post;
import com.example.socialmedia.model.SocialAccount;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findBySocialAccount(SocialAccount socialAccount);
    List<Post> findBySocialAccountAndPlatform(SocialAccount socialAccount, String platform);
    
    @Query("SELECT p FROM Post p WHERE p.socialAccount IN :accounts ORDER BY p.engagement DESC")
    List<Post> findTopPerformingPosts(List<SocialAccount> accounts, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.socialAccount IN :accounts AND p.platform = :platform ORDER BY p.engagement DESC")
    List<Post> findTopPerformingPostsByPlatform(List<SocialAccount> accounts, String platform, Pageable pageable);
}