/**
 * MR 3D PRINT - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Process & Technology Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. WhatsApp Quote Simulator & Message Generator
  const quoteForm = document.getElementById('quoteForm');
  const whatsappNumber = '5511999999999'; // Default placeholder, easily customizable

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quoteName')?.value || 'Cliente';
      const service = document.getElementById('quoteService')?.value || 'Prototipagem Rápida';
      const material = document.getElementById('quoteMaterial')?.value || 'Não sei / A Definir';
      const urgency = document.getElementById('quoteUrgency')?.value || 'Normal';
      const hasFile = document.getElementById('quoteHasFile')?.value || 'Sim';
      const description = document.getElementById('quoteDescription')?.value || 'Sem detalhes adicionais';

      const message = `Olá, MR 3D PRINT! Gostaria de solicitar um orçamento para meu projeto.\n\n` +
        `👤 *Nome:* ${name}\n` +
        `⚙️ *Solução/Serviço:* ${service}\n` +
        `🧪 *Material de Interesse:* ${material}\n` +
        `⏱️ *Prazo Desejado:* ${urgency}\n` +
        `📁 *Possui Arquivo 3D (STL/STEP/OBJ):* ${hasFile}\n` +
        `📝 *Detalhes do Projeto:* ${description}\n\n` +
        `Aguardo retorno com a cotação. Obrigado!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. Stats Counter Animation on Scroll
  const statsElements = document.querySelectorAll('.stat-count');
  let animated = false;

  const animateCounters = () => {
    statsElements.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      let current = 0;
      const increment = target / 40;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.innerText = `${prefix}${Math.ceil(current)}${suffix}`;
          requestAnimationFrame(updateCount);
        } else {
          stat.innerText = `${prefix}${target}${suffix}`;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
