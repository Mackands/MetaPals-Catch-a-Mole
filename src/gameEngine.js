var h = Object.defineProperty;

var d = (l,e,s)=>e in l ? h(l, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
}) : l[e] = s;

var t = (l,e,s)=>(d(l, typeof e != "symbol" ? e + "" : e, s),s);

(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        n(i);
    new MutationObserver(i=>{
        for (const o of i)
            if (o.type === "childList")
                for (const r of o.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && n(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity),
        i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials" ? o.credentials = "include" : i.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function n(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const o = s(i);
        fetch(i.href, o)
    }
}
)();

const u = (l,e)=>{
    let s;
    return (...n)=>{
        clearTimeout(s),
        s = setTimeout(()=>l.apply(null, n), e)
    }
}
  , m = (l,e)=>Math.floor(l + Math.random() * (e - l + 1));
  
class a {
    constructor(e, s) {
        t(this, "timeEl");
        t(this, "clicksEl");
        t(this, "startButtonEl");
        t(this, "winMessageEl");
        t(this, "holesEl");
        t(this, "moleImgEl");
        t(this, "win", !0);
        t(this, "timerIntervalId");
        t(this, "time", 0);
        t(this, "clicks", 0);
        t(this, "runGame", ()=>{
            const e = Math.floor(Math.random() * this.holesEl.length);
            this.holesEl[e].append(this.moleImgEl),
            setTimeout(()=>{
                console.log("win", this.win),
                this.win || this.hideMole()
            }
            , m(200, 400))
        }
        );
        t(this, "debouncedRunGame", u(this.runGame, 1e3));
        t(this, "hideMole", ()=>{
            for (let e = 0; e < this.holesEl.length; e++)
                for (; this.holesEl[e].hasChildNodes(); )
                    this.holesEl[e].removeChild(this.holesEl[e].firstChild);
            this.debouncedRunGame()
        }
        );
        t(this, "hit", ()=>{
            this.debouncedRunGame()
        }
        );
        t(this, "updateTimeElement", ()=>{
            this.timeEl.textContent = `Elapsed time: ${this.time} seconds`
        }
        );
        t(this, "startTimeCounter", ()=>{
            this.timerIntervalId = setInterval(()=>{
                this.time += 1,
                this.updateTimeElement()
            }
            , 1e3)
        }
        );
        t(this, "stopTimeCounter", ()=>{
            clearInterval(this.timerIntervalId)
        }
        );
        t(this, "updateClickElement", ()=>{
            this.clicksEl.textContent = `Clicks: ${this.clicks}`
        }
        );
        t(this, "start", ()=>{
            this.time = 0,
            this.clicks = 0,
            this.updateClickElement(),
            this.updateTimeElement(),
            this.startButtonEl.setAttribute("disabled", !0),
            this.win = !1,
            this.winMessageEl.textContent = "",
            this.hideMole(),
            this.hit(),
            this.startTimeCounter()
        }
        );
        t(this, "stop", ()=>{
            this.startButtonEl.removeAttribute("disabled")
        }
        );
        this.winMessageEl = e.querySelectorAll(".win-message")[0],
        this.timeEl = e.querySelectorAll(".time")[0],
        this.clicksEl = e.querySelectorAll(".clicks")[0],
        this.holesEl = e.querySelectorAll(".hole"),
        this.startButtonEl = e.querySelectorAll(".start-button")[0],
        this.startButtonEl.addEventListener("click", n=>{
            this.start()
        }
        ),
        this.holesEl.forEach(n=>{
            n.addEventListener("click", ()=>{
                this.win || (this.clicks += 1,
                this.updateClickElement(),
                this.hit())
            }
            )
        }
        ),
        this.moleImgEl = document.createElement("img"),
        this.moleImgEl.setAttribute("src", s),
        this.moleImgEl.classList.add("mole"),
        this.moleImgEl.addEventListener("mousedown", n=>{
            this.win ? alert("You already catch the mole, restart the game!") : (this.clicks += 1,
            this.updateClickElement(),
            this.winMessageEl.textContent = "You win!",
            setTimeout(()=>{
                alert(`Gotcha! time to catch ${this.time} seconds and ${this.clicks} clicks`)
            }
            , 100)),
            this.stopTimeCounter(),
            n.stopPropagation(),
            this.stop(),
            this.win = !0
        }
        )
    }
    static setup(e, s) {
        return this.instance || (this.instance = new this(e,s)),
        this.instance
    }
}

t(a, "instance");

const c = "" + new URL("mole.60ea17ce.png",import.meta.url).href;

document.querySelector("#app").innerHTML = `
  <div class="container container__narrow">
    <h1 class="title">MetaPals Catch a Mole!</h1>
    <div class="flex justify-center">
      <div class="px-4">
        <div class="hole"></div>
      </div>
      <div class="px-4">
          <div class="hole"></div>
      </div>
      <div class="px-4">
          <div class="hole"></div>
      </div>
    </div>
    <div class="win-message text-green text-center py-4">
    </div>
    <div class="clicks text-center py-4">
    </div>
    <div class="time text-center py-4">
    </div>
    <div class="text-center py-4">
      <button class="start-button button">Start</button>
    </div>

    <hr />
    <h2 class="text-center">Test Objectives</h2>
    <ol class="list text-small">
      <li>Demonstrate your ability to build a <b>simple</b> game engine.</li>
      <li>Build a simple game with vanilla javascript.</li>
      <li>Demonstrate your ability to write clean and neat code that suitable for game engine.</li>
    </ol>
    <h2 class="text-center">Guides</h2>
    <ol class="list text-small">
      <li>Feel free to google.</li>
      <li>Try this mini app and collect the requirements.</li>
      <li>Must use <b>TypeScript</b>.</li>
      <li>Build the UI with vanilla javascript + CSS or SCSS, <strong>without</strong> React, Vue, Bootstrap, or any UI components library.</li>
      <li>Build game without any pre-made game engine.</li>
      <li>But using Tailwind CSS or similar CSS utilities is allowed.</li>
      <li>Using assets bundler such as Vite or Webpack is a <b>must</b>.</li>
      <li>The time for the mole to hide itself is randomized between 200ms & 400ms.</li>
      <li>There is "debounce" in the app, which is prevent the mole to come out from hole if you keep clicking on any hole rapidly.</li>
      <li>The debounce function must be reusable</li>
      <li>The code must be clean and neat, as if you were creating game engine code. You can use class/entity-based code to build the engine.</li>
      <li>Build the game on top of custom <b>simple</b> game engine you made for this game <b>(don't overengineer the engine)</b>.</li>
      <li>Bonus Point: Try to improvise and add at least one feature (gameplay-wise), don't forget to explain it in a README file.</li>
      <li>Bonus Point: Make a unit or e2e test for it using any testing framework (Jest, Playwright, etc).</li>
      <li>Submit by providing your GitHub repository information, include a README.md file and testable demo on GitHub pages.</li>
    </ol>
    <p>Mole image asset <a href="${c}" target="_blank">here</a></p>
  </div>
`;

a.setup(document.querySelector("#app"), c);