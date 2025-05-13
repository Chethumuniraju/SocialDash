package com.example.socialmedia.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.socialmedia.dto.AudienceDataDTO;
import com.example.socialmedia.dto.DashboardStatsDTO;
import com.example.socialmedia.dto.EngagementDataDTO;
import com.example.socialmedia.dto.PlatformComparisonDTO;
import com.example.socialmedia.dto.PostDTO;
import com.example.socialmedia.dto.StatDTO;
import com.example.socialmedia.model.AudienceData;
import com.example.socialmedia.model.EngagementData;
import com.example.socialmedia.model.Post;
import com.example.socialmedia.model.SocialAccount;
import com.example.socialmedia.model.User;
import com.example.socialmedia.repository.AudienceDataRepository;
import com.example.socialmedia.repository.EngagementDataRepository;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.SocialAccountRepository;
import com.example.socialmedia.repository.UserRepository;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SocialAccountRepository socialAccountRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private EngagementDataRepository engagementDataRepository;
    
    @Autowired
    private AudienceDataRepository audienceDataRepository;
    
    public DashboardStatsDTO getDashboardStats(String username, String platform, String timeRange) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<SocialAccount> accounts;
        if ("all".equals(platform)) {
            accounts = socialAccountRepository.findByUser(user);
        } else {
            accounts = socialAccountRepository.findByUserAndPlatform(user, platform);
        }
        
        List<StatDTO> stats = generateStats(accounts, platform);
        List<PlatformComparisonDTO> comparison = generatePlatformComparison(accounts);
        
        return new DashboardStatsDTO(stats, comparison);
    }
    
    public List<EngagementDataDTO> getEngagementData(String username, String platform, String timeRange) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<SocialAccount> accounts;
        if ("all".equals(platform)) {
            accounts = socialAccountRepository.findByUser(user);
        } else {
            accounts = socialAccountRepository.findByUserAndPlatform(user, platform);
        }
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate;
        
        switch (timeRange) {
            case "30d":
                startDate = endDate.minusDays(30);
                break;
            case "90d":
                startDate = endDate.minusDays(90);
                break;
            default: // 7d
                startDate = endDate.minusDays(7);
                break;
        }
        
        List<EngagementData> engagementData = engagementDataRepository.findByAccountsAndDateRange(accounts, startDate, endDate);
        
        // Group by date
        Map<LocalDate, Map<String, Integer>> groupedData = new HashMap<>();
        
        for (EngagementData data : engagementData) {
            groupedData.putIfAbsent(data.getDate(), new HashMap<>());
            groupedData.get(data.getDate()).put(data.getPlatform(), data.getEngagementCount());
        }
        
        List<EngagementDataDTO> result = new ArrayList<>();
        for (Map.Entry<LocalDate, Map<String, Integer>> entry : groupedData.entrySet()) {
            result.add(new EngagementDataDTO(entry.getKey(), entry.getValue()));
        }
        
        // Sort by date
        result.sort((a, b) -> a.getDate().compareTo(b.getDate()));
        
        return result;
    }
    
    public List<AudienceDataDTO> getAudienceData(String username, String platform) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<SocialAccount> accounts;
        if ("all".equals(platform)) {
            accounts = socialAccountRepository.findByUser(user);
        } else {
            accounts = socialAccountRepository.findByUserAndPlatform(user, platform);
        }
        
        List<AudienceData> audienceData = new ArrayList<>();
        for (SocialAccount account : accounts) {
            if ("all".equals(platform)) {
                audienceData.addAll(audienceDataRepository.findBySocialAccount(account));
            } else {
                audienceData.addAll(audienceDataRepository.findBySocialAccountAndPlatform(account, platform));
            }
        }
        
        // Aggregate data by age group
        Map<String, Integer> aggregatedData = new HashMap<>();
        Map<String, String> colorMap = new HashMap<>();
        
        for (AudienceData data : audienceData) {
            aggregatedData.put(data.getAgeGroup(), 
                    aggregatedData.getOrDefault(data.getAgeGroup(), 0) + data.getPercentage());
            colorMap.put(data.getAgeGroup(), data.getColor());
        }
        
        // Convert to DTOs
        List<AudienceDataDTO> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : aggregatedData.entrySet()) {
            result.add(new AudienceDataDTO(
                    entry.getKey(),
                    entry.getValue() / (accounts.size() > 0 ? accounts.size() : 1), // Average
                    colorMap.get(entry.getKey())
            ));
        }
        
        return result;
    }
    
    public List<PostDTO> getTopPosts(String username, String platform, int limit) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<SocialAccount> accounts;
        if ("all".equals(platform)) {
            accounts = socialAccountRepository.findByUser(user);
        } else {
            accounts = socialAccountRepository.findByUserAndPlatform(user, platform);
        }
        
        List<Post> posts;
        if ("all".equals(platform)) {
            posts = postRepository.findTopPerformingPosts(accounts, PageRequest.of(0, limit));
        } else {
            posts = postRepository.findTopPerformingPostsByPlatform(accounts, platform, PageRequest.of(0, limit));
        }
        
        return posts.stream()
                .map(this::mapToPostDTO)
                .collect(Collectors.toList());
    }
    
    private List<StatDTO> generateStats(List<SocialAccount> accounts, String platform) {
        List<StatDTO> stats = new ArrayList<>();
        
        // Calculate total followers
        int totalFollowers = accounts.stream()
                .mapToInt(SocialAccount::getFollowers)
                .sum();
        
        // Calculate average engagement rate
        double avgEngagement = accounts.stream()
                .mapToDouble(SocialAccount::getEngagementRate)
                .average()
                .orElse(0.0);
        
        // Mock data for other stats
        stats.add(new StatDTO("Total Followers", formatNumber(totalFollowers), 12.5, "blue", "users"));
        stats.add(new StatDTO("Engagement Rate", String.format("%.1f%%", avgEngagement), 8.2, "green", "message"));
        stats.add(new StatDTO("Total Impressions", formatNumber(totalFollowers * 10), 18.7, "purple", "heart"));
        stats.add(new StatDTO("Conversion Rate", "2.1%", -3.8, "yellow", "share"));
        
        return stats;
    }
    
    private List<PlatformComparisonDTO> generatePlatformComparison(List<SocialAccount> accounts) {
        Map<String, PlatformComparisonDTO> comparisonMap = new HashMap<>();
        
        for (SocialAccount account : accounts) {
            String platform = account.getPlatform();
            String platformName = capitalize(platform);
            
            PlatformComparisonDTO dto = comparisonMap.getOrDefault(platform, 
                    new PlatformComparisonDTO(platformName, 0, 0.0, 0));
            
            dto.setFollowers(dto.getFollowers() + account.getFollowers());
            dto.setEngagement(account.getEngagementRate());
            dto.setImpressions(account.getFollowers() * 10); // Mock data
            
            comparisonMap.put(platform, dto);
        }
        
        return new ArrayList<>(comparisonMap.values());
    }
    
    private PostDTO mapToPostDTO(Post post) {
        return new PostDTO(
                post.getId(),
                post.getPlatform(),
                post.getContent(),
                post.getPostDate(),
                post.getImpressions(),
                post.getLikes(),
                post.getEngagement()
        );
    }
    
    private String formatNumber(int num) {
        if (num >= 1000000) {
            return String.format("%.1fM", num / 1000000.0);
        }
        if (num >= 1000) {
            return String.format("%.1fK", num / 1000.0);
        }
        return String.valueOf(num);
    }
    
    private String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}