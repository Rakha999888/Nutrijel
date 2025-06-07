class HomeModel {
  constructor() {
    this.features = [
      {
        icon: '/assets/image/features-icon-1.png',
        title: 'Food',
        description: 'Complete information about food nutrition and diet recommendations according to your needs.',
        alt: 'Food Icon'
      },
      {
        icon: '/assets/image/features-icon-2.png',
        title: 'Track',
        description: 'Track your health progress with easy-to-use and informative tracking tools.',
        alt: 'Track Icon'
      },
      {
        icon: '/assets/image/features-icon-3.png',
        title: 'Education',
        description: 'Access a variety of articles, videos and courses on health and healthy lifestyle.',
        alt: 'Education Icon'
      }
    ];
  }

  async getFeatures() {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.features;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw new Error('Failed to load features. Please try again later.');
    }
  }
}

export default HomeModel;
