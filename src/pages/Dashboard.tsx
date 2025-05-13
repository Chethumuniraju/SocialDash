import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  ArrowUp, ArrowDown, Users, MessageSquare, Heart, Share2,
  Twitter, Facebook, Instagram, Linkedin, TrendingUp, Eye
} from 'lucide-react';
import { fetchDashboardData, fetchEngagementData, fetchAudienceData, fetchPostsData } from '../services/api';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [engagementData, setEngagementData] = useState<any[]>([]);
  const [audienceData, setAudienceData] = useState<any[]>([]);
  const [postsData, setPostsData] = useState<any[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('7d');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [dashboard, engagement, audience, posts] = await Promise.all([
          fetchDashboardData(selectedPlatform, timeRange),
          fetchEngagementData(selectedPlatform, timeRange),
          fetchAudienceData(selectedPlatform),
          fetchPostsData(selectedPlatform, 5)
        ]);
        
        setDashboardData(dashboard);
        setEngagementData(engagement);
        setAudienceData(audience);
        setPostsData(posts);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedPlatform, timeRange]);

  const PLATFORM_COLORS = {
    twitter: '#1DA1F2',
    facebook: '#4267B2',
    instagram: '#E1306C',
    linkedin: '#0077B5'
  };

  const PLATFORM_ICONS = {
    twitter: <Twitter className="h-5 w-5 text-[#1DA1F2]" />,
    facebook: <Facebook className="h-5 w-5 text-[#4267B2]" />,
    instagram: <Instagram className="h-5 w-5 text-[#E1306C]" />,
    linkedin: <Linkedin className="h-5 w-5 text-[#0077B5]" />
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            An overview of your social media performance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex space-x-3">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardData?.stats.map((stat: any) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    {stat.icon === 'users' && <Users className={`h-6 w-6 text-${stat.color}-600`} />}
                    {stat.icon === 'message' && <MessageSquare className={`h-6 w-6 text-${stat.color}-600`} />}
                    {stat.icon === 'heart' && <Heart className={`h-6 w-6 text-${stat.color}-600`} />}
                    {stat.icon === 'share' && <Share2 className={`h-6 w-6 text-${stat.color}-600`} />}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change >= 0 ? (
                        <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                      )}
                      <span className="ml-1">{Math.abs(stat.change)}%</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Chart */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Engagement Overview
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your engagement metrics across platforms
          </p>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={engagementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                  stroke="#6B7280"
                />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderColor: '#E5E7EB',
                    borderRadius: '0.375rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: any) => [value, '']}
                  labelFormatter={(date) => format(new Date(date), 'MMMM dd, yyyy')}
                />
                <Legend />
                {selectedPlatform === 'all' || selectedPlatform === 'twitter' ? (
                  <Line 
                    type="monotone" 
                    dataKey="twitter" 
                    name="Twitter" 
                    stroke={PLATFORM_COLORS.twitter} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                ) : null}
                {selectedPlatform === 'all' || selectedPlatform === 'facebook' ? (
                  <Line 
                    type="monotone" 
                    dataKey="facebook" 
                    name="Facebook" 
                    stroke={PLATFORM_COLORS.facebook} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                ) : null}
                {selectedPlatform === 'all' || selectedPlatform === 'instagram' ? (
                  <Line 
                    type="monotone" 
                    dataKey="instagram" 
                    name="Instagram" 
                    stroke={PLATFORM_COLORS.instagram} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                ) : null}
                {selectedPlatform === 'all' || selectedPlatform === 'linkedin' ? (
                  <Line 
                    type="monotone" 
                    dataKey="linkedin" 
                    name="LinkedIn" 
                    stroke={PLATFORM_COLORS.linkedin} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Audience Demographics and Top Posts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Audience Demographics */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Audience Demographics
            </h3>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Top Performing Posts
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {postsData.map((post) => (
              <div key={post.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {PLATFORM_ICONS[post.platform as keyof typeof PLATFORM_ICONS]}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.content}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                      <span className="mx-1">•</span>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.impressions.toLocaleString()}
                      </div>
                      <span className="mx-1">•</span>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="flex items-center text-sm font-medium text-blue-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {post.engagement}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Comparison */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Platform Comparison
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Compare performance across different platforms
          </p>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData?.platformComparison}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderColor: '#E5E7EB',
                    borderRadius: '0.375rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="followers" name="Followers" fill="#4361EE" />
                <Bar dataKey="engagement" name="Engagement" fill="#4CC9F0" />
                <Bar dataKey="impressions" name="Impressions" fill="#F72585" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;