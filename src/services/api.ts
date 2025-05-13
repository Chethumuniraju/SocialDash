// Mock API service for the social media dashboard
// In a real application, this would make actual API calls to your backend

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get user profile
export const getUserProfile = async () => {
  await delay(800);
  return {
    id: 1,
    username: 'testuser',
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=testuser'
  };
};

// Fetch dashboard overview data
export const fetchDashboardData = async (platform = 'all', timeRange = '7d') => {
  await delay(1000);
  
  // Adjust data based on selected platform and time range
  const multiplier = timeRange === '30d' ? 4 : timeRange === '90d' ? 12 : 1;
  const platformFilter = platform !== 'all' ? platform : null;
  
  const stats = [
    {
      name: 'Total Followers',
      value: platformFilter ? formatNumber(getFollowersByPlatform(platformFilter) * multiplier) : formatNumber(125600 * multiplier),
      change: platformFilter ? getChangeByPlatform(platformFilter) : 12.5,
      color: 'blue',
      icon: 'users'
    },
    {
      name: 'Engagement Rate',
      value: platformFilter ? `${getEngagementByPlatform(platformFilter)}%` : '4.3%',
      change: platformFilter ? getChangeByPlatform(platformFilter) / 2 : 8.2,
      color: 'green',
      icon: 'message'
    },
    {
      name: 'Total Impressions',
      value: platformFilter ? formatNumber(getImpressionsByPlatform(platformFilter) * multiplier) : formatNumber(1250000 * multiplier),
      change: platformFilter ? getChangeByPlatform(platformFilter) * 1.5 : 18.7,
      color: 'purple',
      icon: 'heart'
    },
    {
      name: 'Conversion Rate',
      value: platformFilter ? `${(getEngagementByPlatform(platformFilter) / 2).toFixed(1)}%` : '2.1%',
      change: platformFilter ? getChangeByPlatform(platformFilter) / 3 : -3.8,
      color: 'yellow',
      icon: 'share'
    }
  ];

  const platformComparison = [
    {
      name: 'Twitter',
      followers: 42500,
      engagement: 4.8,
      impressions: 380000
    },
    {
      name: 'Facebook',
      followers: 38700,
      engagement: 3.2,
      impressions: 420000
    },
    {
      name: 'Instagram',
      followers: 29800,
      engagement: 5.7,
      impressions: 310000
    },
    {
      name: 'LinkedIn',
      followers: 14600,
      engagement: 2.9,
      impressions: 140000
    }
  ];

  return {
    stats,
    platformComparison: platformFilter 
      ? platformComparison.filter(p => p.name.toLowerCase() === platformFilter) 
      : platformComparison
  };
};

// Fetch engagement data for charts
export const fetchEngagementData = async (platform = 'all', timeRange = '7d') => {
  await delay(800);
  
  const days = timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 7;
  const data = [];
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    const dataPoint: any = {
      date: currentDate.toISOString().split('T')[0]
    };
    
    if (platform === 'all' || platform === 'twitter') {
      dataPoint.twitter = Math.floor(3000 + Math.random() * 2000);
    }
    
    if (platform === 'all' || platform === 'facebook') {
      dataPoint.facebook = Math.floor(2500 + Math.random() * 1500);
    }
    
    if (platform === 'all' || platform === 'instagram') {
      dataPoint.instagram = Math.floor(3500 + Math.random() * 2500);
    }
    
    if (platform === 'all' || platform === 'linkedin') {
      dataPoint.linkedin = Math.floor(1500 + Math.random() * 1000);
    }
    
    data.push(dataPoint);
  }
  
  return data;
};

// Fetch audience demographics data
export const fetchAudienceData = async (platform = 'all') => {
  await delay(600);
  
  // Base demographics data
  const baseData = [
    { name: '18-24', value: 25, color: '#4361EE' },
    { name: '25-34', value: 35, color: '#3A0CA3' },
    { name: '35-44', value: 20, color: '#4CC9F0' },
    { name: '45-54', value: 12, color: '#F72585' },
    { name: '55+', value: 8, color: '#7209B7' }
  ];
  
  // Adjust data based on platform
  if (platform === 'twitter') {
    return [
      { name: '18-24', value: 32, color: '#4361EE' },
      { name: '25-34', value: 38, color: '#3A0CA3' },
      { name: '35-44', value: 18, color: '#4CC9F0' },
      { name: '45-54', value: 8, color: '#F72585' },
      { name: '55+', value: 4, color: '#7209B7' }
    ];
  } else if (platform === 'facebook') {
    return [
      { name: '18-24', value: 15, color: '#4361EE' },
      { name: '25-34', value: 28, color: '#3A0CA3' },
      { name: '35-44', value: 25, color: '#4CC9F0' },
      { name: '45-54', value: 18, color: '#F72585' },
      { name: '55+', value: 14, color: '#7209B7' }
    ];
  } else if (platform === 'instagram') {
    return [
      { name: '18-24', value: 38, color: '#4361EE' },
      { name: '25-34', value: 42, color: '#3A0CA3' },
      { name: '35-44', value: 15, color: '#4CC9F0' },
      { name: '45-54', value: 4, color: '#F72585' },
      { name: '55+', value: 1, color: '#7209B7' }
    ];
  } else if (platform === 'linkedin') {
    return [
      { name: '18-24', value: 12, color: '#4361EE' },
      { name: '25-34', value: 35, color: '#3A0CA3' },
      { name: '35-44', value: 32, color: '#4CC9F0' },
      { name: '45-54', value: 15, color: '#F72585' },
      { name: '55+', value: 6, color: '#7209B7' }
    ];
  }
  
  return baseData;
};

// Fetch top performing posts
export const fetchPostsData = async (platform = 'all', limit = 5) => {
  await delay(700);
  
  const allPosts = [
    {
      id: 1,
      platform: 'twitter',
      content: 'Excited to announce our new product launch! #innovation #tech',
      date: '2025-03-15T10:30:00Z',
      impressions: 28500,
      likes: 1250,
      engagement: 4.8
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Check out our behind-the-scenes look at how our team works remotely!',
      date: '2025-03-12T14:15:00Z',
      impressions: 32400,
      likes: 980,
      engagement: 3.5
    },
    {
      id: 3,
      platform: 'instagram',
      content: 'New office space reveal! #officegoals #worklife',
      date: '2025-03-10T09:45:00Z',
      impressions: 41200,
      likes: 2340,
      engagement: 6.2
    },
    {
      id: 4,
      platform: 'linkedin',
      content: 'We re hiring! Join our growing team of professionals.',
      date: '2025-03-08T11:20:00Z',
      impressions: 18700,
      likes: 520,
      engagement: 3.1
    },
    {
      id: 5,
      platform: 'twitter',
      content: 'What features would you like to see in our next update? Let us know!',
      date: '2025-03-05T16:40:00Z',
      impressions: 22800,
      likes: 980,
      engagement: 4.3
    },
    {
      id: 6,
      platform: 'facebook',
      content: 'Customer spotlight: See how Company X achieved 200% growth using our platform.',
      date: '2025-03-03T13:10:00Z',
      impressions: 29600,
      likes: 850,
      engagement: 3.2
    },
    {
      id: 7,
      platform: 'instagram',
      content: 'Meet our amazing team! #teamwork #companyculture',
      date: '2025-03-01T10:00:00Z',
      impressions: 38500,
      likes: 2100,
      engagement: 5.8
    },
    {
      id: 8,
      platform: 'linkedin',
      content: 'Our CEO s thoughts on the future of remote work and digital transformation.',
      date: '2025-02-28T15:30:00Z',
      impressions: 15900,
      likes: 480,
      engagement: 3.4
    }
  ];
  
  // Filter by platform if specified
  const filteredPosts = platform !== 'all' 
    ? allPosts.filter(post => post.platform === platform)
    : allPosts;
  
  // Sort by engagement and limit results
  return filteredPosts
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, limit);
};

// Helper functions
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function getFollowersByPlatform(platform: string): number {
  switch (platform) {
    case 'twitter': return 42500;
    case 'facebook': return 38700;
    case 'instagram': return 29800;
    case 'linkedin': return 14600;
    default: return 0;
  }
}

function getEngagementByPlatform(platform: string): number {
  switch (platform) {
    case 'twitter': return 4.8;
    case 'facebook': return 3.2;
    case 'instagram': return 5.7;
    case 'linkedin': return 2.9;
    default: return 0;
  }
}

function getImpressionsByPlatform(platform: string): number {
  switch (platform) {
    case 'twitter': return 380000;
    case 'facebook': return 420000;
    case 'instagram': return 310000;
    case 'linkedin': return 140000;
    default: return 0;
  }
}

function getChangeByPlatform(platform: string): number {
  switch (platform) {
    case 'twitter': return 14.2;
    case 'facebook': return 8.7;
    case 'instagram': return 21.3;
    case 'linkedin': return 6.5;
    default: return 0;
  }
}