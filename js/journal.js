(() => {
  const MOODS = [
    { id: "tenang", label: "Tenang" },
    { id: "syukur", label: "Syukur" },
    { id: "renung", label: "Renung" },
    { id: "fokus", label: "Fokus" },
    { id: "lega", label: "Lega" },
  ];

  const ICONS = {
    today: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
    journal: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V4z"/><path d="M8 4v16"/></svg>',
    calendar: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    user: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="9" r="3.2"/><path d="M6 19c1.2-3 3.2-4.5 6-4.5S16.8 16 18 19"/></svg>',
    search: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/></svg>',
    plus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 19c8-1 13-8 14-15-7 1-14 6-14 15z"/><path d="M5 19c3-4 8-7 14-8"/></svg>',
    home: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="m4 11 8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>',
    chev: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>',
  };

  const seed = [
    {
      id: "e1",
      date: "2026-08-31",
      mood: "tenang",
      title: "Pagi yang tidak terburu-buru",
      body: "Kopi masih hangat ketika cahaya pertama jatuh di lantai kayu. Tidak ada yang harus diselesaikan sebelum jam delapan. Aku menulis ini supaya nanti, saat minggu terasa cepat, aku ingat bahwa pagi bisa selebar ini.\n\nDi luar, seseorang menyiram tanaman. Bunyinya pelan. Cukup untuk menahan tangan agar tidak langsung membuka layar.",
    },
    {
      id: "e2",
      date: "2026-08-30",
      mood: "syukur",
      title: "Dapur, jam empat sore",
      body: "Nasi goreng dari sisa semalam. Bau bawang dan wajan yang sudah akrab. Ada yang menenangkan dari memasak tanpa resep — hanya tangan, dan apa yang ada di rak.\n\nAku makan di lantai, dekat jendela. Angin membawa bau tanah basah. Syukur, hari ini, bentuknya sederhana.",
    },
    {
      id: "e3",
      date: "2026-08-28",
      mood: "renung",
      title: "Yang tidak jadi kukatakan",
      body: "Beberapa kalimat tertahan di tenggorokan sepanjang hari. Bukan karena takut, lebih karena belum menemukan bentuknya. Mungkin tulisan ini cukup, untuk sekarang.\n\nAda kelegaan dalam menunda. Tidak semua hal harus selesai di hari yang sama.",
    },
    {
      id: "e4",
      date: "2026-08-26",
      mood: "lega",
      title: "Jalan pulang lewat sawah",
      body: "Angin dari barat, langit warnanya spring water. Sepeda orang lain lebih cepat. Aku tidak kejar.\n\nDi pematang ada jejak sepatu yang sudah mengering. Aku ikutin sebentar, lalu belok. Pulang terasa lebih dekat kalau tidak terburu-buru.",
    },
    {
      id: "e5",
      date: "2026-08-24",
      mood: "fokus",
      title: "Meja kerja, malam",
      body: "Satu bug yang mengganggu sejak kemarin akhirnya ketemu di baris yang kulewati tiga kali. Lampu meja, gelas kosong, dan rasa yang hanya muncul kalau masalahnya selesai dengan bersih.\n\nAku tutup laptop sebelum jam sepuluh. Itu kemenangan kecil yang ingin kusimpan.",
    },
  ];

  const state = {
    entries: seed.map((e) => ({ ...e })),
    selectedId: "e1",
    desktopView: "journal",
    mobileScreen: "home",
    query: "",
    calDate: "2026-08-31",
    saved: true,
    mode: "gallery",
  };

  const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  function parseDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function formatLong(iso) {
    const dt = parseDate(iso);
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][dt.getDay()];
    return `${hari}, ${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
  }

  function formatShort(iso) {
    const dt = parseDate(iso);
    return `${dt.getDate()} ${MONTHS[dt.getMonth()].slice(0, 3)}`;
  }

  function words(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  function selected() {
    return state.entries.find((e) => e.id === state.selectedId) || state.entries[0];
  }

  function filtered() {
    const q = state.query.trim().toLowerCase();
    return state.entries.filter((e) => {
      if (!q) return true;
      return (e.title + " " + e.body + " " + e.mood).toLowerCase().includes(q);
    });
  }

  function moodLabel(id) {
    return MOODS.find((m) => m.id === id)?.label || id;
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function brand() {
    return `
      <div class="brand">
        <span class="brand-mark">${ICONS.leaf}</span>
        <span>
          <strong>Hening</strong>
          <small>Jurnal harian</small>
        </span>
      </div>`;
  }

  function sidebar() {
    const items = [
      ["today", "Hari ini", ICONS.today],
      ["journal", "Jurnal", ICONS.journal],
      ["calendar", "Kalender", ICONS.calendar],
    ];
    return `
      <aside class="sidebar">
        ${brand()}
        <nav class="side-nav">
          ${items
            .map(
              ([id, label, icon]) => `
            <button type="button" data-desk-view="${id}" class="${state.desktopView === id ? "is-on" : ""}">
              ${icon}${label}
            </button>`
            )
            .join("")}
        </nav>
        <div class="side-spacer"></div>
        <div class="streak-card">
          <p>Beruntun</p>
          <strong>12 hari</strong>
        </div>
        <div class="side-user">
          <span class="avatar">IH</span>
          <span>
            <b>Ihda Husnayain</b>
            <span>Menulis di senja</span>
          </span>
        </div>
      </aside>`;
  }

  function topbar(title, sub, extra = "") {
    return `
      <div class="topbar">
        <div>
          <h2>${title}</h2>
          <p class="sub">${sub}</p>
        </div>
        <div style="display:flex;gap:.6rem;align-items:center">
          ${extra}
          <button class="btn btn-primary" type="button" data-action="new">${ICONS.plus} Tulis</button>
        </div>
      </div>`;
  }

  function entryList() {
    return `
      <div class="entry-list">
        ${filtered()
          .map((e) => {
            const on = e.id === state.selectedId ? "is-on" : "";
            return `
              <button type="button" class="entry-item ${on}" data-select="${e.id}">
                <div class="when"><span class="mood-dot mood-${e.mood}"></span>${formatShort(e.date)} · ${moodLabel(e.mood)}</div>
                <h3>${esc(e.title)}</h3>
                <p>${esc(e.body)}</p>
              </button>`;
          })
          .join("")}
      </div>`;
  }

  function moodChips(current) {
    return `
      <div class="moods">
        ${MOODS.map(
          (m) =>
            `<button type="button" class="chip ${m.id === current ? "is-on" : ""}" data-mood="${m.id}">${m.label}</button>`
        ).join("")}
      </div>`;
  }

  function editorPane() {
    const e = selected();
    if (!e) return `<div class="editor"><p>Belum ada entri.</p></div>`;
    return `
      <div class="editor">
        <div class="editor-meta">
          <span>${formatLong(e.date)}</span>
          <span><span class="save-dot"></span>${state.saved ? "Tersimpan" : "Menyimpan…"}</span>
        </div>
        ${moodChips(e.mood)}
        <input class="editor-title" data-field="title" value="${esc(e.title)}" />
        <textarea class="editor-body" data-field="body">${esc(e.body)}</textarea>
        <div class="editor-foot">
          <span>${words(e.body)} kata</span>
          <span>Kertas linen · Spring Water</span>
        </div>
      </div>`;
  }

  function todayView() {
    const recent = state.entries.slice(0, 3);
    return `
      <div class="dash">
        <div class="dash-hero">
          <article class="panel panel-navy">
            <p class="kicker">Prompt hari ini</p>
            <p class="quote">Apa yang ingin kamu simpan dari hari ini — bukan yang harus diselesaikan?</p>
            <div style="margin-top:1.1rem">
              <button class="btn btn-wood" type="button" data-action="new">Tulis jawaban</button>
            </div>
          </article>
          <article class="panel">
            <p class="kicker">Senin ini</p>
            <p class="quote" style="font-size:1.25rem">Lembut. Cukup. Tidak perlu lebih cepat.</p>
            <p style="margin-top:.8rem;color:var(--tide);font-size:.88rem">Cuaca dalam: tenang · 3 entri minggu ini</p>
          </article>
        </div>
        <div class="stats">
          <div class="stat"><b>12</b><span>hari beruntun</span></div>
          <div class="stat"><b>28</b><span>entri Agustus</span></div>
          <div class="stat"><b>6.4k</b><span>kata bulan ini</span></div>
          <div class="stat"><b>Tenang</b><span>suasana dominan</span></div>
        </div>
        <p class="kicker" style="margin:1.1rem 0 .7rem">Baru-baru ini</p>
        <div class="recent-row">
          ${recent
            .map(
              (e) => `
            <button type="button" class="mini-card" data-select="${e.id}" data-open-journal>
              <div class="when" style="font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--teal);font-weight:700">
                <span class="mood-dot mood-${e.mood}"></span>${formatShort(e.date)}
              </div>
              <h3>${esc(e.title)}</h3>
              <p>${esc(e.body)}</p>
            </button>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function calendarView() {
    const year = 2026;
    const month = 7;
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = first - 1; i >= 0; i -= 1) {
      cells.push({ d: prevDays - i, mute: true, iso: null });
    }
    for (let d = 1; d <= days; d += 1) {
      const iso = `2026-08-${String(d).padStart(2, "0")}`;
      cells.push({ d, mute: false, iso });
    }
    while (cells.length % 7) cells.push({ d: cells.length, mute: true, iso: null });

    const dayEntries = state.entries.filter((e) => e.date === state.calDate);

    return `
      <div class="cal-wrap">
        <div class="panel">
          <p class="kicker">Agustus 2026</p>
          <h3 style="font-family:var(--font-serif);font-weight:500;font-size:1.5rem;margin-bottom:.8rem">Kalender</h3>
          <div class="cal-grid">
            ${DAYS.map((d) => `<div class="cal-dow">${d}</div>`).join("")}
            ${cells
              .map((c) => {
                if (c.mute || !c.iso) return `<button type="button" class="cal-day is-mute" disabled>${c.d}</button>`;
                const has = state.entries.some((e) => e.date === c.iso);
                const on = state.calDate === c.iso ? "is-on" : "";
                const today = c.iso === "2026-08-31" ? "is-today" : "";
                return `<button type="button" class="cal-day ${on} ${today} ${has ? "has-entry" : ""}" data-cal="${c.iso}">${c.d}</button>`;
              })
              .join("")}
          </div>
        </div>
        <div>
          <p class="kicker">${formatLong(state.calDate)}</p>
          ${
            dayEntries.length
              ? dayEntries
                  .map(
                    (e) => `
                <button type="button" class="mini-card" style="width:100%;margin-bottom:.65rem" data-select="${e.id}" data-open-journal>
                  <div style="font-size:.72rem;color:var(--teal);font-weight:700">${moodLabel(e.mood)}</div>
                  <h3>${esc(e.title)}</h3>
                  <p>${esc(e.body)}</p>
                </button>`
                  )
                  .join("")
              : `<div class="panel"><p style="color:var(--tide)">Belum ada catatan di hari ini.</p>
                 <button class="btn btn-primary" style="margin-top:1rem" data-action="new" type="button">Tulis entri</button></div>`
          }
        </div>
      </div>`;
  }

  function desktopApp() {
    const search = `
      <label class="search">${ICONS.search}
        <input type="search" placeholder="Cari catatan…" value="${esc(state.query)}" data-search />
      </label>`;

    let body = "";
    if (state.desktopView === "today") body = todayView();
    else if (state.desktopView === "calendar") body = calendarView();
    else {
      body = `<div class="split">${entryList()}${editorPane()}</div>`;
    }

    const titles = {
      today: ["Hari ini", "Senin, 31 Agustus 2026"],
      journal: ["Jurnal", `${state.entries.length} entri · linen & air`],
      calendar: ["Kalender", "Agustus 2026"],
    };
    const [t, s] = titles[state.desktopView];

    return `
      <div class="app app-desktop">
        ${sidebar()}
        <div class="workspace">
          ${topbar(t, s, state.desktopView === "journal" ? search : "")}
          ${body}
        </div>
      </div>`;
  }

  function weekRow() {
    const days = [
      ["S", "tenang", "2026-08-24"],
      ["S", "fokus", "2026-08-25"],
      ["R", "lega", "2026-08-26"],
      ["K", "", "2026-08-27"],
      ["J", "renung", "2026-08-28"],
      ["S", "", "2026-08-29"],
      ["M", "syukur", "2026-08-30"],
    ];
    return `
      <div class="week">
        ${days
          .map(
            ([label, mood, iso]) => `
          <button type="button" data-cal="${iso}" data-open-cal>
            <span class="orb ${mood ? `mood-${mood} is-on` : ""}"></span>
            ${label}
          </button>`
          )
          .join("")}
      </div>`;
  }

  function mobileHome() {
    return `
      <div class="m-status"><span>18:33</span><span>5G  ●●●</span></div>
      <div class="m-body">
        <div class="greet">
          <span>Selamat sore</span>
          <h2>Ihda</h2>
        </div>
        <article class="prompt">
          <p class="kicker">Prompt hari ini</p>
          <p>Apa yang ingin kamu simpan dari hari ini?</p>
          <button class="btn btn-wood" type="button" data-mobile-screen="write" data-action="new">Tulis sekarang</button>
        </article>
        ${weekRow()}
        <div class="m-section">
          <h3>Entri terbaru</h3>
          <span>Agustus</span>
        </div>
        ${state.entries
          .map(
            (e) => `
          <button type="button" class="m-card ${e.id === state.selectedId ? "is-on" : ""}" data-select="${e.id}" data-mobile-screen="write">
            <div class="when" style="font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:var(--teal);font-weight:700">
              <span class="mood-dot mood-${e.mood}"></span>${formatShort(e.date)} · ${moodLabel(e.mood)}
            </div>
            <h3>${esc(e.title)}</h3>
            <p>${esc(e.body)}</p>
          </button>`
          )
          .join("")}
      </div>`;
  }

  function mobileWrite() {
    const e = selected();
    return `
      <div class="m-write">
        <div class="m-status"><span>18:33</span><span>5G  ●●●</span></div>
        <div class="m-body">
          <div class="m-write-bar">
            <button type="button" data-mobile-screen="home" style="font-weight:700;color:var(--teal)">← Beranda</button>
            <span style="font-size:.78rem;color:var(--tide)"><span class="save-dot"></span>${state.saved ? "Tersimpan" : "Menyimpan…"}</span>
          </div>
          <p style="font-size:.82rem;color:var(--tide)">${formatLong(e.date)}</p>
          ${moodChips(e.mood)}
          <input class="editor-title" data-field="title" value="${esc(e.title)}" />
          <textarea class="editor-body" data-field="body">${esc(e.body)}</textarea>
          <div class="editor-foot">
            <span>${words(e.body)} kata</span>
            <span>Hening</span>
          </div>
        </div>
      </div>`;
  }

  function mobileCalendar() {
    const year = 2026;
    const month = 7;
    const first = new Date(year, month, 1).getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i += 1) cells.push(null);
    for (let d = 1; d <= daysIn; d += 1) {
      cells.push(`2026-08-${String(d).padStart(2, "0")}`);
    }
    return `
      <div class="m-status"><span>18:33</span><span>5G  ●●●</span></div>
      <div class="m-body">
        <div class="greet">
          <span>Kalender</span>
          <h2>Agustus</h2>
        </div>
        <div class="panel">
          <div class="cal-grid">
            ${DAYS.map((d) => `<div class="cal-dow">${d}</div>`).join("")}
            ${cells
              .map((iso) => {
                if (!iso) return `<span></span>`;
                const d = Number(iso.slice(-2));
                const has = state.entries.some((e) => e.date === iso);
                const today = iso === "2026-08-31" ? "is-today" : "";
                const on = state.calDate === iso ? "is-on" : "";
                return `<button type="button" class="cal-day ${today} ${on} ${has ? "has-entry" : ""}" data-cal="${iso}">${d}</button>`;
              })
              .join("")}
          </div>
        </div>
        <div class="m-section" style="margin-top:1.1rem"><h3>${formatShort(state.calDate)}</h3></div>
        ${
          state.entries
            .filter((e) => e.date === state.calDate)
            .map(
              (e) => `
            <button type="button" class="m-card" data-select="${e.id}" data-mobile-screen="write">
              <h3>${esc(e.title)}</h3>
              <p>${esc(e.body)}</p>
            </button>`
            )
            .join("") || `<p style="color:var(--tide)">Belum ada catatan.</p>`
        }
      </div>`;
  }

  function mobileProfile() {
    return `
      <div class="m-status"><span>18:33</span><span>5G  ●●●</span></div>
      <div class="m-body">
        <div class="profile-hero">
          <div class="avatar">IH</div>
          <h2>Ihda Husnayain</h2>
          <p>Menulis di senja · 12 hari beruntun</p>
        </div>
        <div class="stats" style="grid-template-columns:1fr 1fr 1fr">
          <div class="stat"><b>28</b><span>entri</span></div>
          <div class="stat"><b>6.4k</b><span>kata</span></div>
          <div class="stat"><b>5</b><span>suasana</span></div>
        </div>
        <div class="plist" style="margin-top:1rem">
          <div class="row">Kertas <span>Linen</span></div>
          <div class="row">Pengingat <span>20.00</span></div>
          <div class="row">Bahasa <span>Indonesia</span></div>
          <div class="row">Palet <span>Spring Water</span></div>
        </div>
      </div>`;
  }

  function tabbar() {
    const tabs = [
      ["home", "Beranda", ICONS.home],
      ["journal", "Jurnal", ICONS.journal],
      ["fab", "", ICONS.plus],
      ["calendar", "Kalender", ICONS.calendar],
      ["profile", "Saya", ICONS.user],
    ];
    const screen = state.mobileScreen === "write" ? "journal" : state.mobileScreen;
    return `
      <nav class="tabbar">
        ${tabs
          .map(([id, label, icon]) => {
            if (id === "fab") {
              return `<button type="button" class="fab" data-action="new" data-mobile-screen="write" aria-label="Tulis">${ICONS.plus}</button>`;
            }
            const map = id === "journal" ? "write" : id;
            return `<button type="button" class="${screen === id || (id === "journal" && state.mobileScreen === "write") ? "is-on" : ""}" data-mobile-screen="${map}">${icon}${label}</button>`;
          })
          .join("")}
      </nav>`;
  }

  function mobileApp() {
    let screen = "";
    if (state.mobileScreen === "write") screen = mobileWrite();
    else if (state.mobileScreen === "calendar") screen = mobileCalendar();
    else if (state.mobileScreen === "profile") screen = mobileProfile();
    else screen = mobileHome();

    const hideTab = state.mobileScreen === "write";
    return `
      <div class="app app-mobile">
        ${screen}
        ${hideTab ? "" : tabbar()}
      </div>`;
  }

  function bind(root) {
    if (!root) return;
    root.querySelectorAll("[data-desk-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.desktopView = btn.getAttribute("data-desk-view");
        render();
      });
    });
    root.querySelectorAll("[data-mobile-screen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mobileScreen = btn.getAttribute("data-mobile-screen");
        render();
      });
    });
    root.querySelectorAll("[data-select]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedId = btn.getAttribute("data-select");
        if (btn.hasAttribute("data-open-journal")) state.desktopView = "journal";
        render();
      });
    });
    root.querySelectorAll("[data-mood]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const e = selected();
        if (!e) return;
        e.mood = btn.getAttribute("data-mood");
        state.saved = true;
        render();
      });
    });
    root.querySelectorAll("[data-cal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.calDate = btn.getAttribute("data-cal");
        if (btn.hasAttribute("data-open-cal")) state.mobileScreen = "calendar";
        const hit = state.entries.find((e) => e.date === state.calDate);
        if (hit) state.selectedId = hit.id;
        render();
      });
    });
    root.querySelectorAll("[data-action='new']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = "n" + Date.now();
        state.entries.unshift({
          id,
          date: "2026-08-31",
          mood: "tenang",
          title: "Tanpa judul",
          body: "",
        });
        state.selectedId = id;
        state.desktopView = "journal";
        state.mobileScreen = "write";
        state.saved = true;
        render();
      });
    });
    root.querySelectorAll("[data-search]").forEach((input) => {
      input.addEventListener("input", () => {
        state.query = input.value;
        const list = root.querySelector(".entry-list");
        const pane = root.querySelector(".editor");
        if (!list || !pane) return;
        const wrap = list.parentElement;
        const html = entryList();
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        wrap.replaceChild(tmp.firstElementChild, list);
        wrap.querySelectorAll("[data-select]").forEach((btn) => {
          btn.addEventListener("click", () => {
            state.selectedId = btn.getAttribute("data-select");
            render();
          });
        });
      });
    });
    root.querySelectorAll("[data-field]").forEach((field) => {
      field.addEventListener("input", () => {
        const e = selected();
        if (!e) return;
        e[field.getAttribute("data-field")] = field.value;
        state.saved = false;
        const foot = field.parentElement.querySelector(".editor-foot span");
        if (foot && field.getAttribute("data-field") === "body") {
          foot.textContent = `${words(e.body)} kata`;
        }
        clearTimeout(field._t);
        field._t = setTimeout(() => {
          state.saved = true;
          const save = field.closest(".editor, .m-write")?.querySelector(".editor-meta span:last-child, .m-write-bar span:last-child");
          if (save) save.innerHTML = `<span class="save-dot"></span>Tersimpan`;
        }, 500);
      });
    });
  }

  function render() {
    const desktop = document.getElementById("desktop-root");
    const mobile = document.getElementById("mobile-root");
    const live = document.getElementById("live-root");

    if (state.mode === "gallery") {
      if (desktop) {
        desktop.innerHTML = desktopApp();
        bind(desktop);
      }
      if (mobile) {
        mobile.innerHTML = mobileApp();
        bind(mobile);
      }
    } else if (live) {
      const wide = window.matchMedia("(min-width: 900px)").matches;
      document.body.classList.toggle("live-desktop", wide);
      document.body.classList.toggle("live-mobile", !wide);
      live.innerHTML = wide ? desktopApp() : mobileApp();
      bind(live);
    }
  }

  function setMode(mode) {
    state.mode = mode;
    document.body.classList.toggle("mode-gallery", mode === "gallery");
    document.body.classList.toggle("mode-live", mode === "live");
    const gallery = document.getElementById("gallery");
    const live = document.getElementById("live-root");
    if (gallery) gallery.hidden = mode !== "gallery";
    if (live) live.hidden = mode !== "live";
    document.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.getAttribute("data-mode") === mode);
    });
    render();
  }

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.getAttribute("data-mode")));
  });

  window.addEventListener("resize", () => {
    if (state.mode === "live") render();
  });

  if (location.hash === "#app" || new URLSearchParams(location.search).get("live") === "1") {
    setMode("live");
  } else {
    render();
  }
})();
