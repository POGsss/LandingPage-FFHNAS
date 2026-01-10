lucide.createIcons();

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navBottomRow = document.querySelector('.nav-bottom-row');

if (hamburger && navBottomRow) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navBottomRow.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navBottomRow.classList.remove('active');
        });
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 160;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Sticky header on scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// ONLINE HEALTH CHECK (CELSIUS CHECKER)
// ============================================
function checkTemperature() {
    const temperatureInput = document.getElementById('temperature');
    const resultBox = document.getElementById('healthResult');
    
    if (!temperatureInput || !resultBox) return;
    
    const temperature = parseFloat(temperatureInput.value);
    
    // Clear previous result
    resultBox.innerHTML = '';
    resultBox.style.color = '';
    resultBox.style.backgroundColor = '';
    
    // Validate input
    if (isNaN(temperature) || temperature <= 0) {
        resultBox.innerHTML = 'Please enter a valid temperature.';
        resultBox.style.color = '#dc3545';
        return;
    }
    
    // Check temperature and display result
    if (temperature >= 37) {
        resultBox.innerHTML = `
            <div>
                <strong>Health: Sick</strong><br>
                <span style="color: #dc3545;">Abnormal</span>
            </div>
        `;
    } else {
        resultBox.innerHTML = `
            <div>
                <strong>Health: Not Sick</strong><br>
                <span style="color: #28a745;">Normal</span>
            </div>
        `;
    }

    
    resultBox.style.backgroundColor = '#f5f5f5';
}

// Allow Enter key to trigger check
// ============================================
// BMI CALCULATOR
// ============================================
function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultBox = document.getElementById('bmiResult');
    
    if (!heightInput || !weightInput || !resultBox) return;
    
    const height = parseFloat(heightInput.value) / 100; // Convert cm to meters
    const weight = parseFloat(weightInput.value);
    
    // Clear previous result
    resultBox.innerHTML = '';
    resultBox.style.color = '';
    resultBox.style.backgroundColor = '';
    
    // Validate inputs
    if (isNaN(height) || height <= 0) {
        resultBox.innerHTML = 'Please enter a valid height.';
        resultBox.style.color = '#dc3545';
        return;
    }
    
    if (isNaN(weight) || weight <= 0) {
        resultBox.innerHTML = 'Please enter a valid weight.';
        resultBox.style.color = '#dc3545';
        return;
    }
    
    // Calculate BMI: weight (kg) / height (m)²
    const bmi = weight / (height * height);
    const roundedBMI = bmi.toFixed(1);
    
    // Determine classification
    let classification = '';
    let color = '';
    
    if (bmi < 18.5) {
        classification = 'Underweight';
        color = '#ffc107';
    } else if (bmi >= 18.5 && bmi < 25) {
        classification = 'Normal';
        color = '#28a745';
    } else if (bmi >= 25 && bmi < 30) {
        classification = 'Overweight';
        color = '#fd7e14';
    } else {
        classification = 'Obese';
        color = '#dc3545';
    }
    
    // Display result
    resultBox.innerHTML = `
        <div>
            <strong>BMI Result: ${roundedBMI}</strong><br>
            <span style="color: ${color};">${classification}</span>
        </div>
    `;
    resultBox.style.backgroundColor = '#f5f5f5';
}

// ============================================
// AVERAGE GRADE CALCULATOR
// ============================================
let subjectCount = 0;

function addSubject() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    
    subjectCount++;
    const subjectItem = document.createElement('div');
    subjectItem.className = 'subject-item';
    subjectItem.id = `subject-${subjectCount}`;
    
    subjectItem.innerHTML = `
        <input 
            type="text" 
            placeholder="Subject Name" 
            class="subject-name" 
            id="subject-name-${subjectCount}"
        >
        <input 
            type="number" 
            placeholder="Grade" 
            class="subject-grade" 
            id="subject-grade-${subjectCount}"
            min="0" 
            max="100" 
            step="0.01"
        >
        <button 
            type="button" 
            class="btn-remove" 
            onclick="removeSubject(${subjectCount})"
        >
            &minus;
        </button>
    `;
    
    container.appendChild(subjectItem);
}

function removeSubject(id) {
    const subjectItem = document.getElementById(`subject-${id}`);
    if (subjectItem) {
        subjectItem.remove();
    }
}

function calculateAverage() {
    const container = document.getElementById('subjectsContainer');
    const resultBox = document.getElementById('gradeResult');
    
    if (!container || !resultBox) return;
    
    const subjectItems = container.querySelectorAll('.subject-item');
    
    // Clear previous result
    resultBox.innerHTML = '';
    resultBox.style.color = '';
    resultBox.style.backgroundColor = '';
    
    // Check if there are any subjects
    if (subjectItems.length === 0) {
        resultBox.innerHTML = 'Please add at least one subject.';
        resultBox.style.color = '#dc3545';
        return;
    }
    
    let totalGrade = 0;
    let validGrades = 0;
    const grades = [];
    
    // Collect all valid grades
    subjectItems.forEach(item => {
        const gradeInput = item.querySelector('.subject-grade');
        const subjectNameInput = item.querySelector('.subject-name');
        
        if (gradeInput && gradeInput.value) {
            const grade = parseFloat(gradeInput.value);
            const subjectName = subjectNameInput ? subjectNameInput.value || 'Subject' : 'Subject';
            
            if (!isNaN(grade) && grade >= 0 && grade <= 100) {
                totalGrade += grade;
                validGrades++;
                grades.push({ name: subjectName, grade: grade });
            }
        }
    });
    
    // Check if there are valid grades
    if (validGrades === 0) {
        resultBox.innerHTML = 'Please enter valid grades (0-100).';
        resultBox.style.color = '#dc3545';
        return;
    }
    
    // Calculate average
    const average = totalGrade / validGrades;
    const roundedAverage = average.toFixed(2);
    
    // Determine remarks
    let remarks = '';
    let color = '';
    
    if (average < 85) {
        remarks = 'Keep it up';
        color = '#ffc107';
    } else if (average >= 85 && average < 90) {
        remarks = 'With Honors';
        color = '#17a2b8';
    } else if (average >= 90 && average < 95) {
        remarks = 'With High Honors';
        color = '#28a745';
    } else {
        remarks = 'With Highest Honors';
        color = '#6f42c1';
    }
    
    // Display result
    resultBox.innerHTML = `
        <div>
            <strong>Average Grade: ${roundedAverage}</strong><br>
            <span style="color: ${color}; font-size: 1.2rem;">${remarks}</span>
        </div>
    `;
    resultBox.style.backgroundColor = '#f5f5f5';
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNav();
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 140;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.announcement-card, .service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initialize facilities gallery
    initFacilitiesGallery();
});

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================
function toggleAccordion(index) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const clickedItem = accordionItems[index];
    
    // Check if the clicked item is already active
    const isActive = clickedItem.classList.contains('active');
    
    // Close all accordion items
    accordionItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
        clickedItem.classList.add('active');
    }
}

// ============================================
// ACADEMIC PROGRAMS MARQUEE & MODAL
// ============================================

// Program data
const programData = [
    {
        acronym: "STEM",
        fullName: "Science, Technology, Engineering, and Mathematics",
        description: "This strand is designed for students who are interested in science, math, and technology. It prepares students for careers such as engineers, doctors, scientists, programmers, and architects."
    },
    {
        acronym: "ICT",
        fullName: "Information and Communications Technology",
        description: "Develops skills in computer systems, programming, animation, web design, and technical support. This strand prepares students for careers in IT, software development, digital media, and technology."
    },
    {
        acronym: "ABM",
        fullName: "Accountancy, Business, and Management",
        description: "Focuses on business concepts, finance, accounting, and entrepreneurship. This strand is ideal for future entrepreneurs, accountants, managers, and business leaders."
    },
    {
        acronym: "HUMSS",
        fullName: "Humanities and Social Sciences",
        description: "For students who are passionate about people, culture, society, and communication. This strand prepares students for careers in teaching, law, psychology, journalism, social work, and public service."
    },
    {
        acronym: "TVL",
        fullName: "Technical-Vocational-Livelihood",
        description: "The TVL track equips students with practical skills for employment and entrepreneurship. This strand prepares students for careers in various industries such as automotive, welding, electrical, and more."
    },
    {
        acronym: "IA",
        fullName: "Industrial Arts",
        description: "Develops technical skills in welding, electrical installation, carpentry, and automotive servicing. This strand prepares students for careers in automotive, welding, electrical, and carpentry."
    },
    {
        acronym: "AFA",
        fullName: "Agri-Fishery Arts",
        description: "Teaches skills in farming, animal production, fisheries, and agricultural technology. This strand prepares students for careers in agriculture, aquaculture, and related fields."
    },
    {
        acronym: "HE",
        fullName: "Home Economics",
        description: "Develops skills in cooking, baking, housekeeping, caregiving, and entrepreneurship related to household services. This strand prepares students for careers in culinary arts, hospitality, nursing, and entrepreneurship."
    },
    {
        acronym: "A&D",
        fullName: "Arts and Design Track",
        description: "This track is for creative students who want to express ideas through art. It develops skills in visual arts, music, theater, fashion design, multimedia arts, and other creative fields."
    },
    {
        acronym: "SPORTS",
        fullName: "Sports Track",
        description: "The Sports Track focuses on physical education, fitness, coaching, and sports science. It prepares students for careers as athletes, coaches, trainers, physical education teachers, and sports professionals."
    },
    {
        acronym: "ALS",
        fullName: "Alternative Learning System",
        description: "A flexible learning program for out-of-school youth and adults. It provides opportunities to complete basic education and develop life skills through non-traditional learning methods."
    }
];

function openProgramModal(index) {
    const modal = document.getElementById('programModal');
    const modalBody = document.getElementById('programModalBody');
    
    if (!modal || !modalBody) return;

    const program = programData[index];
    
    if (!program) return;
    
    const content = `
        <h3>${program.acronym}</h3>
        <p class="program-full-name">${program.fullName}</p>
        <p class="program-description">${program.description}</p>
    `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProgramModal() {
    const modal = document.getElementById('programModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const programModal = document.getElementById('programModal');
    if (programModal && e.target === programModal) {
        closeProgramModal();
    }
});

// Close modal with Escape key (update existing handler)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFacilityModal();
        closeServiceModal();
        closeProgramModal();
    }
});

// ============================================
// FACILITIES GALLERY FUNCTIONALITY
// ============================================

// Facility details data
const facilityDetails = [
    {
        title: "Computer Laboratory",
        description: "Our state-of-the-art computer laboratory is equipped with modern computers and software to support students' learning in technology and digital literacy. The lab provides hands-on experience with various applications and programming tools essential for academic excellence.",
        features: ["Modern computer workstations", "High-speed internet connection", "Latest software applications", "Comfortable learning environment"]
    },
    {
        title: "Science Laboratory",
        description: "The science laboratory provides a comprehensive learning environment for students to conduct experiments and explore scientific concepts. Equipped with modern equipment and safety measures, it supports hands-on learning in biology, chemistry, and physics.",
        features: ["Modern laboratory equipment", "Safety facilities", "Interactive learning tools", "Well-ventilated space"]
    },
    {
        title: "Industrial Arts",
        description: "Our Industrial Arts facility offers comprehensive technical-vocational training in various specializations. Students gain practical skills and hands-on experience in different trades.",
        subFacilities: ["Automotive Shop", "SMAW Shop", "EIM Shop", "EPAS Shop"],
        features: ["Professional-grade equipment", "Safety-certified workshops", "Expert instructors", "Industry-standard tools"]
    },
    {
        title: "Home Economics Laboratory",
        description: "The Home Economics Laboratory provides students with practical skills in cooking, baking, sewing, and household management. It's designed to develop life skills and creativity in home management.",
        features: ["Fully equipped kitchen", "Sewing machines", "Modern appliances", "Spacious work areas"]
    },
    {
        title: "Canteen Area",
        description: "Our spacious canteen area provides a comfortable dining space for students and staff. It offers nutritious meals and snacks, promoting healthy eating habits among the school community.",
        features: ["Spacious dining area", "Nutritious meal options", "Clean and hygienic", "Comfortable seating"]
    },
    {
        title: "Grade 11/12 Faculty Room",
        description: "A dedicated space for Senior High School faculty members to collaborate, plan lessons, and provide academic support to students. This room facilitates effective communication and coordination among teachers.",
        features: ["Workstations for teachers", "Meeting area", "Resource materials", "Comfortable workspace"]
    },
    {
        title: "Registrar Office",
        description: "The Registrar Office handles all student records, enrollment, and academic documentation. It provides efficient service for students' academic needs and maintains accurate records.",
        features: ["Student record management", "Enrollment services", "Document processing", "Professional staff"]
    },
    {
        title: "SHS Clinic",
        description: "The Senior High School Clinic provides health services and first aid to students and staff. It ensures the well-being of the school community with proper medical care and health monitoring.",
        features: ["First aid facilities", "Health monitoring", "Medical supplies", "Trained medical personnel"]
    },
    {
        title: "Admin Office",
        description: "The Administration Office serves as the central hub for school operations, handling administrative tasks, communications, and coordination of various school activities.",
        features: ["Administrative services", "School management", "Communication center", "Professional staff"]
    },
    {
        title: "Guidance Office",
        description: "The Guidance Office provides counseling services, career guidance, and support for students' personal and academic development. It helps students navigate their educational journey and plan for their future.",
        features: ["Career counseling", "Academic guidance", "Personal counseling", "Support services"]
    }
];

let currentFacilityIndex = 0;
let facilitiesTrack = null;
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

function initFacilitiesGallery() {
    facilitiesTrack = document.getElementById('facilitiesTrack');
    if (!facilitiesTrack) return;

    // Create gallery dots
    createGalleryDots();

    // Add touch event listeners for swipe
    facilitiesTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
    facilitiesTrack.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Add mouse event listeners for drag
    facilitiesTrack.addEventListener('mousedown', handleMouseDown);
    facilitiesTrack.addEventListener('mouseleave', handleMouseUp);
    facilitiesTrack.addEventListener('mouseup', handleMouseUp);
    facilitiesTrack.addEventListener('mousemove', handleMouseMove);

    // Update gallery on load
    updateGallery();
}

function createGalleryDots() {
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    facilityDetails.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function updateGallery() {
    if (!facilitiesTrack) return;
    
    const translateX = -currentFacilityIndex * 100;
    facilitiesTrack.style.transform = `translateX(${translateX}%)`;

    // Update dots
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentFacilityIndex);
    });
}

function slideFacilities(direction) {
    const totalFacilities = facilityDetails.length;
    currentFacilityIndex += direction;

    if (currentFacilityIndex < 0) {
        currentFacilityIndex = totalFacilities - 1;
    } else if (currentFacilityIndex >= totalFacilities) {
        currentFacilityIndex = 0;
    }

    updateGallery();
}

function goToSlide(index) {
    currentFacilityIndex = index;
    updateGallery();
}

// Touch swipe handlers
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            slideFacilities(1);
        } else {
            slideFacilities(-1);
        }
    }
}

// Mouse drag handlers
function handleMouseDown(e) {
    isDragging = true;
    startX = e.pageX - facilitiesTrack.offsetLeft;
    scrollLeft = facilitiesTrack.scrollLeft;
    facilitiesTrack.style.cursor = 'grabbing';
}

function handleMouseUp() {
    isDragging = false;
    if (facilitiesTrack) {
        facilitiesTrack.style.cursor = 'grab';
    }
}

function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - facilitiesTrack.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 50) {
        if (walk > 0) {
            slideFacilities(-1);
        } else {
            slideFacilities(1);
        }
        handleMouseUp();
    }
}

// Modal functionality
function openFacilityModal(index) {
    const modal = document.getElementById('facilityModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;

    const facility = facilityDetails[index];
    
    let content = `
        <h3>${facility.title}</h3>
        <p>${facility.description}</p>
    `;

    if (facility.subFacilities) {
        content += `
            <h4 style="color: var(--primary-green); margin-top: 1.5rem; margin-bottom: 0.5rem;">Sub-facilities:</h4>
            <ul>
        `;
        facility.subFacilities.forEach(sub => {
            content += `<li>${sub}</li>`;
        });
        content += `</ul>`;
    }

    if (facility.features) {
        content += `
            <h4 style="color: var(--primary-green); margin-top: 1.5rem; margin-bottom: 0.5rem;">Features:</h4>
            <ul>
        `;
        facility.features.forEach(feature => {
            content += `<li>${feature}</li>`;
        });
        content += `</ul>`;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFacilityModal() {
    const modal = document.getElementById('facilityModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// SERVICE MODAL (CALCULATORS)
// ============================================
function openServiceModal(type) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('serviceModalBody');
    const template = document.getElementById(`service-${type}-template`);

    if (!modal || !modalBody || !template) return;

    modalBody.innerHTML = template.innerHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    attachServiceInputListeners();
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function attachServiceInputListeners() {
    const temperatureInput = document.getElementById('temperature');
    if (temperatureInput) {
        temperatureInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkTemperature();
            }
        });
    }

    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    if (heightInput) {
        heightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    }

    if (weightInput) {
        weightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const facilityModal = document.getElementById('facilityModal');
    const serviceModal = document.getElementById('serviceModal');

    if (facilityModal && e.target === facilityModal) {
        closeFacilityModal();
    }

    if (serviceModal && e.target === serviceModal) {
        closeServiceModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFacilityModal();
        closeServiceModal();
    }
});
