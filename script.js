/* ==========================================================================
   PURE FULL-SCREEN AI CHATBOT PORTFOLIO - JAVASCRIPT CONTROLLER
   Powers: Intelligent Document RAG Engine, Voice Input, Dynamic Suggestions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Element Selectors ---
  const chatStream = document.getElementById('chatStream');
  const mainChatForm = document.getElementById('mainChatForm');
  const mainChatInput = document.getElementById('mainChatInput');
  const promptChips = document.querySelectorAll('.prompt-chip, .prompt-trigger');
  const shortcutButtons = document.querySelectorAll('.shortcut-item, .shortcut-card-btn');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const soundToggle = document.getElementById('soundToggle');
  const headerConnectBtn = document.getElementById('headerConnectBtn');
  const micBtn = document.getElementById('micBtn');

  // Resume Modal Selectors
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  // Drawer Selectors
  const detailDrawer = document.getElementById('detailDrawer');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  let soundEnabled = true;

  // --- Verified Contact Info ---
  const githubURL = "https://github.com/rj4349303-arch";
  const linkedinURL = "https://www.linkedin.com/in/rahul-j-120413359?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const emailAddr = "rj4349303@gmail.com";
  const phoneNum = "+91 63695 57647";

  // ==========================================================================
  // DOCUMENT KNOWLEDGE BASE (Indexed from Official Resume Document)
  // ==========================================================================
  const documentKnowledgeBase = {
    "about": {
      keywords: ["about", "who", "rahul", "intro", "objective", "identity", "role"],
      text: "✨ **Rahul J — Frontend Developer & Automation Engineer**\nChennai, India | Email: rj4349303@gmail.com | Phone: +91 63695 57647\n\n**Objective:** Aspiring Frontend Developer and Automation Engineer with hands-on experience building full-stack web applications and workflow automation solutions. Skilled in MERN stack (MongoDB, Express, React, Node.js), Python, and n8n.",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">ROLE</span>
            <h4>Rahul J</h4>
            <p>Frontend Developer & Automation Engineer</p>
            <button class="card-action-btn open-resume-trigger">Full Resume Document →</button>
          </div>
          <div class="inline-card">
            <span class="card-badge">EDUCATION</span>
            <h4>Sri Sairam Tech</h4>
            <p>B.Tech AI & Data Science (CGPA: 8.4 / 10)</p>
            <button class="card-action-btn view-detail-btn" data-detail="education">Education Specs →</button>
          </div>
        </div>
        <div style="margin-top:14px; padding-top:10px; border-top:1px dashed var(--primary-pink-border); display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <span style="font-size:12px; font-weight:700; color:var(--text-muted);">Suggested Next Step:</span>
          <button class="prompt-chip prompt-trigger" data-prompt="What projects has he built?" style="background:linear-gradient(135deg, var(--palette-peach), var(--palette-coral)); color:#fff; border:none; padding:8px 18px; font-size:13px; font-weight:600; border-radius:25px; cursor:pointer; box-shadow:0 4px 12px rgba(255,138,138,0.3);">🚀 Projects →</button>
        </div>
      `
    },
    "nalam": {
      keywords: ["nalam", "healthcare", "patient", "doctor", "medical", "mern"],
      text: "🏥 **Nalam — Healthcare Management Platform** *(Freelance Project)*\n**Tech Stack:** MERN Stack (MongoDB, Express.js, React, Node.js)\n\n• Built a unified healthcare platform connecting patients and doctors with real-time AI chatbot communication.\n• Developed doctor-side patient DB enabling access to medical history, records, and consultation notes.\n• Implemented appointment scheduling & direct doctor-patient messaging.\n• Deployed on GitHub with clean, documented codebase.",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card" style="grid-column: 1 / -1;">
            <span class="card-badge">FULL-STACK AI</span>
            <h4>Nalam Healthcare Platform</h4>
            <p>Secured 5th Place at Anna University Hackathon!</p>
            <button class="card-action-btn view-detail-btn" data-detail="nalam">View Nalam Specs →</button>
          </div>
        </div>
      `
    },
    "medbill": {
      keywords: ["medbill", "pharmacy", "billing", "whatsapp", "invoice", "gpay", "sales"],
      text: "💊 **MedBill Pro — Digital Pharmacy Billing System** *(Freelance Project)*\n**Tech Stack:** HTML, CSS, JavaScript, MongoDB\n\n• Developed a mobile-first pharmacy billing system enabling pharmacists to generate bills without a PC.\n• Integrated WhatsApp-based digital invoice sharing to instantly deliver bills to customers.\n• Built inventory management with low-stock alerts & payment tracking (cash, G-Pay).\n• Created a sales analytics dashboard for daily, weekly, and monthly reports.",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card" style="grid-column: 1 / -1;">
            <span class="card-badge">WEB APP</span>
            <h4>MedBill Pro Digital Billing</h4>
            <p>Mobile-first billing with WhatsApp digital invoice delivery.</p>
            <button class="card-action-btn view-detail-btn" data-detail="medbill">View MedBill Specs →</button>
          </div>
        </div>
      `
    },
    "automation": {
      keywords: ["n8n", "telegram", "automation", "workflow", "mail", "bot", "bulk"],
      text: "⚙️ **n8n Workflow Automation — Telegram Chatbot & Bulk Mail System**\n**Tech Stack:** n8n, Telegram Bot API, Email Automation\n\n• Designed and deployed an n8n automation workflow integrating a Telegram chatbot for bulk email campaigns.\n• Built trigger-based pipelines to automate message dispatching, reducing manual effort significantly.\n• Configured multi-step workflows with conditional logic, API integrations, and error handling.",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card" style="grid-column: 1 / -1;">
            <span class="card-badge">WORKFLOW AUTOMATION</span>
            <h4>n8n Telegram & Email System</h4>
            <p>Automated bulk campaign dispatching with conditional logic & APIs.</p>
            <button class="card-action-btn view-detail-btn" data-detail="automation">View Automation Specs →</button>
          </div>
        </div>
      `
    },
    "projects": {
      keywords: ["project", "projects", "work", "built", "apps", "codebase"],
      text: "🚀 **Rahul's Main Featured Projects:**\n1. **Nalam:** Healthcare Management Platform (MERN Stack + AI Chatbot)\n2. **MedBill Pro:** Digital Pharmacy Billing System (Mobile-first + WhatsApp Invoices)\n3. **n8n Automation:** Telegram Chatbot & Bulk Email Campaign System",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">MERN & AI</span>
            <h4>1. Nalam</h4>
            <p>AI Healthcare platform with patient-doctor DB & chat</p>
            <button class="card-action-btn view-detail-btn" data-detail="nalam">Nalam Specs →</button>
          </div>
          <div class="inline-card">
            <span class="card-badge">BILLING APP</span>
            <h4>2. MedBill Pro</h4>
            <p>Mobile billing with WhatsApp invoice sharing & G-Pay</p>
            <button class="card-action-btn view-detail-btn" data-detail="medbill">MedBill Specs →</button>
          </div>
          <div class="inline-card">
            <span class="card-badge">AUTOMATION</span>
            <h4>3. n8n Telegram Bot</h4>
            <p>Workflow pipelines for bulk email campaigns & triggers</p>
            <button class="card-action-btn view-detail-btn" data-detail="automation">Automation Specs →</button>
          </div>
        </div>
      `
    },
    "skills": {
      keywords: ["skill", "skills", "stack", "tech", "frontend", "backend", "python", "react", "node", "mongodb", "java", "sql", "c"],
      text: "💡 **Technical Skills & Tools Breakdown:**\n\n• **Frontend:** HTML, CSS, JavaScript, React.js\n• **Backend:** Node.js, Express.js, Flask (REST API)\n• **Databases:** MongoDB, Firebase, SQL\n• **Automation:** n8n, Telegram Bot API, Workflow Design\n• **Programming:** Python (Advanced), C, Java (Basic)\n• **ML Libraries:** scikit-learn, pandas, NumPy, Matplotlib, TensorFlow (Basics)\n• **Tools:** Git/GitHub, VS Code, Jupyter Notebook, Google Colab",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">WEB STACK</span>
            <h4>React, Node & Express</h4>
            <p>Full-Stack MERN development & REST APIs</p>
          </div>
          <div class="inline-card">
            <span class="card-badge">LANGUAGES</span>
            <h4>Python (Adv) & Java</h4>
            <p>Data science, scripting & algorithms</p>
          </div>
          <div class="inline-card">
            <span class="card-badge">AUTOMATION</span>
            <h4>n8n & Databases</h4>
            <p>MongoDB, Firebase, SQL & Telegram API</p>
          </div>
        </div>
      `
    },
    "education": {
      keywords: ["education", "sairam", "college", "degree", "cgpa", "school", "vels", "hsc", "12th"],
      text: "🎓 **Education Credentials:**\n\n1. **Sri Sairam Institute of Technology** (Chennai, India)\n• **Degree:** B.Tech in Artificial Intelligence & Data Science (2nd Year)\n• **CGPA:** 8.4 / 10\n\n2. **Vels Vidyashram Senior Secondary School** (Chennai, India)\n• **HSC (12th Standard - CBSE):** Score: 73.5% | Cutoff: 147",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">COLLEGE</span>
            <h4>Sri Sairam Institute</h4>
            <p>B.Tech AI & Data Science (CGPA: 8.4 / 10)</p>
          </div>
          <div class="inline-card">
            <span class="card-badge">SCHOOL</span>
            <h4>Vels Vidyashram</h4>
            <p>CBSE 12th Grade • Score: 73.5%</p>
          </div>
        </div>
      `
    },
    "achievements": {
      keywords: ["achievement", "achievements", "hackathon", "award", "anna university", "paper", "place"],
      text: "🏆 **Key Achievements:**\n\n• **Secured 5th Place at Anna University Hackathon** — built and presented Nalam, a full-stack AI-powered healthcare platform.\n• **Won Paper Presentation and Hackathon competitions** demonstrating innovation & problem-solving.\n• **Published multiple projects on GitHub** including Nalam and MedBill Pro with complete documentation.",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card" style="grid-column: 1 / -1;">
            <span class="card-badge">5TH PLACE HACKATHON</span>
            <h4>Anna University Hackathon Winner</h4>
            <p>Won paper presentation & hackathons showcasing Nalam healthcare platform.</p>
          </div>
        </div>
      `
    },
    "certifications": {
      keywords: ["certification", "certifications", "course", "udemy", "c programming", "machine learning"],
      text: "📜 **Official Certifications:**\n\n• **C Programming** — Complete Course\n• **Python & Advanced Python** — Complete Course\n• **SQL** — Database Management\n• **JavaScript — Beginner to Expert Developer** *(Udemy)*\n• **Machine Learning & AI Foundations** *(Udemy)*",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">UDEMY CERTIFIED</span>
            <h4>JS & ML Foundations</h4>
            <p>JavaScript Expert & Machine Learning Foundations</p>
          </div>
          <div class="inline-card">
            <span class="card-badge">LANGUAGES & DB</span>
            <h4>Python, C & SQL</h4>
            <p>Advanced Python, C Programming & SQL DB</p>
          </div>
        </div>
      `
    },
    "contact": {
      keywords: ["contact", "email", "mail", "phone", "mobile", "reach", "hire", "linkedin", "github"],
      text: `✉️ **Contact Information for Rahul J:**\n- **Email:** ${emailAddr}\n- **Phone:** ${phoneNum}\n- **LinkedIn:** ${linkedinURL}\n- **GitHub:** ${githubURL}\n- **Location:** Chennai, India`,
      html: `
        <div class="inline-card-grid">
          <div class="inline-card">
            <span class="card-badge">EMAIL</span>
            <h4>${emailAddr}</h4>
            <p>Direct Inquiries & Placements</p>
            <a href="mailto:${emailAddr}" class="card-action-btn" style="text-decoration:none; display:inline-block;">Send Email →</a>
          </div>
          <div class="inline-card">
            <span class="card-badge">PHONE</span>
            <h4>${phoneNum}</h4>
            <p>Call or WhatsApp</p>
            <a href="tel:+916369557647" class="card-action-btn" style="text-decoration:none; display:inline-block;">Call Direct →</a>
          </div>
          <div class="inline-card">
            <span class="card-badge">GITHUB & LINKEDIN</span>
            <h4>@rj4349303-arch</h4>
            <p>Connect on LinkedIn & GitHub</p>
            <a href="${linkedinURL}" target="_blank" class="card-action-btn" style="text-decoration:none; display:inline-block;">LinkedIn →</a>
          </div>
        </div>
      `
    },
    "resume": {
      keywords: ["resume", "cv", "bio", "document"],
      text: "📄 **Rahul J's Official Resume:**\nYou can preview or download Rahul's official resume document below:",
      html: `
        <div class="inline-card-grid">
          <div class="inline-card" style="grid-column: 1 / -1;">
            <span class="card-badge">RESUME DOCUMENT</span>
            <h4>Rahul J - Frontend Developer & Automation Engineer</h4>
            <p>Sri Sairam Institute of Technology • CGPA: 8.4/10 • Chennai, India</p>
            <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
              <button class="card-action-btn open-resume-trigger">Preview Fullscreen →</button>
              <a href="assets/rahul-resume.jpg" download="Rahul_J_Resume.jpg" class="card-action-btn" style="text-decoration:none; background:var(--palette-peach); color:var(--text-dark);">Download Resume ⤓</a>
            </div>
          </div>
        </div>
      `
    }
  };

  // --- Detailed Specs Drawer Knowledge Base ---
  const drawerSpecs = {
    "about": {
      title: "Rahul J — Objective & Bio",
      body: `
        <h4>Frontend Developer & Automation Engineer</h4>
        <p>Aspiring Frontend Developer and Automation Engineer with hands-on experience building full-stack web applications and workflow automation solutions. Passionate about crafting intuitive user interfaces and streamlining processes using modern tools like the MERN stack and n8n.</p>
        <hr style="margin:14px 0; border:0; border-top:1px solid #FFE1E8;">
        <h5>Contact Details:</h5>
        <p>• Email: rj4349303@gmail.com<br>• Phone: +91 63695 57647<br>• Location: Chennai, India</p>
      `
    },
    "nalam": {
      title: "Nalam — Healthcare Management Platform",
      body: `
        <span class="card-badge">MERN STACK + AI</span>
        <p style="margin-top:8px;">A unified healthcare platform connecting patients and doctors with real-time AI chatbot communication.</p>
        <hr style="margin:14px 0; border:0; border-top:1px solid #FFE1E8;">
        <h4>Key Highlights:</h4>
        <ul style="padding-left:20px; font-size:13px; line-height:1.6;">
          <li>Doctor-side patient database system for medical records & consultation notes.</li>
          <li>Appointment scheduling & direct doctor-patient messaging.</li>
          <li>Deployed on GitHub with clean, documented codebase.</li>
          <li>Secured 5th Place at Anna University Hackathon!</li>
        </ul>
      `
    },
    "medbill": {
      title: "MedBill Pro — Pharmacy Billing System",
      body: `
        <span class="card-badge">MOBILE-FIRST WEB APP</span>
        <p style="margin-top:8px;">A mobile-first pharmacy billing system enabling pharmacists to generate bills without a PC.</p>
        <hr style="margin:14px 0; border:0; border-top:1px solid #FFE1E8;">
        <h4>Features:</h4>
        <ul style="padding-left:20px; font-size:13px; line-height:1.6;">
          <li>Integrated WhatsApp-based digital invoice sharing.</li>
          <li>Inventory management with low-stock alerts.</li>
          <li>Payment tracking (Cash, G-Pay, UPI).</li>
          <li>Sales analytics dashboard for daily & monthly reports.</li>
        </ul>
      `
    },
    "automation": {
      title: "n8n Workflow Automation — Telegram System",
      body: `
        <span class="card-badge">N8N + TELEGRAM BOT API</span>
        <p style="margin-top:8px;">Automation workflow integrating a Telegram chatbot for bulk email campaigns.</p>
        <hr style="margin:14px 0; border:0; border-top:1px solid #FFE1E8;">
        <h4>Workflow Architecture:</h4>
        <ul style="padding-left:20px; font-size:13px; line-height:1.6;">
          <li>Trigger-based pipelines to automate message dispatching.</li>
          <li>Configured multi-step workflows with conditional logic & error handling.</li>
        </ul>
      `
    },
    "education": {
      title: "Education Credentials",
      body: `
        <h4>Sri Sairam Institute of Technology</h4>
        <p>B.Tech in Artificial Intelligence & Data Science (2nd Year)</p>
        <p><strong>CGPA:</strong> 8.4 / 10 | Chennai, India</p>
        <hr style="margin:14px 0; border:0; border-top:1px solid #FFE1E8;">
        <h4>Vels Vidyashram Senior Secondary School</h4>
        <p>HSC (12th Standard) — CBSE</p>
        <p><strong>Score:</strong> 73.5% | Cutoff: 147</p>
      `
    },
    "contact": {
      title: "Contact & Social Links",
      body: `
        <p><strong>Email:</strong> <a href="mailto:${emailAddr}" style="color:var(--palette-coral); font-weight:600;">${emailAddr}</a></p>
        <p style="margin-top:10px;"><strong>Phone:</strong> <a href="tel:+916369557647" style="color:var(--palette-coral); font-weight:600;">${phoneNum}</a></p>
        <p style="margin-top:10px;"><strong>GitHub:</strong> <a href="${githubURL}" target="_blank" style="color:var(--palette-coral); font-weight:600;">github.com/rj4349303-arch</a></p>
        <p style="margin-top:10px;"><strong>LinkedIn:</strong> <a href="${linkedinURL}" target="_blank" style="color:var(--palette-coral); font-weight:600;">Rahul J on LinkedIn</a></p>
      `
    }
  };

  // --- Message Renderer ---
  function appendMessage(text, isUser = false, htmlExtra = '') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-msg' : 'bot-msg');

    if (!isUser) {
      msgDiv.innerHTML = `
        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-content">
          <p>${formatMarkdown(text)}</p>
          ${htmlExtra}
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="msg-content">
          <p>${escapeHTML(text)}</p>
        </div>
      `;
    }

    chatStream.appendChild(msgDiv);
    chatStream.scrollTop = chatStream.scrollHeight;

    // Attach drawer button click listeners
    msgDiv.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const detailKey = btn.getAttribute('data-detail');
        openDrawer(detailKey);
      });
    });

    // Attach resume modal button click listeners
    msgDiv.querySelectorAll('.open-resume-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        openResumeModal();
      });
    });

    // Attach prompt-trigger suggestion buttons inside bot messages
    msgDiv.querySelectorAll('.prompt-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        processUserQuery(prompt);
      });
    });
  }

  // --- Typing Indicator ---
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-msg');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-content">
        <p><i class="fa-solid fa-ellipsis fa-bounce"></i> Searching Resume Data...</p>
      </div>
    `;
    chatStream.appendChild(typingDiv);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function removeTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  // --- Process User Query with Keyword RAG Matching ---
  function processUserQuery(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    appendMessage(trimmed, true);
    mainChatInput.value = '';

    showTyping();

    setTimeout(() => {
      removeTyping();
      const lower = trimmed.toLowerCase();
      let bestMatch = null;

      // Scan document knowledge base keywords
      for (const key in documentKnowledgeBase) {
        const entry = documentKnowledgeBase[key];
        if (entry.keywords.some(kw => lower.includes(kw))) {
          bestMatch = entry;
          break;
        }
      }

      if (bestMatch) {
        appendMessage(bestMatch.text, false, bestMatch.html);
      } else {
        appendMessage(
          `🤖 I searched Rahul's document data for: "${escapeHTML(trimmed)}". You can ask about his **projects** (*Nalam, MedBill Pro, n8n Automation*), **technical skills** (*React, Python, MongoDB*), **education** (*Sri Sairam Tech, CGPA: 8.4*), **achievements** (*Anna University Hackathon 5th place*), or **resume**.`,
          false,
          ''
        );
      }
    }, 600);
  }

  // --- Full-Screen Resume Modal Functions ---
  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
    }
  }

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', openResumeModal);
  }

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // --- Web Speech API Voice Recognition ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (micBtn) {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      let isListening = false;

      micBtn.addEventListener('click', () => {
        if (!isListening) {
          try {
            recognition.start();
            isListening = true;
            micBtn.classList.add('mic-listening');
            micBtn.setAttribute('title', 'Listening... Speak now!');
            micBtn.innerHTML = '<i class="fa-solid fa-microphone-lines fa-pulse text-pink"></i>';
          } catch (err) {
            console.error('Speech recognition error:', err);
          }
        } else {
          recognition.stop();
        }
      });

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        if (spokenText) {
          mainChatInput.value = spokenText;
          processUserQuery(spokenText);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        stopListeningState();
        if (event.error === 'not-allowed') {
          alert('🎤 Microphone permission was denied. Please allow microphone access in your browser to use voice commands.');
        }
      };

      recognition.onend = () => {
        stopListeningState();
      };

      function stopListeningState() {
        isListening = false;
        micBtn.classList.remove('mic-listening');
        micBtn.setAttribute('title', 'Voice Input');
        micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      }

    } else {
      micBtn.addEventListener('click', () => {
        const spokenFallback = prompt("🎤 Web Speech API is not available in your browser. Type your voice query below:");
        if (spokenFallback) {
          processUserQuery(spokenFallback);
        }
      });
    }
  }

  // --- Drawer Functions ---
  function openDrawer(key) {
    const spec = drawerSpecs[key] || drawerSpecs["about"];
    drawerTitle.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${spec.title}`;
    drawerBody.innerHTML = spec.body;
    detailDrawer.classList.add('open');
  }

  closeDrawerBtn.addEventListener('click', () => {
    detailDrawer.classList.remove('open');
  });

  // --- Event Listeners ---
  mainChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processUserQuery(mainChatInput.value);
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      processUserQuery(prompt);
    });
  });

  shortcutButtons.forEach(item => {
    item.addEventListener('click', () => {
      const topic = item.getAttribute('data-topic');
      const data = documentKnowledgeBase[topic];
      if (data) {
        appendMessage(`Show ${topic}`, true);
        showTyping();
        setTimeout(() => {
          removeTyping();
          appendMessage(data.text, false, data.html);
        }, 500);
      }
    });
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatStream.innerHTML = `
        <div class="message bot-msg welcome-card-msg">
          <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="msg-content">
            <div class="welcome-banner">
              <span class="welcome-tag">✨ Chat Reset Completed</span>
              <h2>Hello again! How can I assist you? 🤖</h2>
              <p>Ask me about Rahul's Projects, Technical Skills, Education, or Contact Info.</p>
            </div>
          </div>
        </div>
      `;
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.innerHTML = soundEnabled ? 
        '<i class="fa-solid fa-volume-high"></i>' : 
        '<i class="fa-solid fa-volume-xmark"></i>';
    });
  }

  if (headerConnectBtn) {
    headerConnectBtn.addEventListener('click', () => {
      processUserQuery("How can I contact him?");
    });
  }

  // --- Helpers ---
  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--palette-coral); font-weight:600;">$1</a>')
      .replace(/\n/g, '<br>');
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

});
