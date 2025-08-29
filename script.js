document.addEventListener('DOMContentLoaded',function(){
    // Smooth scroll animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Add animation class after scrolling
                setTimeout(() => {
                    targetSection.classList.add('visible');
                }, 300);
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    const coursesSection = document.getElementById('courses');

    function toggleScrollIndicator() {
        const rect = coursesSection.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }

    // Show scroll indicator initially
    toggleScrollIndicator();

    // Update on scroll
    window.addEventListener('scroll', toggleScrollIndicator);

    // Scroll indicator click handler
    scrollIndicator.addEventListener('click', () => {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
	// Slider functionality
	const slider = document.querySelector('.slider');
	const slides = document.querySelectorAll('.slide');
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');
	const dotsContainer = document.querySelector('.dots');
	
	let currentSlide = 0;
	const totalSlides = slides.length;

	// Create dots
	slides.forEach((_, index) => {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		if (index === 0) dot.classList.add('active');
		dot.addEventListener('click', () => goToSlide(index));
		dotsContainer.appendChild(dot);
	});

	const dots = document.querySelectorAll('.dot');

	function updateSlider() {
		slides.forEach(slide => slide.classList.remove('active'));
		dots.forEach(dot => dot.classList.remove('active'));
		
		slides[currentSlide].classList.add('active');
		dots[currentSlide].classList.add('active');
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
		updateSlider();
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
		updateSlider();
	}

	function goToSlide(index) {
		currentSlide = index;
		updateSlider();
	}

	// Event listeners
	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);

	// Auto slide
	let slideInterval = setInterval(nextSlide, 5000);

	// Pause on hover
	slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
	slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
	var navToggle=document.getElementById('nav-toggle');
	var navClose=document.getElementById('nav-close');
	var nav=document.getElementById('main-nav');
	if(navToggle){navToggle.addEventListener('click',function(){nav.classList.add('open')});}
	if(navClose){navClose.addEventListener('click',function(){nav.classList.remove('open')});}

	// Toggle submenu on small screens
	document.querySelectorAll('.nav .has-sub > a').forEach(function(anchor){
		anchor.addEventListener('click',function(e){
			if(getComputedStyle(nav).position==='fixed'){
				e.preventDefault();
				anchor.parentElement.classList.toggle('open');
			}
		});
	});

	// Placeholders
	var searchForm=document.querySelector('.search');
	if(searchForm){searchForm.addEventListener('submit',function(e){e.preventDefault();alert('تم البحث (مكان مخصص للاكشن).');});}
	var subscribe=document.getElementById('subscribe-form');
	if(subscribe){subscribe.addEventListener('submit',function(e){e.preventDefault();alert('تم الاشتراك بنجاح!');});}
	var btnCart=document.getElementById('btn-cart');
	if(btnCart){btnCart.addEventListener('click',function(){alert('سلة التسوق فارغة.');});}
	var btnNoti=document.getElementById('btn-notifications');
	if(btnNoti){btnNoti.addEventListener('click',function(){alert('لا توجد إشعارات حالياً.');});}
	
	// Initialize scroll animations
	initScrollAnimations();
});

// Scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
			}
		});
	}, observerOptions);
	
	// Observe elements for animation
	const animateElements = document.querySelectorAll('.animate-on-scroll');
	animateElements.forEach(el => {
		observer.observe(el);
	});
}
