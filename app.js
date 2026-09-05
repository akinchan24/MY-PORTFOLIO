const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// Create overlay element for mobile sidebar
const sidebarOverlay = document.createElement('div');
sidebarOverlay.className = 'sidebar-overlay';
document.body.appendChild(sidebarOverlay);

const videoList = [video1, video2, video3];

videoList.forEach(function (video) {
    const projectCard = video.closest('.project-card');
    const hoverSign = projectCard.querySelector('.hover-sign');

    video.addEventListener("mouseover", function () {
        video.play()
        if (hoverSign) hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function () {
        video.pause();
        if (hoverSign) hoverSign.classList.remove("active")
    })
})

// Enhanced Sidebar functionality //
function openSidebar() {
    sideBar.classList.add("open-sidebar");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeSidebar() {
    sideBar.classList.remove("open-sidebar");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = ''; // Restore scrolling
}

// Menu icon click event
menu.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    openSidebar();
});

// Close icon click event
if (closeIcon) {
    closeIcon.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeSidebar();
    });
} else {
    console.error('Close icon not found');
}

// Overlay click event
sidebarOverlay.addEventListener("click", function () {
    closeSidebar();
});

// Close sidebar when clicking on navigation links
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeSidebar();
    });
});

// Close sidebar on escape key press
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideBar.classList.contains('open-sidebar')) {
        closeSidebar();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 700 && sideBar.classList.contains('open-sidebar')) {
        closeSidebar();
    }
});

// Header transparency on scroll
const navHeader = document.querySelector('.nav-header');

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const maxScroll = 200; // Smooth transition

    // Calculate opacity based on scroll position (1 = opaque, 0.4 = slightly transparent)
    let opacity = Math.max(0.4, 1 - (scrollY / maxScroll));

    // Apply moderate transparency to the header
    navHeader.style.background = `linear-gradient(135deg, rgba(255, 255, 255, ${opacity * 0.15}), rgba(114, 161, 222, ${opacity * 0.08}))`;
    navHeader.style.backdropFilter = `blur(${15 * opacity}px)`;
    navHeader.style.boxShadow = `0 8px 32px rgba(114, 161, 222, ${opacity * 0.2}), inset 0 1px 0 rgba(255, 255, 255, ${opacity * 0.2})`;
    navHeader.style.borderBottom = `1px solid rgba(255, 255, 255, ${opacity * 0.1})`;
});

// Resume view functionality
function handleResumeClick() {
    const resumeUrl = 'images/pdf/resume.pdf';
    const newTab = window.open(resumeUrl, '_blank');

    if (!newTab) {
        window.location.href = resumeUrl;
    }
}

// Scroll down functionality
function scrollToNextSection() {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
        infoSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form submission with success popup
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successPopup = document.getElementById('successPopup');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Show success popup
                    showSuccessPopup();
                    
                    // Reset form
                    this.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showSuccessPopup() {
        successPopup.classList.add('show');
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            hideSuccessPopup();
        }, 4000);
    }

    function hideSuccessPopup() {
        successPopup.classList.remove('show');
    }

    // Close popup when clicking outside
    successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup) {
            hideSuccessPopup();
        }
    });
});