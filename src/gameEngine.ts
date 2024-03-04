export function gameEngine(element: HTMLButtonElement) {

    type Descriptor<T> = {
        enumerable?: boolean;
        configurable?: boolean;
        writable?: boolean;
        value?: T;
    };
    
    const defineProperty = Object.defineProperty;
    
    const defineOrSet = <T>(obj: any, prop: string | symbol, value: T): void => {
        if (prop in obj) {
            defineProperty(obj, prop, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: value
            });
        } else {
            obj[prop] = value;
        }
    };
    
    const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
        let timeout: NodeJS.Timeout;
        return ((...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(null, args), delay);
        }) as T;
    };
    
    const randomInt = (min: number, max: number): number => {
        return Math.floor(min + Math.random() * (max - min + 1));
    };
    
    interface LinkElement extends HTMLLinkElement {
        ep?: boolean;
    }
    
    class MoleGame {
        timeEl: HTMLElement;
        clicksEl: HTMLElement;
        startButtonEl: HTMLButtonElement;
        winMessageEl: HTMLElement;
        holesEl: NodeListOf<Element>;
        moleImgEl: HTMLImageElement;
        win: boolean = true;
        timerIntervalId: NodeJS.Timeout;
        time: number = 0;
        clicks: number = 0;
    
        constructor(container: HTMLElement, moleImageUrl: string) {
            defineOrSet(this, "timeEl", container.querySelector(".time"));
            defineOrSet(this, "clicksEl", container.querySelector(".clicks"));
            defineOrSet(this, "startButtonEl", container.querySelector(".start-button"));
            defineOrSet(this, "winMessageEl", container.querySelector(".win-message"));
            defineOrSet(this, "holesEl", container.querySelectorAll(".hole"));
    
            this.startButtonEl.addEventListener("click", () => this.start());
            this.holesEl.forEach((hole) => {
                hole.addEventListener("click", () => {
                    if (!this.win) {
                        this.clicks += 1;
                        this.updateClickElement();
                        this.hit();
                    }
                });
            });
    
            defineOrSet(this, "moleImgEl", document.createElement("img"));
            this.moleImgEl.src = moleImageUrl;
            this.moleImgEl.classList.add("mole");
            this.moleImgEl.addEventListener("mousedown", () => {
                if (this.win) {
                    alert("You already caught the mole, restart the game!");
                } else {
                    this.clicks += 1;
                    this.updateClickElement();
                    this.winMessageEl.textContent = "You win!";
                    setTimeout(() => {
                        alert(`Gotcha! Time to catch ${this.time} seconds and ${this.clicks} clicks`);
                    }, 100);
                    this.stopTimeCounter();
                    this.stop();
                    this.win = true;
                }
            });
        }
    
        runGame(): void {
            const randomIndex = randomInt(0, this.holesEl.length - 1);
            this.holesEl[randomIndex].appendChild(this.moleImgEl);
            setTimeout(() => {
                console.log("win", this.win);
                if (!this.win) {
                    this.hideMole();
                }
            }, randomInt(200, 400));
        }
    
        debouncedRunGame = debounce(this.runGame, 1000);
    
        hideMole(): void {
            this.holesEl.forEach((hole) => {
                while (hole.firstChild) {
                    hole.removeChild(hole.firstChild);
                }
            });
            this.debouncedRunGame();
        }
    
        hit(): void {
            this.debouncedRunGame();
        }
    
        updateTimeElement(): void {
            this.timeEl.textContent = `Elapsed time: ${this.time} seconds`;
        }
    
        startTimeCounter(): void {
            this.timerIntervalId = setInterval(() => {
                this.time += 1;
                this.updateTimeElement();
            }, 1000);
        }
    
        stopTimeCounter(): void {
            clearInterval(this.timerIntervalId);
        }
    
        updateClickElement(): void {
            this.clicksEl.textContent = `Clicks: ${this.clicks}`;
        }
    
        start(): void {
            this.time = 0;
            this.clicks = 0;
            this.updateClickElement();
            this.updateTimeElement();
            this.startButtonEl.disabled = true;
            this.win = false;
            this.winMessageEl.textContent = "";
            this.hideMole();
            this.hit();
            this.startTimeCounter();
        }
    
        stop(): void {
            this.startButtonEl.disabled = false;
        }
    
        static setup(container: HTMLElement, moleImageUrl: string): MoleGame {
            return this.instance || (this.instance = new this(container, moleImageUrl));
        }
    }
    
    defineOrSet(MoleGame, "instance", null);
    
    const moleImageUrl = new URL("meta-pals-mole.png", import.meta.url).href;
    const container = document.querySelector("#app") as HTMLElement;
    MoleGame.setup(container, moleImageUrl);

  }