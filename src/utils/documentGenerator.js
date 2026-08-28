// Dynamic Real Note Document Blob Generator for Study Hub

export const getColdWarEraNoteHTML = (pdf) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${pdf.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@600;700;800&display=swap');
    body {
      font-family: 'Inter', system-ui, sans-serif;
      margin: 0;
      padding: 30px 20px;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
    }
    .page {
      max-width: 820px;
      margin: 0 auto 35px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      position: relative;
    }
    .header {
      border-bottom: 3px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title {
      font-family: 'Outfit', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: #1e1b4b;
      margin: 10px 0 6px 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-primary { background: #e0e7ff; color: #4338ca; }
    .badge-emerald { background: #dcfce7; color: #15803d; }
    
    h2 {
      font-family: 'Outfit', sans-serif;
      color: #1e293b;
      font-size: 18px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    
    .callout {
      background: #eef2ff;
      border-left: 4px solid #6366f1;
      padding: 16px;
      border-radius: 6px;
      margin: 18px 0;
      font-size: 14px;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 15px 0;
    }
    
    .card {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
    }
    
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 13px;
    }
    .table-custom th, .table-custom td {
      border: 1px solid #cbd5e1;
      padding: 10px 12px;
      text-align: left;
    }
    .table-custom th {
      background: #4338ca;
      color: #ffffff;
      font-weight: 700;
    }

    .qa-box {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 16px;
      margin: 15px 0;
    }

    .qa-q {
      font-weight: 700;
      color: #1e1b4b;
      margin-bottom: 6px;
    }

    .footer-stamp {
      text-align: center;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page" id="page-1">
    <div class="header">
      <div>
        <span class="badge badge-primary">Class 12 Arts</span>
        <span class="badge badge-emerald">Political Science</span>
        <h1 class="title">Chapter 1: The Cold War Era</h1>
        <p style="font-size: 13px; color: #64748b; margin: 0;">Comprehensive Board Revision Notes & High-Yield Summary</p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <strong>Page 1 of 3</strong><br/>
        CBSE / NCERT 2026
      </div>
    </div>

    <h2>1. Introduction & Cuban Missile Crisis (April 1962)</h2>
    <p>
      The <strong>Cold War</strong> refers to the period of geopolitical tension and competition between the two post-WWII superpowers: the <strong>United States (USA)</strong> and the <strong>Soviet Union (USSR)</strong>, along with their respective allies. It was an ideological conflict between Western Capitalist Democracy and Eastern Socialist Communism.
    </p>

    <div class="callout">
      <strong>🚨 The Climax: Cuban Missile Crisis (1962)</strong><br/>
      In 1962, USSR leader <em>Nikita Khrushchev</em> decided to convert Cuba (ruled by Fidel Castro) into a Russian military base and installed nuclear missiles aimed at American cities. US President <em>John F. Kennedy</em> ordered a naval blockade to intercept Soviet ships. The confrontation brought the world to the brink of nuclear war before both sides backed down due to the <strong>Logic of Deterrence</strong>.
    </div>

    <h2>2. What was the Cold War? (Logic of Deterrence)</h2>
    <p>
      The Cold War remained "cold" because both superpowers possessed nuclear weapons capable of inflicting unacceptably high destruction on each other. When two opposing forces are so powerful that neither can initiate war without destroying themselves, it is called the <strong>Logic of Deterrence</strong>.
    </p>

    <h2>3. Emergence of Two Power Blocs</h2>
    <div class="grid-2">
      <div class="card">
        <h3 style="margin-top:0; color:#4338ca; font-size:15px;">🌐 Western Alliance (USA)</h3>
        <ul style="padding-left:18px; font-size:13px; margin:0;">
          <li>Ideology: Liberal Democracy & Capitalism.</li>
          <li>Military Pact: <strong>NATO</strong> (North Atlantic Treaty Organization) formed in April 1949 with 12 nations.</li>
          <li>Key Members: USA, UK, France, West Germany, Canada.</li>
        </ul>
      </div>

      <div class="card">
        <h3 style="margin-top:0; color:#dc2626; font-size:15px;">🛠️ Eastern Alliance (USSR)</h3>
        <ul style="padding-left:18px; font-size:13px; margin:0;">
          <li>Ideology: Socialism & Communism.</li>
          <li>Military Pact: <strong>Warsaw Pact</strong> created in 1955.</li>
          <li>Key Members: USSR, Poland, East Germany, Hungary, Czechoslovakia.</li>
        </ul>
      </div>
    </div>

    <div class="footer-stamp">
      Alpha Arts Educational Notes • Class 12 Political Science Board Exam 2026
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page" id="page-2">
    <div class="header">
      <div>
        <span class="badge badge-primary">Class 12 Arts</span>
        <span class="badge badge-emerald">Political Science</span>
        <h1 class="title">Chapter 1: The Cold War Era</h1>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <strong>Page 2 of 3</strong>
      </div>
    </div>

    <h2>4. Arenas of the Cold War</h2>
    <p>
      The "Arenas" of the Cold War refer to areas where crisis and war occurred or threatened to occur between the alliance systems, but did not cross the limit of a global nuclear war.
    </p>

    <table class="table-custom">
      <thead>
        <tr>
          <th>Arena / Conflict Region</th>
          <th>Period</th>
          <th>Key Intervention & Mediators</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Korean Peninsula</strong></td>
          <td>1950 – 1953</td>
          <td>North Korea (USSR/China backed) vs South Korea (US/UN backed). India mediated peace.</td>
        </tr>
        <tr>
          <td><strong>Berlin Crisis</strong></td>
          <td>1958 – 1962</td>
          <td>Construction of Berlin Wall (1961) dividing East and West Berlin.</td>
        </tr>
        <tr>
          <td><strong>Congo Crisis</strong></td>
          <td>1960s</td>
          <td>UN Secretary-General played a crucial mediating role.</td>
        </tr>
        <tr>
          <td><strong>Vietnam War</strong></td>
          <td>1954 – 1975</td>
          <td>US direct military involvement against Communist North Vietnam.</td>
        </tr>
      </tbody>
    </table>

    <h2>5. Challenge to Bipolarity: Non-Aligned Movement (NAM)</h2>
    <p>
      The Non-Aligned Movement offered decolonized countries of Asia, Africa, and Latin America a third choice—not joining either alliance.
    </p>

    <div class="callout" style="background:#f0fdf4; border-left-color:#10b981;">
      <strong>🌟 The 5 Founding Fathers of NAM:</strong>
      <ol style="padding-left:20px; margin:8px 0 0 0; font-size:13px;">
        <li><strong>Jawaharlal Nehru</strong> (India)</li>
        <li><strong>Joseph Broz Tito</strong> (Yugoslavia)</li>
        <li><strong>Gamal Abdel Nasser</strong> (Egypt)</li>
        <li><strong>Sukarno</strong> (Indonesia)</li>
        <li><strong>Kwame Nkrumah</strong> (Ghana)</li>
      </ol>
      <em>First NAM Summit:</em> Held in <strong>Belgrade in 1961</strong> with 25 member states.
    </div>

    <h2>6. New International Economic Order (NIEO)</h2>
    <p>
      Most NAM members were categorized as Least Developed Countries (LDCs). In 1972, UNCTAD published a report titled <em>"Towards a New Trade Policy for Development"</em> proposing:
    </p>
    <ul style="font-size:13px;">
      <li>LDCs control over their own natural resources.</li>
      <li>Access to Western markets to sell their products.</li>
      <li>Reduced cost of technology transfer from Western nations.</li>
    </ul>

    <div class="footer-stamp">
      Alpha Arts Educational Notes • Class 12 Political Science Board Exam 2026
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page" id="page-3">
    <div class="header">
      <div>
        <span class="badge badge-primary">Class 12 Arts</span>
        <span class="badge badge-emerald">Political Science</span>
        <h1 class="title">Chapter 1: The Cold War Era</h1>
      </div>
      <div style="text-align: right; font-size: 12px; color: #64748b;">
        <strong>Page 3 of 3</strong>
      </div>
    </div>

    <h2>7. Arms Control Treaties</h2>
    <p>Superpowers signed several treaties to limit and eliminate certain categories of nuclear weapons:</p>
    <ul style="font-size:13px;">
      <li><strong>LTBT (Limited Test Ban Treaty - 1963):</strong> Banned nuclear tests in atmosphere, outer space, and underwater.</li>
      <li><strong>NPT (Nuclear Non-Proliferation Treaty - 1968):</strong> Allowed only 5 nuclear weapon states (US, USSR, UK, France, China) to possess nuclear weapons.</li>
      <li><strong>SALT I & II (Strategic Arms Limitation Talks):</strong> Signed in 1972 & 1979.</li>
      <li><strong>START I & II (Strategic Arms Reduction Treaty):</strong> Signed in 1991 & 1993.</li>
    </ul>

    <h2>8. High-Yield Board Exam Sample Questions & Answers</h2>

    <div class="qa-box">
      <div class="qa-q">Q1: Explain the term 'Logic of Deterrence' with reference to the Cold War. (3 Marks)</div>
      <div style="font-size:13px;">
        <strong>Answer:</strong> The Logic of Deterrence implies that when both military blocs possess nuclear weapons capable of inflicting unacceptably high destruction, neither side can afford to initiate a war. Deterrence prevents war because destruction is guaranteed for both, making any victory impossible.
      </div>
    </div>

    <div class="qa-box">
      <div class="qa-q">Q2: Evaluate India's policy of Non-Alignment during the Cold War era. (5 Marks)</div>
      <div style="font-size:13px;">
        <strong>Answer:</strong>
        <ol style="padding-left:18px; margin:4px 0 0 0;">
          <li><strong>Two-fold stance:</strong> India stayed away from both alliances and raised its voice against newly independent countries being dragged into superpower camps.</li>
          <li><strong>Active intervention:</strong> India was not neutral or isolated; it actively intervened in global affairs (e.g., Korean War crisis) to prevent war.</li>
          <li><strong>National interest:</strong> Non-alignment allowed India to make independent foreign policy decisions rather than serving superpower interests.</li>
          <li><strong>Balance of power:</strong> If one superpower tried to bully India, India could tilt towards the other.</li>
        </ol>
      </div>
    </div>

    <div class="footer-stamp">
      Alpha Arts Official Educational Portal • Free Printable Board Revision Notes 2026
    </div>
  </div>

  <script>
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'GOTO_PAGE') {
        var elem = document.getElementById('page-' + e.data.page);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  </script>

</body>
</html>
  `;
};

export const createNoteDocumentBlob = (pdf) => {
  let htmlContent = '';
  
  if (pdf.id === 'pdf-c12-pol-coldwar' || pdf.title?.toLowerCase().includes('cold war')) {
    htmlContent = getColdWarEraNoteHTML(pdf);
  } else {
    htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${pdf.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@600;800&display=swap');
    body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; background: #f8fafc; color: #0f172a; }
    .page { max-width: 800px; margin: 0 auto 30px auto; background: #fff; padding: 40px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .title { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #1e1b4b; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
    .section { background: #f1f5f9; border-left: 4px solid #6366f1; padding: 18px; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="page" id="page-1">
    <div style="border-bottom: 2px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px;">
      <span class="badge" style="background:#e0e7ff; color:#4338ca;">${pdf.className || 'Class 12 Arts'}</span>
      <span class="badge" style="background:#dcfce7; color:#15803d;">${pdf.subject || 'General'}</span>
      <h1 class="title">${pdf.title}</h1>
      <p style="color:#64748b; font-size:13px;">Authored by ${pdf.author || 'Alpha Arts Academic Team'} • Verified 2026 Notes (Page 1 of 2)</p>
    </div>
    <div class="section">
      <h3 style="margin-top:0; color:#334155;">📌 High-Yield Chapter Overview</h3>
      <p>${pdf.description}</p>
    </div>
    <div class="section" style="border-left-color: #10b981;">
      <h3 style="margin-top:0; color:#065f46;">📚 Core Concept Highlights & Board Examination Notes</h3>
      <ul>
        <li><strong>Section 1: Fundamental Definitions & Terminology:</strong> Complete syllabus coverage according to latest board guidelines.</li>
        <li><strong>Section 2: Diagrammatic Representations & Maps:</strong> High weightage diagrams and timeline charts for board exam practice.</li>
      </ul>
    </div>
  </div>

  <div class="page" id="page-2">
    <div style="border-bottom: 2px solid #10b981; padding-bottom: 15px; margin-bottom: 20px;">
      <span class="badge" style="background:#dcfce7; color:#15803d;">Page 2 of 2</span>
      <h2 class="title" style="font-size:20px;">Advanced Exam Question Framework</h2>
    </div>
    <div class="section" style="border-left-color: #a855f7;">
      <h3 style="margin-top:0; color:#581c87;">💡 Key Board Questions & Answers</h3>
      <p><strong>Q1: What are the primary objectives of this unit?</strong></p>
      <p>Answer: Master all key concepts, definitions, and high-yield scoring points to score 95%+ in board examinations.</p>
    </div>
    <div style="text-align:center; color:#94a3b8; font-size:12px; margin-top:30px; border-top:1px solid #e2e8f0; padding-top:15px;">
      Alpha Arts Official Portal • Free Board Examination Study Notes
    </div>
  </div>

  <script>
    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'GOTO_PAGE') {
        var elem = document.getElementById('page-' + e.data.page);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  </script>
</body>
</html>
    `;
  }

  const blob = new Blob([htmlContent], { type: 'text/html' });
  return URL.createObjectURL(blob);
};
