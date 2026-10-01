
document.addEventListener('DOMContentLoaded', () => {
  
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    // Configuración
    const particleCount = 60;
    const connectionDistance = 120;
    const moveSpeed = 0.15;
    
    // Colores
    const colors = ['#00d4aa', '#00fff2', '#00b894', '#55efc4'];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.velocity = {
          x: (Math.random() - 0.5) * moveSpeed,
          y: (Math.random() - 0.5) * moveSpeed
        };
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.01 + 0.005;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      update() {
        this.phase += this.phaseSpeed;
        this.size = this.baseSize + Math.sin(this.phase) * 0.3;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Rebotar en bordes
        if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;
        
        // Repulsión del mouse
        if (mouse.x !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius && distance > 0) {
            const force = (mouse.radius - distance) / mouse.radius;
            const repulsion = 2;
            this.x += (dx / distance) * force * repulsion;
            this.y += (dy / distance) * force * repulsion;
          }
        }
      }
    }
    
    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            let opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(0, 212, 170, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connect();
      requestAnimationFrame(animate);
    }
    
    init();
    animate();
  }
  
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item').forEach(el => {
    animateOnScroll.observe(el);
  });

  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.style.background = 'rgba(8, 8, 8, 0.95)';
        header.style.boxShadow = '0 1px 0 var(--border)';
      } else {
        header.style.background = 'rgba(8, 8, 8, 0.8)';
        header.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const heroGradient = document.querySelector('.hero-gradient');
  if (heroGradient) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      heroGradient.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.skill-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.skill-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
      }
    });
  });

  // Asegurar que los enlaces mailto funcionen correctamente
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const mailtoUrl = this.getAttribute('href');
      window.location.href = mailtoUrl;
    });
  });
});
