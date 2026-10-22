/**
 * NEXUS AI - Modern Digital Agency & SaaS Platform Engine
 * Core Interactive JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initPortfolio();
  initTestimonials();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Navigation Bar Glass & Scroll Behavior
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const navbarInner = document.getElementById('navbar-inner');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('glass-nav');
      navbarInner.classList.remove('h-20');
      navbarInner.classList.add('h-16');
    } else {
      navbar.classList.remove('glass-nav');
      navbarInner.classList.add('h-20');
      navbarInner.classList.remove('h-16');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }

  // Close mobile drawer upon clicking any navigation link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


/* --------------------------------------------------------------------------
   2. Interactive Project Cost & ROI Calculator
   -------------------------------------------------------------------------- */
const tierDetails = {
  1: { name: 'Prototype Validation MVP', basePrice: 6500, time: '2 — 3 Weeks', team: '1 Lead Engineer', baseRoi: '+$40,000' },
  2: { name: 'Growth Scale-up MVP', basePrice: 12500, time: '4 — 6 Weeks', team: '3 Senior Specialists', baseRoi: '+$120,000' },
  3: { name: 'Complete Multi-Service SaaS', basePrice: 22000, time: '7 — 10 Weeks', team: '4 Dedicated Engineers', baseRoi: '+$280,000' },
  4: { name: 'Autonomous Enterprise Hub', basePrice: 38000, time: '12 — 16 Weeks', team: '6 Full-Time Architects', baseRoi: '+$650,000' }
};

function calculateEstimate() {
  const scopeSlider = document.getElementById('scope-slider');
  const mauSlider = document.getElementById('mau-slider');
  const tierLabel = document.getElementById('tier-label');
  const mauLabel = document.getElementById('mau-label');

  const featAi = document.getElementById('feat-ai');
  const featMulti = document.getElementById('feat-multi');
  const featMobile = document.getElementById('feat-mobile');
  const featCompliance = document.getElementById('feat-compliance');
  const featBilling = document.getElementById('feat-billing');
  const featSla = document.getElementById('feat-sla');

  const priceDisplay = document.getElementById('price-display');
  const timelineDisplay = document.getElementById('timeline-display');
  const teamDisplay = document.getElementById('team-display');
  const roiDisplay = document.getElementById('roi-display');
  const infraDisplay = document.getElementById('infra-display');

  if (!scopeSlider || !mauSlider) return;

  const scopeVal = parseInt(scopeSlider.value, 10);
  const mauVal = parseInt(mauSlider.value, 10);
  const tier = tierDetails[scopeVal] || tierDetails[2];

  tierLabel.textContent = tier.name;
  mauLabel.textContent = mauVal >= 500000 ? '500,000+ MAU' : mauVal.toLocaleString() + ' Users';

  let total = tier.basePrice;

  // MAU volume scaling
  if (mauVal > 250000) total += 5000;
  else if (mauVal > 100000) total += 2800;
  else if (mauVal > 40000) total += 1200;

  // Add-on architecture modules
  if (featAi && featAi.checked) total += 3200;
  if (featMulti && featMulti.checked) total += 2100;
  if (featMobile && featMobile.checked) total += 4500;
  if (featCompliance && featCompliance.checked) total += 2800;
  if (featBilling && featBilling.checked) total += 1500;
  if (featSla && featSla.checked) total += 2400;

  // Cloud infrastructure rough estimate
  const infraEstimate = Math.round(35 + (mauVal / 1000) * 1.1 + (featAi && featAi.checked ? 60 : 0));

  priceDisplay.textContent = '$' + total.toLocaleString();
  timelineDisplay.textContent = tier.time;
  teamDisplay.textContent = tier.team;
  roiDisplay.textContent = tier.baseRoi + '+';
  infraDisplay.textContent = '~$' + infraEstimate + '/month';
}

function initCalculator() {
  const scopeSlider = document.getElementById('scope-slider');
  const mauSlider = document.getElementById('mau-slider');
  const lockEstimateBtn = document.getElementById('lock-estimate-btn');

  const inputs = [
    scopeSlider, mauSlider,
    document.getElementById('feat-ai'),
    document.getElementById('feat-multi'),
    document.getElementById('feat-mobile'),
    document.getElementById('feat-compliance'),
    document.getElementById('feat-billing'),
    document.getElementById('feat-sla')
  ];

  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateEstimate);
      input.addEventListener('change', calculateEstimate);
    }
  });

  calculateEstimate();

  if (lockEstimateBtn) {
    lockEstimateBtn.addEventListener('click', () => {
      const scopeVal = parseInt(scopeSlider.value, 10);
      const tier = tierDetails[scopeVal];
      const price = document.getElementById('price-display').textContent;
      const mau = document.getElementById('mau-label').textContent;

      const detailsInput = document.getElementById('form-details');
      const specTag = document.getElementById('calculator-spec-tag');

      const featAi = document.getElementById('feat-ai');
      const featMulti = document.getElementById('feat-multi');
      const featMobile = document.getElementById('feat-mobile');
      const featCompliance = document.getElementById('feat-compliance');
      const featBilling = document.getElementById('feat-billing');

      if (detailsInput) {
        detailsInput.value = `[Calculator Spec Attached]\nTier: ${tier.name}\nExpected Scale: ${mau}\nCalculated Cap: ${price}\nModules: AI(${featAi?.checked}), Multi-Tenant(${featMulti?.checked}), Mobile(${featMobile?.checked}), Compliance(${featCompliance?.checked}), Billing(${featBilling?.checked}).\n\nProject Scope & Objectives: `;
      }
      if (specTag) specTag.classList.remove('hidden');

      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function clearAttachedSpec() {
  document.getElementById('calculator-spec-tag')?.classList.add('hidden');
}


/* --------------------------------------------------------------------------
   3. Portfolio Filter Tabs & Case Studies Modal
   -------------------------------------------------------------------------- */
const caseData = {
  hyperion: {
    title: 'Hyperion Financial: Automated Multi-Currency Reconciliation Engine',
    tag: 'FinTech SaaS',
    metric: '+284% ARR ($3.4M Raised)',
    challenge: 'Legacy ledger sync suffered from race conditions under high transaction spikes, causing 4-hour settlement delays and recurring compliance audits.',
    solution: 'Built an idempotent Rust and Next.js microservice architecture with double-entry accounting guarantees and event-driven Apache Kafka queues.',
    result: 'Achieved sub-15ms settlement across 14 currencies, 99.999% ledger accuracy, and passed rigorous SOC2 and PCI-DSS Level 1 compliance in record time.',
    stack: ['Next.js 15', 'Rust', 'PostgreSQL', 'Kafka', 'Docker']
  },
  synapse: {
    title: 'Synapse AI: Autonomous Multi-Modal Enterprise Agent Network',
    tag: 'Enterprise AI',
    metric: '78% OpEx Reduction',
    challenge: 'Customer support teams were overwhelmed with 80,000 monthly tier-1 tickets, leading to 24-hour response queues and degraded NPS scores.',
    solution: 'Engineered an agentic LLM routing framework using fine-tuned models, pgvector similarity lookup, and direct bidirectional integrations with Shopify & Stripe.',
    result: 'Autonomous first-contact resolution jumped from 14% to 92%, average response time decreased to 1.8 seconds, and CSAT scores rose to 4.92/5.0.',
    stack: ['Python', 'FastAPI', 'pgvector', 'LangChain', 'Gemini API']
  },
  pulsehealth: {
    title: 'PulseHealth: Real-Time Patient Telemetry & Telehealth Suite',
    tag: 'Mobile Health',
    metric: '450k Active Patients',
    challenge: 'A distributed clinic network needed a secure, low-bandwidth video & biometric sync tool that complied with HIPAA standards on both iOS & Android.',
    solution: 'Developed a cross-platform Flutter application with end-to-end encrypted WebRTC channels, SQLite offline cache, and biometric authentication.',
    result: 'Seamlessly connects over 450,000 patients with doctors, with zero security breaches reported across 24 consecutive audit months.',
    stack: ['Flutter', 'WebRTC', 'Go Backend', 'Firebase', 'PostgreSQL']
  },
  cloudvex: {
    title: 'CloudVex: Automated Multi-Cloud Infrastructure & Kubernetes Scaling',
    tag: 'Cloud & DevOps',
    metric: '$420,000 Annual Savings',
    challenge: 'Cloud infrastructure sprawl across unmanaged EC2 instances drove monthly AWS hosting costs to unsustainable runaway levels.',
    solution: 'Codified entire infrastructure with Terraform and Helm charts into an autoscaling AWS EKS cluster with Karpenter and Spot instance fleets.',
    result: 'Slashed cloud compute expenditure by 64% within 30 days while boosting global availability to a guaranteed 99.98% SLA.',
    stack: ['AWS EKS', 'Terraform', 'Karpenter', 'Datadog', 'Argocd']
  },
  aura: {
    title: 'Aura Universal Design System & Component Infrastructure',
    tag: 'Design Systems',
    metric: '+42% Development Speed',
    challenge: 'Seven cross-functional product teams suffered from inconsistent UI paradigms, CSS bloat, and prolonged front-end sprint cycles.',
    solution: 'Constructed an end-to-end design token pipeline connecting Figma Variables directly into accessible Tailwind and React component libraries.',
    result: 'Front-end feature delivery time was cut nearly in half, accessibility score reached 100/100, and overall bundle size shrank by 38%.',
    stack: ['Figma API', 'Storybook', 'Tailwind CSS', 'React', 'Radix UI']
  },
  cogniflow: {
    title: 'CogniFlow: Behavioral Churn Prediction Engine',
    tag: 'Predictive ML',
    metric: '99.4% Model Precision',
    challenge: 'Subscription business lacked visibility into user degradation patterns prior to contract renewal deadlines.',
    solution: 'Trained XGBoost and recurrent neural network models on user interaction logs to compute a dynamic real-time health score per account.',
    result: 'Flagged 89% of at-risk accounts 30 days before renewal, empowering retention teams to salvage over $1.8M in annual recurring revenue.',
    stack: ['Python', 'PyTorch', 'Snowflake', 'dbt', 'AWS SageMaker']
  }
};

function initPortfolio() {
  const portfolioTabs = document.querySelectorAll('.portfolio-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portfolioTabs.forEach(t => {
        t.classList.remove('bg-cyan-500', 'text-white', 'shadow-sm');
        t.classList.add('text-slate-400');
      });
      tab.classList.remove('text-slate-400');
      tab.classList.add('bg-cyan-500', 'text-white', 'shadow-sm');

      const filter = tab.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function openCaseModal(caseKey) {
  const data = caseData[caseKey];
  if (!data) return;

  document.getElementById('case-modal-title').textContent = data.title;
  document.getElementById('case-modal-tag').textContent = data.tag;
  document.getElementById('case-modal-metric').textContent = data.metric;
  document.getElementById('case-modal-challenge').textContent = data.challenge;
  document.getElementById('case-modal-solution').textContent = data.solution;
  document.getElementById('case-modal-result').textContent = data.result;

  const stackContainer = document.getElementById('case-modal-stack');
  stackContainer.innerHTML = '';
  data.stack.forEach(tech => {
    const badge = document.createElement('span');
    badge.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700';
    badge.textContent = tech;
    stackContainer.appendChild(badge);
  });

  document.getElementById('case-modal')?.classList.remove('hidden');
}

function closeCaseModal() {
  document.getElementById('case-modal')?.classList.add('hidden');
}


/* --------------------------------------------------------------------------
   4. Service Details Drawer / Modal
   -------------------------------------------------------------------------- */
const serviceData = {
  saas: {
    title: 'Full-Stack SaaS Platform Engineering',
    badge: 'Web & API Architecture',
    desc: 'We build ultra-resilient multi-tenant web applications designed for scale. From scalable Stripe/LemonSqueezy billing integrations to relational data modeling and real-time WebSocket syncing, your product is engineered to support millions of concurrent users without degradation.',
    tech: ['Next.js 15 App Router', 'TypeScript', 'Node.js / Express', 'PostgreSQL / Prisma', 'Redis Cache', 'Stripe Billing']
  },
  ai: {
    title: 'Autonomous AI Agents & RAG Copilots',
    badge: 'Intelligence Layer',
    desc: 'Empower your application with intelligent conversational copilots, context-aware semantic retrieval engines, and autonomous background workers that take action via external APIs, execute tasks, and learn from continuous feedback loops.',
    tech: ['LangChain / LangGraph', 'OpenAI & Gemini API', 'Pinecone / Qdrant', 'FastAPI Microservices', 'Celery Workers']
  },
  design: {
    title: 'UI/UX Design Systems & Micro-Interactions',
    badge: 'Product Experience',
    desc: 'Modern users demand software that feels responsive, tactile, and intuitive. We create clean, component-driven design systems in Figma paired with modular code implementations that bridge the gap between design vision and pixel-perfect implementation.',
    tech: ['Figma Tokens', 'Storybook', 'Tailwind CSS', 'Framer Motion', 'WCAG AAA Accessibility']
  },
  cloud: {
    title: 'Cloud DevOps & Infrastructure as Code',
    badge: 'Platform Engineering',
    desc: 'Say goodbye to fragile manual server setups. We provision immutable, self-healing cloud infrastructure on AWS and GCP with Terraform, implement multi-stage GitHub Actions CI/CD pipelines, and configure comprehensive Datadog/Prometheus monitoring.',
    tech: ['AWS / Google Cloud', 'Kubernetes (EKS/GKE)', 'Terraform / OpenTofu', 'Docker', 'GitHub Actions CI/CD']
  },
  mobile: {
    title: 'Cross-Platform Native Mobile Apps',
    badge: 'iOS & Android Suite',
    desc: 'Deliver a native-grade mobile experience for iOS and Android with a shared codebase. We engineer performant Flutter and React Native apps equipped with biometric authentication, offline persistence, push notifications, and hardware sensor integration.',
    tech: ['Flutter / Dart', 'React Native / Expo', 'Swift / Kotlin', 'Firebase Cloud Messaging', 'SQLite / Realm']
  },
  growth: {
    title: 'Web Vitals & Performance Engineering',
    badge: 'Growth & SEO',
    desc: 'Speed equals conversion. We conduct deep-dive profiling of JavaScript bundles, database bottlenecks, and edge caching strategies to achieve 95+ Core Web Vitals across mobile and desktop, driving lower acquisition costs and higher organic search rankings.',
    tech: ['Chrome DevTools Profiling', 'Edge Caching (Cloudflare)', 'Dynamic SSR/SSG', 'PostHog Analytics', 'Lighthouse Optimization']
  }
};

function openServiceModal(serviceKey) {
  const data = serviceData[serviceKey];
  if (!data) return;

  document.getElementById('modal-service-title').textContent = data.title;
  document.getElementById('modal-service-badge').textContent = data.badge;
  document.getElementById('modal-service-desc').textContent = data.desc;

  const techContainer = document.getElementById('modal-service-tech');
  techContainer.innerHTML = '';
  data.tech.forEach(t => {
    const badge = document.createElement('span');
    badge.className = 'text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700';
    badge.textContent = t;
    techContainer.appendChild(badge);
  });

  document.getElementById('service-modal')?.classList.remove('hidden');
}

function closeServiceModal() {
  document.getElementById('service-modal')?.classList.add('hidden');
}

function contactFromServiceModal() {
  closeServiceModal();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}


/* --------------------------------------------------------------------------
   5. Interactive Testimonials Carousel
   -------------------------------------------------------------------------- */
const testimonials = [
  {
    quote: '"Nexus re-architected our entire cloud data pipeline in less than six weeks. Our AWS cloud bill dropped by 48% immediately, and our API response times fell from 340ms to 28ms globally. They operate like an elite in-house engineering team."',
    author: 'Marcus Reynolds',
    title: 'Chief Technology Officer, Hyperion Pay',
    avatar: 'MR',
    metric: '+310% Scale Capacity'
  },
  {
    quote: '"The AI agent copilot Nexus designed for our SaaS platform resolved 78% of incoming customer requests on the first touch without human intervention. Our users love the instant resolution speed."',
    author: 'Elena Rostova',
    title: 'VP of Product, Synapse Enterprise AI',
    avatar: 'ER',
    metric: '78% Ticket Deflection'
  },
  {
    quote: '"From our seed pitch deck to a production mobile platform with 450,000 active patients, Nexus was our unfair advantage. Fast, uncompromising on quality, and always communicative."',
    author: 'Dr. Jason Sterling',
    title: 'Co-Founder & CEO, PulseHealth',
    avatar: 'JS',
    metric: '450k Active Patients'
  }
];

let currentTestimonialIndex = 0;

function renderTestimonial() {
  const t = testimonials[currentTestimonialIndex];
  const container = document.getElementById('testimonial-container');
  if (!container) return;

  container.style.opacity = '0';
  setTimeout(() => {
    document.getElementById('testimonial-quote').textContent = t.quote;
    document.getElementById('testimonial-author').textContent = t.author;
    document.getElementById('testimonial-title').textContent = t.title;
    document.getElementById('testimonial-avatar').textContent = t.avatar;
    document.getElementById('testimonial-metric').textContent = t.metric;

    const dots = document.querySelectorAll('#testimonial-dots button');
    dots.forEach((dot, idx) => {
      if (idx === currentTestimonialIndex) {
        dot.className = 'w-3 h-3 rounded-full bg-cyan-400 transition-all';
      } else {
        dot.className = 'w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-500 transition-all';
      }
    });

    container.style.opacity = '1';
  }, 150);
}

function initTestimonials() {
  renderTestimonial();
}

function setTestimonial(idx) {
  currentTestimonialIndex = idx;
  renderTestimonial();
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  renderTestimonial();
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
}


/* --------------------------------------------------------------------------
   6. Pricing Monthly / Annual Toggle & Plan Selector
   -------------------------------------------------------------------------- */
let currentBilling = 'monthly';

function setBilling(mode) {
  currentBilling = mode;
  const monthlyBtn = document.getElementById('billing-monthly-btn');
  const annualBtn = document.getElementById('billing-annual-btn');

  if (mode === 'annual') {
    if (annualBtn) annualBtn.className = 'px-5 py-2 rounded-full text-xs font-semibold transition-all bg-cyan-500 text-white shadow flex items-center gap-1.5';
    if (monthlyBtn) monthlyBtn.className = 'px-5 py-2 rounded-full text-xs font-semibold transition-all text-slate-400 hover:text-white';

    // 20% discount applied
    document.getElementById('price-starter').textContent = '$3,920';
    document.getElementById('price-pro').textContent = '$7,120';
    document.getElementById('price-enterprise').textContent = '$13,200';

    document.getElementById('billing-period-starter').textContent = '/mo (billed annually)';
    document.getElementById('billing-period-pro').textContent = '/mo (billed annually)';
    document.getElementById('billing-period-enterprise').textContent = '/mo (billed annually)';
  } else {
    if (monthlyBtn) monthlyBtn.className = 'px-5 py-2 rounded-full text-xs font-semibold transition-all bg-cyan-500 text-white shadow';
    if (annualBtn) annualBtn.className = 'px-5 py-2 rounded-full text-xs font-semibold transition-all text-slate-400 hover:text-white flex items-center gap-1.5';

    document.getElementById('price-starter').textContent = '$4,900';
    document.getElementById('price-pro').textContent = '$8,900';
    document.getElementById('price-enterprise').textContent = '$16,500';

    document.getElementById('billing-period-starter').textContent = '/month';
    document.getElementById('billing-period-pro').textContent = '/month';
    document.getElementById('billing-period-enterprise').textContent = '/month';
  }
}

function selectPlan(planName, price) {
  const detailsInput = document.getElementById('form-details');
  if (detailsInput) {
    detailsInput.value = `Inquiring about ${planName} (${price} ${currentBilling}).\n\nTarget start date:\nKey deliverables:\n`;
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  showToast('Plan Selected', `Transferred ${planName} directly into your consultation brief.`);
}


/* --------------------------------------------------------------------------
   7. Lead Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const detailsInput = document.getElementById('form-details');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const detailsError = document.getElementById('details-error');

  let isValid = true;

  // Validate Name
  if (!nameInput.value.trim()) {
    nameError.classList.remove('hidden');
    isValid = false;
  } else {
    nameError.classList.add('hidden');
  }

  // Validate Email (standard regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.classList.remove('hidden');
    isValid = false;
  } else {
    emailError.classList.add('hidden');
  }

  // Validate Details
  if (detailsInput.value.trim().length < 10) {
    detailsError.classList.remove('hidden');
    isValid = false;
  } else {
    detailsError.classList.add('hidden');
  }

  if (!isValid) return;

  // Simulate sending submission
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');

  submitBtn.disabled = true;
  submitBtnText.textContent = 'Transmitting Proposal Spec...';
  submitSpinner.classList.remove('hidden');

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtnText.textContent = 'Transmit Project Proposal';
    submitSpinner.classList.add('hidden');

    showToast('Proposal Dispatched!', `Thank you ${nameInput.value.split(' ')[0]}! Our technical team has received your brief and will reply shortly.`);

    document.getElementById('lead-form').reset();
    clearAttachedSpec();
  }, 1200);
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    showToast('Subscription Confirmed', `You are subscribed to the Nexus Engineering Digest (${email}).`);
    document.getElementById('newsletter-email').value = '';
  }
}

function showToast(title, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-message').textContent = message;

  toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

  setTimeout(() => {
    hideToast();
  }, 6000);
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
  toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
}

// Global window event listeners for Modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeServiceModal();
    closeCaseModal();
  }
});

[document.getElementById('service-modal'), document.getElementById('case-modal')].forEach(modal => {
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
});

// Expose functions globally for inline HTML onclick handlers
window.calculateEstimate = calculateEstimate;
window.clearAttachedSpec = clearAttachedSpec;
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.contactFromServiceModal = contactFromServiceModal;
window.setTestimonial = setTestimonial;
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.setBilling = setBilling;
window.selectPlan = selectPlan;
window.handleFormSubmit = handleFormSubmit;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.showToast = showToast;
window.hideToast = hideToast;
