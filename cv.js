const engineContent = {
  source: {
    title: '20 ans de terrain',
    text: 'Rigueur, procédures, coordination et prise de décision dans des environnements sensibles.'
  },
  analysis: {
    title: 'Analyse',
    text: 'Observer une situation, distinguer les priorités et structurer une réponse claire avant d’agir.'
  },
  service: {
    title: 'Sens du service',
    text: 'Comprendre l’utilisateur, transmettre les bonnes informations et conserver une logique de solution concrète.'
  },
  core: {
    title: 'No-Code + IA',
    text: 'Transformer un processus en workflow, connecter les outils et intégrer l’intelligence artificielle lorsqu’elle apporte une vraie valeur.'
  },
  'output-a': {
    title: 'Solutions',
    text: 'Des solutions digitales simples à utiliser, testables rapidement et orientées vers un besoin métier identifiable.'
  },
  'output-b': {
    title: 'Adoption',
    text: 'Une automatisation n’est utile que si les personnes qui travaillent avec elle la comprennent et l’adoptent.'
  }
};

const engineNodes = document.querySelectorAll('.engine-node');
const engineInspector = document.querySelector('#engineInspector');
engineNodes.forEach((node) => {
  node.addEventListener('click', () => {
    engineNodes.forEach((item) => item.classList.remove('active'));
    node.classList.add('active');
    const data = engineContent[node.dataset.engine];
    if (!engineInspector || !data) return;
    engineInspector.innerHTML = `<small>MODULE ACTIF</small><strong>${data.title}</strong><p>${data.text}</p>`;
  });
});

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-map');
skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    skillTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    skillPanels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelector(`[data-panel="${tab.dataset.skill}"]`)?.classList.add('active');
  });
});

const careerData = {
  transition: {
    years: '2023 — 2026', state: 'transition', title: 'Montée en compétences · autodidacte', location: 'Bruxelles → Paris',
    points: [
      'Accompagnement de proches dans leurs retours vers l’autonomie.',
      'Aide à l’utilisation de l’IA auprès de proches, de résidents et de personnel en EHPAD.',
      'Évolution professionnelle progressive vers les métiers de l’IT, puis du No-Code, de l’automatisation et de l’IA appliquée.'
    ],
    tags: ['Résilience', 'Accompagnement', 'Veille professionnelle']
  },
  elia: {
    years: '2017 — 2023', state: 'opérationnel', title: 'Chef de Poste de gardiennage', location: 'Elia · Bruxelles',
    points: [
      'Surveillance par caméras, systèmes d’intrusion et contrôle visuel.',
      'Supervision des agents, gestion des accès et coordination des interventions.',
      'Gestion des procédures et retour client.',
      'Participation au déploiement d’une main courante électronique.',
      'Remplacement d’une ronde extérieure à risque par une caméra avec détection de mouvement.'
    ],
    tags: ['Coordination', 'Procédures', 'Digitalisation']
  },
  g4s: {
    years: '2014 — 2017', state: 'terrain', title: 'Agent de sûreté polyvalent', location: 'G4S · Bruxelles',
    points: [
      'Missions en centres commerciaux, hôpitaux et gares.',
      'Dissuasion et intervention aux urgences hospitalières.',
      'Rondes d’ouverture et de fermeture.',
      'Plus de 100 contrôles positifs pour vol de marchandise.',
      'Intervention physique ayant permis d’éviter une agression sur du personnel médical.'
    ],
    tags: ['Observation', 'Intervention', 'Service']
  },
  samsic: {
    years: '2012 — 2014', state: 'sécurité', title: 'SSIAP 1 & SSIAP 2', location: 'Samsic Sécurité · Levallois-Perret',
    points: [
      'Gestion du poste de sécurité.',
      'Relais entre le client et la hiérarchie.',
      'Assistance à personne.',
      'Participation à l’ouverture au public en octobre 2012.'
    ],
    tags: ['Management', 'Relation client', 'Assistance']
  },
  goron: {
    years: '2006 — 2011', state: 'encadrement', title: 'SSIAP 1 & SSIAP 2', location: 'Goron S.A / Lancry Protection Sécurité · Groupama Noisy-le-Grand / Paris 8',
    points: [
      'Assistance directe du responsable de sécurité.',
      'Intérim de son poste lors de ses absences sur le site de Noisy-le-Grand.',
      'Gestion des plannings.',
      'Gestion et coordination d’une équipe de sécurité incendie et sûreté de plus de 10 agents.'
    ],
    tags: ['Encadrement', 'Planification', 'Responsabilité']
  }
};

const careerButtons = document.querySelectorAll('.career-step');
const careerDetail = document.querySelector('#careerDetail');
careerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    careerButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const data = careerData[button.dataset.career];
    if (!careerDetail || !data) return;
    careerDetail.animate([{ opacity: .55, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
    careerDetail.innerHTML = `
      <div class="career-detail-top">
        <div><small>ÉTAPE ACTIVE</small><span>${data.years}</span></div>
        <span class="career-state"><i></i> ${data.state}</span>
      </div>
      <h3>${data.title}</h3>
      <p class="career-location">${data.location}</p>
      <ul>${data.points.map((point) => `<li>${point}</li>`).join('')}</ul>
      <div class="career-tags">${data.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    `;
  });
});

const focusButton = document.querySelector('#focusMode');
focusButton?.addEventListener('click', () => {
  const active = document.body.classList.toggle('synth');
  focusButton.textContent = active ? 'Mode complet' : 'Mode synthèse';
});
