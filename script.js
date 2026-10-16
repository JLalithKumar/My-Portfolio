/**
 * LALITH KUMAR J | EXECUTIVE TECH PORTFOLIO
 * 10-Section Architecture + Glassmorphism + Project Architecture Modals & Certificate Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectModals();
  initCertificateModals();
  initContactAndClipboard();
  initCollapsibles();
});

/* ==========================================================================
   1. Theme Management (Executive Dark / Clean Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('lk-portfolio-theme') || 'dark';
  
  applyTheme(storedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Executive Dark' : 'Clean Light'} theme`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lk-portfolio-theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' 
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* ==========================================================================
   2. Navigation Highlighting across 10 Sections
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Featured Projects Architecture & Workflows Modal
   ========================================================================== */
const projectModalData = {
  cloudops: {
    title: "CloudOps Automation Platform",
    category: "Cloud & DevOps",
    badge: "AWS EKS • K8s • Velero • Spring Boot",
    overview: "An enterprise automation platform for cloud infrastructure operations, real-time Kubernetes cluster health monitoring, automated kubectl remediation, Velero disaster recovery, and resource rightsizing.",
    workflows: [
      {
        name: "1. Infrastructure Architecture & Cluster Health",
        desc: "AWS EKS cluster with Spring Boot backend communicating with the Kubernetes API to inspect namespaces, daemonsets, and node health. Detects CrashLoopBackOff and pod anomalies in real-time."
      },
      {
        name: "2. Kubernetes Self-Healing Loop",
        desc: "Automated kubectl remediation workflows that execute graduated recovery: pod restart ➔ deployment reconciliation ➔ rollbacks with real-time health checks."
      },
      {
        name: "3. Backup & Disaster Recovery Workflow",
        desc: "Velero CRDs integrated with AWS S3 and IAM Roles for Service Accounts (IRSA), executing scheduled and on-demand cluster state snapshots with verified restores under 10 minutes."
      },
      {
        name: "4. Cost-Optimization Workflow",
        desc: "Direct integration with the AWS Cost Explorer API scanning for unattached EBS volumes and idle compute, providing EC2 rightsizing recommendations with 15% to 25% projected monthly savings."
      }
    ],
    tech: ["AWS EKS", "AWS EC2", "AWS S3", "IAM / IRSA", "Cost Explorer API", "Kubernetes", "Velero", "Spring Boot", "Java", "React"],
    metrics: [
      { label: "Restoration Time", val: "< 10 Mins" },
      { label: "Cost Savings", val: "15% - 25%" },
      { label: "Recovery Tool", val: "Velero + S3" },
      { label: "Architecture", val: "EKS + Spring Boot" }
    ],
    github: "https://github.com/JLalithKumar/CloudOps"
  },
  talentpilot: {
    title: "TalentPilot AI Recruitment Platform",
    category: "Full Stack & DevOps",
    badge: "Spring Boot • React • Docker • K8s • ArgoCD",
    overview: "A modern recruitment and hiring management platform that orchestrates candidate workflows, AI-assisted resume processing, candidate-job matching, and a fully automated GitOps deployment pipeline.",
    workflows: [
      {
        name: "1. Candidate & Recruiter Workflows",
        desc: "Multi-role recruitment portal supporting 3 user roles (Candidate, Recruiter, Admin) with streamlined job posting, application tracking, and candidate pipeline visualization."
      },
      {
        name: "2. REST API Architecture & Security",
        desc: "Secure Spring Boot REST API architecture with stateless JWT authentication, role-based access control (RBAC), and persistent data modeling in MySQL and AWS S3 document storage."
      },
      {
        name: "3. Automated CI/CD Pipeline",
        desc: "Docker containerization orchestrated via GitHub Actions with automated linting, unit testing, and multi-stage container builds pushed to container registries."
      },
      {
        name: "4. GitOps Deployment with ArgoCD",
        desc: "Continuous deployment synchronized via ArgoCD to Kubernetes clusters, reducing deployment cycles from ~30 minutes down to under 5 minutes with zero downtime."
      }
    ],
    tech: ["Java", "Spring Boot", "React", "MySQL", "AWS S3", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"],
    metrics: [
      { label: "Deployment Cycle", val: "< 5 Mins" },
      { label: "Previous Cycle", val: "~30 Mins" },
      { label: "User Roles", val: "3 RBAC Roles" },
      { label: "Delivery Model", val: "ArgoCD GitOps" }
    ],
    github: "https://github.com/JLalithKumar/TalentPilot-AI-Driven-Recruitment-Platform-DevOps-Pipeline"
  },
  docuchat: {
    title: "DocuChat AI – Multi-Tenant Document Intelligence",
    category: "GenAI & Full Stack",
    badge: "Atlas Vector Search • Claude API • OpenAI • React",
    overview: "A production-ready Retrieval-Augmented Generation (RAG) platform enabling users to upload documents, ingest semantic text embeddings, and engage in real-time streaming AI chats grounded strictly in source documents.",
    workflows: [
      {
        name: "1. Document Ingestion Pipeline",
        desc: "Multi-document PDF parser with sentence-aware text chunking (~500 tokens with 50-token context overlap) generating 1536-dimensional embeddings with OpenAI text-embedding-3-small."
      },
      {
        name: "2. Vector Retrieval Engine",
        desc: "MongoDB Atlas Vector Search using cosine similarity index, filtered pre-query by user ID for tenant isolation, returning relevant context chunks in under 2 seconds."
      },
      {
        name: "3. Real-Time Streaming Chat",
        desc: "Server-Sent Events (SSE) streaming real-time token responses from Anthropic's Claude API, providing instant conversational responsiveness without blocking."
      },
      {
        name: "4. Grounded Source Citations",
        desc: "Every AI response includes exact document page citations and excerpt previews, allowing users to verify facts directly against original source material."
      }
    ],
    tech: ["MongoDB Atlas Vector Search", "OpenAI Embeddings", "Anthropic Claude API", "React", "Node.js", "Express.js", "JWT Authentication", "SSE"],
    metrics: [
      { label: "Vector Search", val: "< 2 Seconds" },
      { label: "Doc Capacity", val: "50+ Docs/User" },
      { label: "Vector Dims", val: "1536-dim" },
      { label: "Streaming", val: "Real-time SSE" }
    ],
    github: "https://github.com/JLalithKumar/AI-Document-QA"
  },
  auramart: {
    title: "AuraMart – E-Commerce Platform",
    category: "Full-Stack MERN",
    badge: "MongoDB • Express • React • Node.js • Redux",
    overview: "A full-stack MERN e-commerce application designed for rapid product browsing, optimized database queries, shopping cart state management, Stripe payment processing, and administrative order handling.",
    workflows: [
      {
        name: "1. Product Catalog & Query Optimization",
        desc: "Indexed MongoDB database queries with compound pagination, achieving sub-200ms API response times and reducing database lookup times by ~40%."
      },
      {
        name: "2. Cart Lifecycle & State Management",
        desc: "Client-side state caching using Redux Toolkit, providing instant optimistic UI updates and seamless shopping cart synchronization across sessions."
      },
      {
        name: "3. Stripe Checkout & Transactional Email",
        desc: "Secure end-to-end payment processing integrated with Stripe Checkout, coupled with automated transactional order confirmation emails dispatched via Nodemailer."
      },
      {
        name: "4. Administrative Dashboard & Performance",
        desc: "Protected administrative console for inventory adjustments, order fulfillment tracking, and sales analytics, achieving 90+ on Lighthouse with page loads under 2 seconds."
      }
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "Stripe Checkout", "Nodemailer", "JWT Authentication"],
    metrics: [
      { label: "API Response", val: "< 200 ms" },
      { label: "Query Optimization", val: "~40% Faster" },
      { label: "Lighthouse Score", val: "90+ Score" },
      { label: "Page Load Time", val: "< 2 Seconds" }
    ],
    github: "https://github.com/JLalithKumar/auramart-mern"
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalContent = document.getElementById('projectModalContent');
  const closeBtn = document.getElementById('projectModalClose');
  const inspectBtns = document.querySelectorAll('.inspect-trigger-btn');
  
  if (!modalOverlay || !modalContent) return;
  
  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const item = projectModalData[projKey];
      if (!item) return;
      
      modalContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="pill pill-cyan">${item.category}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-muted);">${item.badge}</span>
          </div>
          <h2 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">${item.title}</h2>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">${item.overview}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 2rem; background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          ${item.metrics.map(m => `
            <div>
              <div style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--accent-primary);">${m.val}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${m.label}</div>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">Core Architecture & Workflows</h3>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${item.workflows.map(wf => `
              <div style="background: var(--bg-secondary); padding: 1rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-primary); margin-bottom: 0.35rem;">${wf.name}</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${wf.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Technologies & Frameworks</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
            ${item.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Open Project Repository on GitHub
          </a>
        </div>
      `;
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   4. Certificate Lightbox Modal
   ========================================================================== */
function initCertificateModals() {
  const certOverlay = document.getElementById('certModalOverlay');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalIssuer = document.getElementById('certModalIssuer');
  const certModalOpenFull = document.getElementById('certModalOpenFull');
  const closeBtn = document.getElementById('certModalClose');
  
  const clickableCerts = document.querySelectorAll('.cert-card, .workshop-card, .exp-cert-btn');
  
  clickableCerts.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const imgPath = card.getAttribute('data-cert-img');
      const title = card.getAttribute('data-cert-title') || card.querySelector('.cert-name, .workshop-title')?.textContent;
      const issuer = card.getAttribute('data-cert-issuer') || card.querySelector('.cert-issuer, .workshop-org')?.textContent;
      
      if (!imgPath || !certOverlay) return;
      
      certModalImg.src = imgPath;
      certModalImg.alt = title || "Certificate Preview";
      certModalTitle.textContent = title || "Certificate of Completion";
      certModalIssuer.textContent = issuer || "Verified Credential";
      certModalOpenFull.href = imgPath;
      
      certOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      certOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  if (certOverlay) {
    certOverlay.addEventListener('click', (e) => {
      if (e.target === certOverlay) {
        certOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certOverlay && certOverlay.classList.contains('active')) {
      certOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   5. Collapsible Sections Toggle (Publications & Certifications)
   ========================================================================== */
function initCollapsibles() {
  // Publications toggle
  const togglePubsBtn = document.getElementById('toggleAllPubs');
  const pubExtras = document.querySelectorAll('.pub-extra');
  const togglePubsText = document.getElementById('toggleAllPubsText');

  if (togglePubsBtn && pubExtras.length > 0) {
    togglePubsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = togglePubsBtn.classList.toggle('active');
      togglePubsBtn.setAttribute('aria-expanded', isExpanded);
      pubExtras.forEach(el => el.classList.toggle('expanded', isExpanded));
      if (togglePubsText) {
        togglePubsText.textContent = isExpanded ? 'Show fewer publications' : 'View all publications (4)';
      }
    });
  }

  // Certifications toggle
  const toggleCertsBtn = document.getElementById('toggleAllCerts');
  const certExtras = document.querySelectorAll('.cert-extra');
  const toggleCertsText = document.getElementById('toggleAllCertsText');

  if (toggleCertsBtn && certExtras.length > 0) {
    toggleCertsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = toggleCertsBtn.classList.toggle('active');
      toggleCertsBtn.setAttribute('aria-expanded', isExpanded);
      certExtras.forEach(el => el.classList.toggle('expanded', isExpanded));
      if (toggleCertsText) {
        toggleCertsText.textContent = isExpanded ? 'Show featured only (5)' : 'View all 10 certifications';
      }
    });
  }
}

/* ==========================================================================
   6. Contact & Clipboard Handling
   ========================================================================== */
function initContactAndClipboard() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailVal = "lalithkumarjakanathan@gmail.com";
  
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailVal).then(() => {
        showToast(`Copied to clipboard: ${emailVal}`);
      }).catch(() => {
        showToast(`Direct Email: ${emailVal}`);
      });
    });
  }
}

/* ==========================================================================
   7. Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
