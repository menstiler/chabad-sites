function setUpTestimonials() {
  const e = document.querySelectorAll(".testimonial-item"),
    t = document.querySelectorAll(".dot"),
    n = document.getElementById("prev-testimonial"),
    o = document.getElementById("next-testimonial");
  let c,
    a = 0;
  function i(n) {
    e.forEach((e, t) => {
      e.classList.remove("active", "prev"), t < n && e.classList.add("prev");
    }),
      t.forEach((e) => e.classList.remove("active")),
      e[n].classList.add("active"),
      t[n].classList.add("active"),
      (a = n);
  }
  function r() {
    i((a + 1) % e.length);
  }
  function s() {
    c = setInterval(r, 4e3);
  }
  function l() {
    clearInterval(c);
  }
  o.addEventListener("click", () => {
    l(), r(), s();
  }),
    n.addEventListener("click", () => {
      l(), i((a - 1 + e.length) % e.length), s();
    }),
    t.forEach((e, t) => {
      e.addEventListener("click", () => {
        l(), i(t), s();
      });
    });
  const d = document.querySelector(".testimonials");
  d.addEventListener("mouseenter", l), d.addEventListener("mouseleave", s), s();
}
document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("learn-more-btn"),
    t = document.getElementById("expandable-info");
  function n() {
    const e = document.querySelector(".form-checkbox-other"),
      t = document.querySelector(".form-checkbox-other-input");
    if ((e && (e.checked = !0), t)) {
      let e = 0;
      document
        .querySelectorAll("#donation-table-body tr .qty-input")
        .forEach((t) => {
          const n = parseInt(t.value),
            o = t.closest("tr").querySelector(".price"),
            c = Number(o.textContent.replace(/[$,]/g, "")),
            a = t.parentElement.previousElementSibling
              .querySelector("div:nth-child(2)")
              .textContent.trim()
              .toLowerCase();
          if ("general donation" === a) return void (e += c);
          const i = Array.from(
              document.querySelectorAll(".form-checkbox")
            ).find((e) => e.value.split("-")[0].trim().toLowerCase() === a),
            r = parseFloat(i.value.replace(/[^0-9.]/g, ""));
          isNaN(n) || isNaN(c) || ((e += c), i && i.checked && (e -= r));
        }),
        (t.value = e),
        t.dispatchEvent(new Event("change", { bubbles: !0 }));
    }
  }
  e &&
    e.addEventListener("click", function () {
      t.classList.toggle("expanded"),
        (e.textContent = t.classList.contains("expanded")
          ? "- Our Programs"
          : "+ Our Programs"),
        t.classList.contains("expanded") &&
          setTimeout(() => {
            t.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
    }),
    document.querySelectorAll(".year-item").forEach((e) => {
      e.addEventListener("click", function () {
        const e = this.dataset.year;
        document
          .querySelectorAll(".year-item")
          .forEach((e) => e.classList.remove("active")),
          this.classList.add("active"),
          document
            .querySelectorAll(".timeline-image")
            .forEach((e) => e.classList.remove("active"));
        const t = document.querySelector(`.timeline-image[data-year="${e}"]`);
        t && t.classList.add("active");
      });
    });
  function o(e) {
    const t = e.target,
      o = (t.value.slice(0, t.value.lastIndexOf("-")) || t.value).trim(),
      c = t.value.split("-").pop().trim(),
      a = document.getElementById("donation-table-body"),
      i = `row-${o.replace(/\s+/g, "-")}`,
      r = JSON.parse(sessionStorage.getItem("dedications")).find(
        (e) => e.name === o
      ),
      s = r.qty ? r.qty : 1;
    if (t.checked) {
      const d = document.createElement("tr");
      function l() {
        d.remove(),
          (t.checked = !1),
          t.dispatchEvent(new Event("change", { bubbles: !0 }));
      }
      (d.id = i),
        (d.innerHTML = `\n          <td>\n            <div>            \n            <button class="remove-btn" title="Remove donation" aria-label="Remove ${o}">&#x2715;</button>\n            </div>\n            <div>\n            ${o}\n            </div>\n          </td>\n          <td>\n          <input class="qty-input" id='qty-input' min="0" max=${s} step="1" type="number" value="1"  />\n          </td>\n          <td class="price" data-price="${c}">${c.toLocaleString()}</td>\n        `),
        a.appendChild(d),
        d.querySelector(".qty-input").addEventListener("change", (e) => {
          const t = parseInt(e.target.value);
          if (0 === t) return void l();
          const o = parseFloat(t) * Number(c.replace(/[$,]/g, ""));
          (d.querySelector(".price").textContent = `$${o.toLocaleString()}`),
            n(),
            d.dispatchEvent(new Event("change", { bubbles: !0 }));
        }),
        d.querySelector(".remove-btn").addEventListener("click", () => {
          l();
        });
    } else {
      const u = document.getElementById(i);
      u && u.remove();
    }
  }
  function c(e) {
    const t = window.location.pathname.split("/"),
      n = t.indexOf(e);
    if (-1 !== n) {
      const e =
        (t.slice(0, n).join("/") || "/") +
        window.location.search +
        window.location.hash;
      history.replaceState({}, "", e);
    }
  }
  document.querySelectorAll("#cid_1 label span").forEach(function (e) {
    if (e.innerHTML.includes("-")) {
      const t = e.innerHTML,
        n = t.lastIndexOf("-");
      if (-1 !== n) {
        const o = t.slice(0, n),
          c = t.slice(n + 1);
        e.innerHTML = `<div>${o}</div><div>${c}</div>`;
      }
    }
    var t = e.innerText.toLowerCase();
    (t.includes("reserved") || t.includes("dedicated")) &&
      e.closest(".form-checkbox-item").classList.add("reserved-dedication");
  }),
    (async function () {
      try {
        const e = document.getElementById("dedications");
        e.style.display = "none";
        const t = document.getElementById("dedication-list"),
          n = e?.querySelectorAll("tr") || [],
          o = {},
          c = [];
        for (let e = 1; e < n.length; e++) {
          const t = n[e].querySelectorAll("td");
          if (t.length < 4) continue;
          const a = t[0].textContent.trim(),
            i = t[1].textContent.trim(),
            r = t[2].textContent.trim(),
            s = "yes" === t[3].textContent.trim().toLowerCase() || !1,
            l = t[4].textContent.trim();
          if (!a || !l) continue;
          const d = { name: a, price: i, reserved: s, qty: r };
          c.push(d), o[l] || (o[l] = []), o[l].push(d);
        }
        sessionStorage.setItem("dedications", JSON.stringify(c));
        for (const [e, n] of Object.entries(o)) {
          const o = document.createElement("div");
          o.className = "dedication-category";
          const c = document.createElement("h4");
          (c.textContent = e), o.appendChild(c);
          const a = document.createElement("div");
          (a.className = "dedications-container"),
            o.appendChild(a),
            n.forEach((e) => {
              const t = document.createElement("div");
              t.className = "dedication-item";
              const n = document.createElement("div");
              (n.className = "title"),
                (n.textContent = `${e.name}`),
                t.appendChild(n);
              const o = document.createElement("div");
              o.className = "price-btn-container";
              const c = document.createElement("div");
              let i;
              (c.className = "price"),
                (c.textContent = e.price),
                o.appendChild(c),
                e.reserved
                  ? ((i = document.createElement("span")),
                    (i.textContent = "Reserved"),
                    (i.className = "dedicate-disabled"))
                  : ((i = document.createElement("a")),
                    (i.href = `/templates/articlecco_cdo/aid/6970745/jewish/Donations.htm?${new URLSearchParams(
                      { name: e.name }
                    )}`),
                    parseFloat(e.qty) > 1
                      ? (i.textContent = `${e.qty} Dedications`)
                      : (i.textContent = "Dedicate"),
                    (i.className = "dedicate-link")),
                o.appendChild(i),
                t.appendChild(o),
                a.appendChild(t);
            }),
            t.appendChild(o);
        }
        if (document.querySelectorAll(".campaign-progress h4")) {
          const e = document.querySelectorAll(".campaign-progress h4")[0],
            t = document.querySelectorAll(".campaign-progress h4")[1];
          let n = 0,
            o = 0;
          const c = parseFloat(
            e.textContent.split(" ")[0].replace(/[^0-9.]/g, "")
          );
          if (
            ((n = parseFloat(
              t.textContent.split(" ")[1].replace(/[^0-9.]/g, "")
            )),
            (o = c),
            n && o)
          ) {
            const e = Math.min((o / n) * 100, 100),
              t = document.querySelectorAll(".progress-bar");
            t.length > 0 &&
              t.forEach(function (t) {
                (t.style.width = `${e}%`),
                  t.setAttribute("aria-valuenow", e.toFixed(0));
              });
          }
        }
      } catch (e) {
        console.error("Error loading dedications:", e);
      }
    })(),
    document.querySelectorAll('input[name="q1_input1[]"]').forEach((e) => {
      e.addEventListener("change", o);
    }),
    (function () {
      const e = window.location.pathname.split("/");
      let t = "";
      const a = e.indexOf("name");
      if (
        (-1 !== a &&
          e[a + 1] &&
          (t = decodeURIComponent(e[a + 1]).replace(/\+/g, " ")),
        t)
      ) {
        const l = t.toLowerCase(),
          d = Array.from(
            document.querySelectorAll("input[type='checkbox']")
          ).find(
            (e) =>
              (e.value.slice(0, e.value.lastIndexOf("-")) || e.value)
                .trim()
                .toLowerCase() === l
          );
        d && "checkbox" === d.type && ((d.checked = !0), o({ target: d })),
          c("name");
      }
      const i = e.indexOf("amount");
      let r = null;
      if (-1 !== i && e[i + 1]) {
        const u = decodeURIComponent(e[i + 1]).replace(/[^\d]/g, "");
        r = parseInt(u, 10);
      }
      if (r && !isNaN(r)) {
        const m = document.querySelector(".form-checkbox-other"),
          p = document.querySelector(".form-checkbox-other-input");
        (m.checked = !0), (p.value = r);
        const v = document.getElementById("donation-table-body"),
          h = "row-amount",
          y = document.createElement("tr");
        function s() {
          y.remove(),
            (m.checked = !1),
            m.dispatchEvent(new Event("change", { bubbles: !0 }));
        }
        (y.id = h),
          (y.innerHTML = `\n      <td>\n        <div>\n        <button class="remove-btn" title="Remove donation" aria-label="Remove ${r}">&#x2715;</button>\n        </div>\n        <div>\n          General Donation\n        </div>\n      </td>   \n      <td>\n      <input class="qty-input" min="0" step="1" type="number" value="1"/>\n      </td>\n      <td class="price" data-price="${r}">$${r.toLocaleString()}</td>\n    `),
          v.appendChild(y),
          y.querySelector(".qty-input").addEventListener("change", (e) => {
            const t = parseInt(e.target.value);
            if (0 === t) return void s();
            const o = document.querySelector(".form-checkbox-other"),
              c = document.querySelector(".form-checkbox-other-input");
            o.checked = !0;
            const a = parseFloat(t) * r;
            (y.querySelector(".price").textContent = `$${a.toLocaleString()}`),
              (c.value = a),
              n(),
              o.dispatchEvent(new Event("change", { bubbles: !0 }));
          }),
          y.querySelector(".remove-btn").addEventListener("click", () => {
            s();
          }),
          c("amount");
      }
    })();
  const a = document.querySelector("#total_amount");
  if (a) {
    new MutationObserver((e) => {
      for (const t of e)
        ("childList" !== t.type && "characterData" !== t.type) ||
          (document.getElementById("donation-total").textContent = parseFloat(
            a.textContent.replace("$", "")
          ).toLocaleString("en-US", { style: "currency", currency: "USD" }));
    }).observe(a, { childList: !0, characterData: !0, subtree: !0 });
  }
  let i = null;
  document.querySelectorAll(".amount-btn").forEach((e) => {
    e.addEventListener("click", () => {
      document
        .querySelectorAll(".amount-btn")
        .forEach((e) => e.classList.remove("selected")),
        e.classList.add("selected");
      const t = e.dataset.amount;
      "other" === t
        ? ((document.getElementById("other-input").style.display = "block"),
          (i = null))
        : ((document.getElementById("other-input").style.display = "none"),
          (i = parseInt(t)));
    });
  }),
    document.getElementById("donate-now").addEventListener("click", () => {
      if (
        ("other" ===
          document.querySelector(".amount-btn.selected")?.dataset.amount &&
          (i = parseInt(document.getElementById("other-amount").value)),
        !i || isNaN(i))
      )
        return void alert("Please select or enter a valid amount");
      const e = `/templates/articlecco_cdo/aid/6970745/jewish/Donations.htm?amount=${encodeURIComponent(
        i
      )}`;
      window.location.href = e;
    });
  const r = document.getElementById("burger-menu"),
    s = document.getElementById("navigation");
  function l() {
    r.classList.remove("active"), s.classList.remove("active");
  }
  r.addEventListener("click", function () {
    r.classList.toggle("active"), s.classList.toggle("active");
  });
  if (
    (document.querySelectorAll("nav a").forEach((e) => {
      e.addEventListener("click", l);
    }),
    window.addEventListener("resize", () => {
      window.innerWidth > 768 && l();
    }),
    document.addEventListener(
      "click",
      function (e) {
        const t = e.target.closest('a[href^="#"]');
        if (!t) return;
        const n = t.getAttribute("href");
        if (!n || "#" === n) return;
        const o = document.querySelector(n);
        if (!o) return;
        e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
        const c =
            document.querySelector(".sticky-top") ||
            document.querySelector("header"),
          a = c ? c.offsetHeight : 0,
          i = o.getBoundingClientRect().top + window.scrollY - a - 8;
        window.scrollTo({ top: Math.max(0, i), behavior: "smooth" }),
          o.setAttribute("tabindex", "-1"),
          o.focus({ preventScroll: !0 }),
          history.pushState
            ? history.pushState(null, "", n)
            : (location.hash = n);
      },
      !0
    ),
    document.body.classList.contains("section_root"))
  ) {
    const e =
      '\n      <li class="item parent"><a href="#campaign" class="parent">Campaign</a></li>\n      <li class="item parent"><a href="#timeline" class="parent">Timeline</a></li>\n      <li class="item parent"><a href="#donations" class="parent">Dedications</a></li>\n      <li class="item parent"><a href="#contact" class="parent">Contact</a></li>\n      ';
    "Menu" === jQuery("#navigation #menu .item a").first().text().trim() &&
      jQuery("#navigation #menu .item").first().remove(),
      "Home" === jQuery("#navigation #menu .item a").first().text().trim()
        ? jQuery("#navigation #menu .item").first().after(e)
        : jQuery("#navigation #menu").prepend(e);
  }
});
