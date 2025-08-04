// Function to fetch carousel data from the JSON file
export const getCarouselData = async () => {
  try {
    // Using a dynamic import for the JSON file to ensure proper bundling
    const carouselData = await import('../json/homePage.json');
    return carouselData.carousel;
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return {
      images: [],
      height: 600,
      autoPlay: true,
      interval: 5000,
      categoryLabels: ["LUXURY", "FASHION", "ACCESSORIES"],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null
    };
  }
};

// Function to fetch new arrival data from the JSON file
export const getNewArrivalData = async () => {
  try {
    // Using a dynamic import for the JSON file to ensure proper bundling
    const homeData = await import('../json/homePage.json');
    return homeData.newArrival;
  } catch (error) {
    console.error('Error fetching new arrival data:', error);
    return {
      toShow: true,
      title: "New Arrivals",
      tabs: [],
      products: {},
      status: 'idle',
      error: null
    };
  }
};

// Function to fetch brands data from the JSON file
export const getBrandsData = async () => {
  try {
    // Using a dynamic import for the JSON file to ensure proper bundling
    const homeData = await import('../json/homePage.json');
    return homeData.brands;
  } catch (error) {
    console.error('Error fetching brands data:', error);
    return {
      toShow: false,
      imageUrl: "",
      status: 'idle',
      error: null
    };
  }
};
