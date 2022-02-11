import innerWheel from './spinning-wheel/inner-wheel.svg';
import outerWheel from './spinning-wheel/outer-wheel.svg';
import staticX from './spinning-wheel/static-x.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const ROTATION_SCROLL_RATIO = 0.3;

    const spinner = document.querySelector('.spw-spinner');
    const outerWheel = document.querySelector('.spw-outer-wheel');
    const innerWheel = document.querySelector('.spw-inner-wheel');
    let latestKnownScrollY = 0;
    let ticking = false;

    function updatePosition() {
      ticking = false;
      outerWheel.style.transform = 'rotate(' + latestKnownScrollY * ROTATION_SCROLL_RATIO + 'deg )';
      innerWheel.style.transform = 'rotate( -' + latestKnownScrollY * ROTATION_SCROLL_RATIO + 'deg )';
    }

    function requestTick() {
      if(!ticking) {
        requestAnimationFrame(updatePosition);
      }
      ticking = true;
    }

    function handleScroll() {
      latestKnownScrollY = window.pageYOffset;
      requestTick();
    }

    const observer = new IntersectionObserver(() => {
      const spinnerRect = spinner.getBoundingClientRect();
      if (spinnerRect.bottom < 0 || spinnerRect.top > window.innerHeight) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
      console.log('intersection!');
    });

    observer.observe(spinner);
  }, []);

  return (
    <div className="App">
      <div className='spw-spinner'>
        <img className='spw-static-x' src={staticX} alt=""/>
        <img className='spw-inner-wheel' src={innerWheel} alt=""/>
        <img className='spw-outer-wheel' src={outerWheel} alt="Endurance, resistance and metabolic"/>
      </div>
    </div>
  );
}

export default App;
