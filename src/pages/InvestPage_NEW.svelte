  
  function animateMarketProgression() {
    const years = Object.keys(marketData).map(Number);
    let currentIndex = 0;
    let targetValue = marketData[years[currentIndex]].total;
    let smoothCounterInterval;
    let yearProgressionInterval;
    
    function startSmoothCounter() {
      smoothCounterInterval = setInterval(() => {
        if (animationPaused) return;
        
        const difference = targetValue - animatedMarketValue;
        
        if (Math.abs(difference) > 0.01) {
          const increment = difference * 0.02;
          animatedMarketValue += Math.max(increment, 0.001);
        }
      }, 50);
    }
    
    function startYearProgression() {
      yearProgressionInterval = setInterval(() => {
        if (animationPaused) return;
        
        currentIndex = (currentIndex + 1) % years.length;
        
        if (currentIndex === 0) {
          animatedMarketValue = marketData[years[currentIndex]].total;
        }
        
        currentYear = years[currentIndex];
        currentMarketValue = marketData[currentYear].total;
        targetValue = currentMarketValue;
      }, 4000);
    }
    
    startSmoothCounter();
    startYearProgression();
    
    return () => {
      clearInterval(smoothCounterInterval);
      clearInterval(yearProgressionInterval);
    };
  }
  
  function resetAnimation() {
    currentYear = 2025;
    currentMarketValue = marketData[currentYear].total;
    animatedMarketValue = currentMarketValue;
    animationPaused = false;
  }
  
  function manualReset() {
    resetAnimation();
  }
  
  function openInvestorModal() {
    showModal = true;
  }
  
  function openReportDownload() {
    showReportDownload = true;
  }
  
  function scrollToOpportunities() {
    document.getElementById('investment-opportunities').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
  
  function toggleMarketChart() {
    showMarketChart = !showMarketChart;
    showCAGRChart = false;
    showTimelineChart = false;
  }
  
  function toggleCAGRChart() {
    showCAGRChart = !showCAGRChart;
    showMarketChart = false;
    showTimelineChart = false;
  }
  
  function toggleTimelineChart() {
    showTimelineChart = !showTimelineChart;
    showMarketChart = false;
    showCAGRChart = false;
  }
