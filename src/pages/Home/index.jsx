import {lazy,Suspense} from 'react';
// Import components
const Canvas = lazy(()=>import('../../components/Canvas'))
import PageLoader from '../../components/PageLoader';

function Home() {
  
  return(
      <Suspense fallback={<PageLoader />}>
        <Canvas />
      </Suspense>    
  )
}

export default Home