const aiWebSearcher = require('./aiWebSearcher');
const improvedAnalyzer = require('./improvedAIAnalyzer');

class AICourseAnalyzer {
  constructor() {
    this.trendKeywords = {
      'AI/ML': ['artificial intelligence', 'machine learning', 'deep learning', 'neural networks', 'LLM', 'GPT', 'computer vision', 'NLP'],
      'Blockchain': ['blockchain', 'cryptocurrency', 'web3', 'smart contracts', 'DeFi', 'NFT', 'ethereum', 'bitcoin'],
      'Data Science': ['data science', 'data analysis', 'big data', 'analytics', 'python', 'R programming', 'statistics'],
      'Web Development': ['web development', 'javascript', 'react', 'node.js', 'frontend', 'backend', 'full stack'],
      'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'cloud computing', 'kubernetes', 'docker', 'serverless'],
      'Cybersecurity': ['cybersecurity', 'ethical hacking', 'penetration testing', 'security', 'CISSP', 'CEH'],
      'DevOps': ['DevOps', 'CI/CD', 'jenkins', 'terraform', 'ansible', 'monitoring', 'automation'],
      'Mobile Development': ['mobile development', 'iOS', 'android', 'react native', 'flutter', 'swift', 'kotlin'],
      'UI/UX Design': ['UI design', 'UX design', 'figma', 'adobe', 'user experience', 'user interface'],
      'Digital Marketing': ['digital marketing', 'SEO', 'social media', 'content marketing', 'PPC', 'analytics']
    };
  }

  async analyzeCourseRelevance(course) {
    return improvedAnalyzer.analyzeCourseRelevance(course);
  }

  async analyzeJobMarketTrends(category) {
    return improvedAnalyzer.analyzeJobMarketTrends(category);
  }

  async getEmergingSkills() {
    return improvedAnalyzer.getEmergingSkills();
  }
}

module.exports = new AICourseAnalyzer();