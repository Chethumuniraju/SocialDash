package com.example.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.dto.AudienceDataDTO;
import com.example.socialmedia.dto.DashboardStatsDTO;
import com.example.socialmedia.dto.EngagementDataDTO;
import com.example.socialmedia.dto.PostDTO;
import com.example.socialmedia.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats(
            @RequestParam(defaultValue = "all") String platform,
            @RequestParam(defaultValue = "7d") String timeRange) {
        
        // For demo purposes, we'll use a hardcoded username
        // In a real app, this would come from the authenticated user
        DashboardStatsDTO stats = dashboardService.getDashboardStats("testuser", platform, timeRange);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/engagement")
    public ResponseEntity<List<EngagementDataDTO>> getEngagementData(
            @RequestParam(defaultValue = "all") String platform,
            @RequestParam(defaultValue = "7d") String timeRange) {
        
        List<EngagementDataDTO> data = dashboardService.getEngagementData("testuser", platform, timeRange);
        return ResponseEntity.ok(data);
    }
    
    @GetMapping("/audience")
    public ResponseEntity<List<AudienceDataDTO>> getAudienceData(
            @RequestParam(defaultValue = "all") String platform) {
        
        List<AudienceDataDTO> data = dashboardService.getAudienceData("testuser", platform);
        return ResponseEntity.ok(data);
    }
    
    @GetMapping("/posts")
    public ResponseEntity<List<PostDTO>> getTopPosts(
            @RequestParam(defaultValue = "all") String platform,
            @RequestParam(defaultValue = "5") int limit) {
        
        List<PostDTO> posts = dashboardService.getTopPosts("testuser", platform, limit);
        return ResponseEntity.ok(posts);
    }
}