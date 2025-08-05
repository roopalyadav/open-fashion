import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';
import Carousel from '../Carousel/Carousel';
import NewArrival from '../NewArrival/NewArrival';
import Brand from '../Brand';
import Collection from '../Collection';
import JustForYou from '../JustForYou/JustForYou';
import { 
  fetchCarouselData, 
  fetchNewArrivalData, 
  fetchBrandsData, 
  fetchCollectionData,
  fetchJustForYouData 
} from '../../redux/slices/homeSlice';

// A reusable section renderer that handles status and visibility checks
const SectionRenderer = ({ sectionName, sectionState, renderComponent }) => {
  // Handle loading state
  if (sectionState.status === 'loading') {
    return <div className={`${sectionName}-loading loading-indicator`}>Loading {sectionName}...</div>;
  }
  
  // Handle error state
  if (sectionState.status === 'failed') {
    return <div className={`${sectionName}-error error-message`}>
      Error loading {sectionName}: {sectionState.error}
    </div>;
  }
  
  // Only render if toShow is true and we have a successful status
  if (sectionState.toShow && sectionState.status === 'succeeded') {
    return renderComponent(sectionState);
  }
  
  // Don't render anything otherwise
  return null;
};

function Home() {
  const dispatch = useDispatch();
  const homeState = useSelector(state => state.home);
  
  useEffect(() => {
    // Fetch carousel data when component mounts
    if (homeState.carousel.status === 'idle') {
      dispatch(fetchCarouselData());
    }
    
    // Fetch new arrival data when component mounts
    if (homeState.newArrival.status === 'idle') {
      dispatch(fetchNewArrivalData());
    }
    
    // Fetch brands data when component mounts
    if (homeState.brands.status === 'idle') {
      dispatch(fetchBrandsData());
    }
    
    // Fetch collection data when component mounts
    if (homeState.collection.status === 'idle') {
      dispatch(fetchCollectionData());
    }
    
    // Fetch justForYou data when component mounts
    if (homeState.justForYou.status === 'idle') {
      dispatch(fetchJustForYouData());
    }
    
    // Future data fetching can be added here following the same pattern
  }, [
    dispatch, 
    homeState.carousel.status, 
    homeState.newArrival.status,
    homeState.brands.status,
    homeState.collection.status,
    homeState.justForYou.status
  ]);

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <SectionRenderer 
        sectionName="carousel"
        sectionState={homeState.carousel}
        renderComponent={(carouselState) => (
          <div className="home-section carousel-section">
            <Carousel 
              images={carouselState.images} 
              height={carouselState.height}
              autoPlay={carouselState.autoPlay}
              interval={carouselState.interval}
              categoryLabels={carouselState.categoryLabels}
            />
          </div>
        )}
      />
      
      {/* New Arrival Section */}
      <SectionRenderer 
        sectionName="newArrival"
        sectionState={homeState.newArrival}
        renderComponent={(newArrivalState) => (
          <div className="home-section new-arrival-section">
            <NewArrival 
              title={newArrivalState.title}
              tabs={newArrivalState.tabs}
              products={newArrivalState.products}
              activeTab={newArrivalState.activeTab}
            />
          </div>
        )}
      />
      
      {/* Brands Section */}
      <SectionRenderer 
        sectionName="brands"
        sectionState={homeState.brands}
        renderComponent={(brandsState) => (
          <div className="home-section brands-section">
            <Brand 
              imageUrl={brandsState.imageUrl}
            />
          </div>
        )}
      />
      
      {/* Collection Section */}
      <SectionRenderer 
        sectionName="collection"
        sectionState={homeState.collection}
        renderComponent={(collectionState) => (
          <div className="home-section collection-section">
            <Collection 
              imageUrl={collectionState.imageUrl}
            />
          </div>
        )}
      />
      
      {/* Just For You Section */}
      <SectionRenderer 
        sectionName="justForYou"
        sectionState={homeState.justForYou}
        renderComponent={(justForYouState) => (
          <div className="home-section just-for-you-section">
            <JustForYou 
              title={justForYouState.title}
              products={justForYouState.products}
            />
          </div>
        )}
      />
    </div>
  );
}

export default Home;
