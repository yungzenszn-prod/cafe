// Cafe Zen Beats - Main JavaScript
class CafeZenBeats {
    constructor() {
        this.cart = [];
        this.currentBeat = null;
        this.audioPlayer = null;
        this.audioElement = null;
        this.isPlaying = false;
        
        this.init();
    }

    init() {
        this.loadComponents();
        this.initFilters();
        this.loadDummyData();
        this.setupEventListeners();
        this.initAudioPlayer();
        this.initTheme();
        this.updateCartUI();
    }

    loadComponents() {
        // Load Header
        fetch('components/header.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('header').innerHTML = html;
                this.setupHeaderEvents();
            })
            .catch(() => {
                // Fallback if fetch fails
                document.getElementById('header').innerHTML = `
                    <header class="header">
                        <div class="container">
                            <div class="header-content">
                                <a href="#" class="logo">Cafe Zen</a>
                                <nav>
                                    <ul class="nav-menu" id="nav-menu">
                                        <li><a href="#" class="nav-link active" data-page="home">Home</a></li>
                                        <li><a href="#" class="nav-link" data-page="beats">Beats</a></li>
                                        <li><a href="#" class="nav-link" data-page="licensing">Licensing</a></li>
                                        <li><a href="#" class="nav-link" data-page="about">About</a></li>
                                        <li><a href="#" class="nav-link" data-page="contact">Contact</a></li>
                                        <li>
                                            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" aria-pressed="false">
                                                <span class="theme-icon" aria-hidden="true">☾</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                <div class="header-actions">
                                    <button class="search-btn" id="search-btn" aria-label="Search">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.35-4.35"></path>
                                        </svg>
                                    </button>
                                    <button class="cart-btn cart-pill" id="cart-btn" aria-label="Cart">
                                        <span class="cart-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.8 13.5a2 2 0 0 0 2 1.5h9.7a2 2 0 0 0 2-1.5L23 6H6"></path>
                                            </svg>
                                        </span>
                                        <span class="cart-count" id="cart-count">0</span>
                                        <span class="cart-price-tag" id="nav-cart-total">$0.00</span>
                                        <span class="cart-popover" id="cart-popover">
                                            <span class="cart-popover-icon">i</span>
                                            Items in cart
                                        </span>
                                    </button>
                                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <line x1="4" x2="20" y1="12" y2="12"></line>
                                            <line x1="4" x2="20" y1="6" y2="6"></line>
                                            <line x1="4" x2="20" y1="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                `;
                this.setupHeaderEvents();
            });

        // Load Footer
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('footer').innerHTML = html;
            })
            .catch(() => {
                // Fallback
                document.getElementById('footer').innerHTML = `
                    <footer class="footer">
                        <div class="container">
                            <p>&copy; 2024 Cafe Zen. All rights reserved.</p>
                        </div>
                    </footer>
                `;
            });
    }

    loadDummyData() {
        // Beats data with actual audio files
        this.beats = [
            {
                id: 1,
                title: "Midnight Coffee",
                producer: "Cafe Zen",
                bpm: 140,
                key: "C# Minor",
                price: 29.99,
                genre: "Lo-Fi",
                tags: ["Lo-Fi", "Moody", "Night"],
                duration: "3:24",
                image: "https://picsum.photos/seed/beat1/300/300.jpg",
                audioFile: "assets/audio/Midnight Coffee.mp3"
            },
            {
                id: 2,
                title: "Espresso Dreams",
                producer: "Cafe Zen",
                bpm: 125,
                key: "F Major",
                price: 34.99,
                genre: "Hip Hop",
                tags: ["Hip Hop", "Smooth", "Vocal"],
                duration: "2:58",
                image: "https://picsum.photos/seed/beat2/300/300.jpg",
                audioFile: "assets/audio/espresso dreams.wav"
            },
            {
                id: 3,
                title: "Latte Vibes",
                producer: "Cafe Zen",
                bpm: 95,
                key: "G Major",
                price: 24.99,
                genre: "R&B",
                tags: ["R&B", "Warm", "Late Night"],
                duration: "4:12",
                image: "https://picsum.photos/seed/beat3/300/300.jpg",
                audioFile: "assets/audio/latte vibes.mp3"
            },
            {
                id: 4,
                title: "Mocha Sunset",
                producer: "Cafe Zen",
                bpm: 160,
                key: "D Minor",
                price: 39.99,
                genre: "Trap",
                tags: ["Trap", "Energy", "Bass"],
                duration: "2:45",
                image: "https://picsum.photos/seed/beat4/300/300.jpg",
                audioFile: "assets/audio/mocha sunset.mp3"
            },
            {
                id: 5,
                title: "Caramel Flow",
                producer: "Cafe Zen",
                bpm: 85,
                key: "A Major",
                price: 19.99,
                genre: "Chill",
                tags: ["Chill", "Ambient", "Soft"],
                duration: "3:36",
                image: "https://picsum.photos/seed/beat5/300/300.jpg",
                audioFile: "assets/audio/caramel flow.mp3"
            },
            {
                id: 6,
                title: "Dark Roast",
                producer: "Cafe Zen",
                bpm: 145,
                key: "E Minor",
                price: 44.99,
                genre: "Drill",
                tags: ["Drill", "Heavy", "Street"],
                duration: "2:22",
                image: "https://picsum.photos/seed/beat6/300/300.jpg",
                audioFile: "assets/audio/dark roast.mp3"
            }
        ];

        // Dummy categories
        this.categories = [
            { name: "Lo-Fi", count: 12, icon: "◎" },
            { name: "Hip Hop", count: 24, icon: "◌" },
            { name: "R&B", count: 18, icon: "◇" },
            { name: "Trap", count: 30, icon: "△" },
            { name: "Chill", count: 15, icon: "○" },
            { name: "Drill", count: 21, icon: "⬡" }
        ];

        this.renderBeats();
        this.renderBeatsPage();
        this.renderCategories();
    }

    initFilters() {
        this.filterState = {
            bpmRange: 'all',
            keys: [],
            tags: [],
            minPrice: '',
            maxPrice: ''
        };
    }

    getBeatRowMarkup(beat) {
        return `
            <div class="beat-row" data-beat-id="${beat.id}">
                <div class="beat-row-art">
                    <img src="${beat.image}" alt="${beat.title}">
                    <button class="beat-row-play" onclick="app.playBeat(${beat.id})" aria-label="Play ${beat.title}">▶</button>
                </div>
                <div class="beat-row-details">
                    <div class="beat-row-title">${beat.title}</div>
                    <div class="beat-row-meta">
                        <span>${beat.bpm} BPM</span>
                        <span>${beat.key}</span>
                        <span class="beat-row-pill">#${beat.genre}</span>
                    </div>
                </div>
                <div class="beat-row-actions">
                    <div class="beat-row-price">$${beat.price}</div>
                    <button class="btn btn-primary btn-sm" data-cart-action="add" onclick="app.addToCart(${beat.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }

    renderBeats() {
        const beatsGrid = document.getElementById('featured-beats-grid');
        if (!beatsGrid) return;

        const featuredBeats = this.beats.slice(0, 3);
        beatsGrid.innerHTML = featuredBeats.map(beat => this.getBeatRowMarkup(beat)).join('');
    }

    renderBeatsPage() {
        const beatsList = document.getElementById('beats-list');
        if (!beatsList) return;

        this.renderFilters();
        this.applyFilters();
    }

    renderCheckoutSummary() {
        const summary = document.getElementById('checkout-summary');
        if (!summary) return;

        if (this.cart.length === 0) {
            summary.innerHTML = `
                <div class="checkout-title">Order Summary</div>
                <div class="checkout-empty">Your cart is empty. Add beats to continue.</div>
            `;
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        summary.innerHTML = `
            <div class="checkout-title">Order Summary</div>
            <div class="checkout-list">
                ${this.cart.map(item => `
                    <div class="checkout-item">
                        <div class="checkout-item-info">
                            <div class="checkout-item-title">${item.title}</div>
                            <div class="checkout-item-meta">${item.license || 'Standard'} License</div>
                        </div>
                        <div class="checkout-item-price">$${item.price}</div>
                    </div>
                `).join('')}
            </div>
            <div class="checkout-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }

    renderFilters() {
        const filtersContainer = document.getElementById('beats-filters');
        if (!filtersContainer) return;

        const keys = [...new Set(this.beats.map(beat => beat.key))].sort();
        const tags = [...new Set(this.beats.flatMap(beat => beat.tags || []))].sort();
        const popularTags = ["Lo-Fi", "Hip Hop", "R&B"];

        filtersContainer.innerHTML = `
            <div class="filter-group">
                <div class="filter-title">BPM Range</div>
                <div class="filter-range">
                    <select id="filter-bpm">
                        <option value="all">All</option>
                        <option value="low">60 - 99</option>
                        <option value="mid">100 - 129</option>
                        <option value="high">130 - 180</option>
                    </select>
                </div>
            </div>
            <div class="filter-group">
                <div class="filter-title">Keys</div>
                <div class="filter-options">
                    ${keys.map(key => `
                        <label class="filter-option">
                            <span>${key}</span>
                            <input type="checkbox" value="${key}" class="filter-key">
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="filter-group">
                <div class="filter-title">Tags</div>
                <div class="filter-tags" id="filter-tags">
                    ${tags.map(tag => `
                        <label class="filter-tag-pill ${popularTags.includes(tag) ? 'popular' : ''}">
                            <input type="checkbox" value="${tag}" class="filter-tag-input">
                            <span>#${tag}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="filter-group">
                <div class="filter-title">Price</div>
                <div class="filter-range">
                    <input type="number" id="filter-min" placeholder="Min" min="0">
                    <input type="number" id="filter-max" placeholder="Max" min="0">
                </div>
            </div>
            <div class="filter-actions">
                <button class="btn btn-outline btn-sm" id="filter-reset">Reset</button>
                <button class="btn btn-primary btn-sm" id="filter-apply">Apply</button>
            </div>
        `;

        document.getElementById('filter-bpm')?.addEventListener('change', (e) => {
            this.filterState.bpmRange = e.target.value;
            this.applyFilters();
        });

        filtersContainer.querySelectorAll('.filter-key').forEach(input => {
            input.addEventListener('change', () => {
                this.filterState.keys = Array.from(filtersContainer.querySelectorAll('.filter-key:checked')).map(item => item.value);
                this.applyFilters();
            });
        });

        filtersContainer.querySelectorAll('.filter-tag-input').forEach(input => {
            input.addEventListener('change', () => {
                this.filterState.tags = Array.from(filtersContainer.querySelectorAll('.filter-tag-input:checked')).map(item => item.value);
                this.applyFilters();
            });
        });

        document.getElementById('filter-min')?.addEventListener('input', (e) => {
            this.filterState.minPrice = e.target.value;
        });

        document.getElementById('filter-max')?.addEventListener('input', (e) => {
            this.filterState.maxPrice = e.target.value;
        });

        document.getElementById('filter-apply')?.addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('filter-reset')?.addEventListener('click', () => {
            this.filterState = { bpmRange: 'all', keys: [], tags: [], minPrice: '', maxPrice: '' };
            filtersContainer.querySelectorAll('input[type="checkbox"]').forEach(input => { input.checked = false; });
            document.getElementById('filter-bpm').value = 'all';
            document.getElementById('filter-min').value = '';
            document.getElementById('filter-max').value = '';
            this.applyFilters();
        });
    }

    applyFilters() {
        const beatsList = document.getElementById('beats-list');
        if (!beatsList) return;

        const filtered = this.beats.filter(beat => {
            const bpmMatch = this.filterState.bpmRange === 'all' ||
                (this.filterState.bpmRange === 'low' && beat.bpm <= 99) ||
                (this.filterState.bpmRange === 'mid' && beat.bpm >= 100 && beat.bpm <= 129) ||
                (this.filterState.bpmRange === 'high' && beat.bpm >= 130);

            const keyMatch = this.filterState.keys.length === 0 || this.filterState.keys.includes(beat.key);

            const tagMatch = this.filterState.tags.length === 0 ||
                (beat.tags || []).some(tag => this.filterState.tags.includes(tag));

            const minPrice = this.filterState.minPrice ? Number(this.filterState.minPrice) : null;
            const maxPrice = this.filterState.maxPrice ? Number(this.filterState.maxPrice) : null;
            const priceMatch = (minPrice === null || beat.price >= minPrice) && (maxPrice === null || beat.price <= maxPrice);

            return bpmMatch && keyMatch && tagMatch && priceMatch;
        });

        beatsList.innerHTML = filtered.length
            ? filtered.map(beat => this.getBeatRowMarkup(beat)).join('')
            : '<div class="cart-empty">No beats match these filters.</div>';
    }

    renderCategories() {
        const categoriesGrid = document.getElementById('categories-grid');
        if (!categoriesGrid) return;

        categoriesGrid.innerHTML = this.categories.map(category => `
            <a href="#" class="category-card" onclick="app.filterByGenre('${category.name}')">
                <div class="category-icon">${category.icon}</div>
                <div class="category-name">${category.name}</div>
                <div class="category-count">${category.count} beats</div>
            </a>
        `).join('');
    }

    initAudioPlayer() {
        this.audioPlayer = document.getElementById('audio-player');
        if (!this.audioPlayer) return;

        // Create audio element
        this.audioElement = new Audio();
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.onAudioEnded());
        this.audioElement.addEventListener('loadedmetadata', () => this.updateDuration());

        this.audioPlayer.innerHTML = `
            <div class="container">
                <div class="player-content">
                    <div class="player-info">
                        <div class="player-title" id="player-title">Select a beat</div>
                        <div class="player-producer" id="player-producer">Cafe Zen</div>
                    </div>
                    <div class="player-controls">
                        <button class="player-btn" onclick="app.previousBeat()">⏮</button>
                        <button class="player-btn play-pause" onclick="app.togglePlay()" id="play-pause-btn">▶</button>
                        <button class="player-btn" onclick="app.nextBeat()">⏭</button>
                    </div>
                    <div class="player-progress">
                        <div class="progress-bar" onclick="app.seek(event)">
                            <div class="progress-fill" id="progress-fill"></div>
                            <div class="progress-thumb" id="progress-thumb"></div>
                        </div>
                    </div>
                    <div class="player-time">
                        <span id="current-time">0:00</span> / <span id="total-time">0:00</span>
                    </div>
                    <button class="player-btn" onclick="app.closePlayer()">✕</button>
                </div>
            </div>
        `;
    }

    playBeat(beatId) {
        const beat = this.beats.find(b => b.id === beatId);
        if (!beat) return;

        this.currentBeat = beat;
        this.audioPlayer.classList.remove('hidden');
        this.updateActiveBeatRow(beat.id);
        
        document.getElementById('player-title').textContent = beat.title;
        document.getElementById('player-producer').textContent = beat.producer;
        
        // Load and play audio file
        if (beat.audioFile) {
            this.audioElement.src = beat.audioFile;
            this.audioElement.load();
            this.togglePlay();
        }
    }

    togglePlay() {
        if (!this.audioElement.src) return;
        
        if (this.isPlaying) {
            this.audioElement.pause();
        } else {
            this.audioElement.play();
        }
        
        this.isPlaying = !this.isPlaying;
        const playBtn = document.getElementById('play-pause-btn');
        playBtn.textContent = this.isPlaying ? '⏸' : '▶';
        this.updatePlayingState();
    }

    previousBeat() {
        if (!this.currentBeat) return;
        const currentIndex = this.beats.findIndex(b => b.id === this.currentBeat.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.beats.length - 1;
        this.playBeat(this.beats[prevIndex].id);
    }

    nextBeat() {
        if (!this.currentBeat) return;
        const currentIndex = this.beats.findIndex(b => b.id === this.currentBeat.id);
        const nextIndex = currentIndex < this.beats.length - 1 ? currentIndex + 1 : 0;
        this.playBeat(this.beats[nextIndex].id);
    }

    closePlayer() {
        this.audioPlayer.classList.add('hidden');
        this.audioElement.pause();
        this.audioElement.src = '';
        this.isPlaying = false;
        this.currentBeat = null;
        this.updateActiveBeatRow(null);
    }

    seek(event) {
        if (!this.audioElement.src) return;
        
        const rect = event.currentTarget.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        const time = percent * this.audioElement.duration;
        this.audioElement.currentTime = time;
    }

    updateProgress() {
        if (!this.audioElement.src) return;
        
        const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        document.getElementById('progress-fill').style.width = `${percent}%`;
        const progressThumb = document.getElementById('progress-thumb');
        if (progressThumb) {
            progressThumb.style.left = `${percent}%`;
        }
        document.getElementById('current-time').textContent = this.formatTime(this.audioElement.currentTime);
    }

    updateDuration() {
        if (!this.audioElement.src) return;
        
        document.getElementById('total-time').textContent = this.formatTime(this.audioElement.duration);
    }

    onAudioEnded() {
        this.isPlaying = false;
        const playBtn = document.getElementById('play-pause-btn');
        playBtn.textContent = '▶';
        // Auto-play next beat
        this.nextBeat();
    }

    updateActiveBeatRow(activeId) {
        document.querySelectorAll('.beat-row').forEach(row => {
            const isActive = Number(row.dataset.beatId) === activeId;
            row.classList.toggle('beat-row-active', isActive);
        });
        this.updatePlayingState();
    }

    updatePlayingState() {
        document.querySelectorAll('.beat-row').forEach(row => {
            const isActive = this.currentBeat && Number(row.dataset.beatId) === this.currentBeat.id;
            const isPlaying = isActive && this.isPlaying;
            row.classList.toggle('beat-row-playing', isPlaying);
            const playButton = row.querySelector('.beat-row-play');
            if (playButton) {
                playButton.textContent = isPlaying ? '⏸' : '▶';
            }
        });
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    addToCart(beatId) {
        const beat = this.beats.find(b => b.id === beatId);
        if (!beat) return;

        const existingItem = this.cart.find(item => item.id === beatId);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.cart.push({ ...beat, quantity: 1, license: 'Standard' });
        }

        this.updateCartUI();
        this.openCart();
        this.showNotification(`${beat.title} added to cart!`);
    }

    removeFromCart(beatId) {
        this.cart = this.cart.filter(item => item.id !== beatId);
        this.updateCartUI();
        if (this.cart.length === 0) {
            this.closeCart();
        }
    }

    updateLicense(beatId, license) {
        const item = this.cart.find(entry => entry.id === beatId);
        if (item) {
            item.license = license;
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartSidebar = document.getElementById('cart-sidebar');
        const navCartTotal = document.getElementById('nav-cart-total');
        const cartPopover = document.getElementById('cart-popover');

        if (cartCount) {
            cartCount.textContent = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover;"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">
                                <span class="cart-item-price-current">$${item.price}</span>
                                <span class="cart-item-price-old">$${(item.price + 10).toFixed(2)}</span>
                            </div>
                            <div class="cart-item-license">
                                <label for="license-${item.id}">License</label>
                                <select id="license-${item.id}" onchange="app.updateLicense(${item.id}, this.value)">
                                    <option value="Standard" ${item.license === 'Standard' ? 'selected' : ''}>Standard</option>
                                    <option value="WAV" ${item.license === 'WAV' ? 'selected' : ''}>WAV</option>
                                    <option value="Stems" ${item.license === 'Stems' ? 'selected' : ''}>Stems</option>
                                    <option value="Unlimited" ${item.license === 'Unlimited' ? 'selected' : ''}>Unlimited</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-outline btn-sm cart-remove-btn" onclick="app.removeFromCart(${item.id})">&times;</button>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }

        if (navCartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            navCartTotal.textContent = `$${total.toFixed(2)}`;
        }

        if (cartPopover) {
            cartPopover.classList.toggle('visible', this.cart.length > 0);
        }

        this.renderCheckoutSummary();

        if (cartSidebar && !cartSidebar.classList.contains('active')) {
            if (this.cart.length > 0) {
                cartSidebar.classList.add('peek');
                cartSidebar.classList.remove('hidden');
            } else {
                cartSidebar.classList.remove('peek');
                cartSidebar.classList.add('hidden');
            }
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (!cartSidebar) return;
        const isOpen = cartSidebar.classList.contains('active');
        if (isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (!cartSidebar) return;
        cartSidebar.classList.add('active');
        cartSidebar.classList.remove('hidden');
        cartSidebar.classList.remove('peek');
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (!cartSidebar) return;
        cartSidebar.classList.remove('active');
        if (this.cart.length > 0) {
            cartSidebar.classList.add('peek');
            cartSidebar.classList.remove('hidden');
        } else {
            cartSidebar.classList.remove('peek');
            cartSidebar.classList.add('hidden');
        }
    }

    setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (header && window.scrollY > 50) {
                header.classList.add('scrolled');
            } else if (header) {
                header.classList.remove('scrolled');
            }
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartBtn = document.getElementById('cart-btn');
            const cartHandle = document.getElementById('cart-handle');
            const addToCartButton = e.target.closest('[data-cart-action="add"]');
            
            if (cartSidebar && cartSidebar.classList.contains('peek') && cartSidebar.contains(e.target)) {
                this.openCart();
                return;
            }

            if (addToCartButton) {
                return;
            }

            if (cartSidebar && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target) && (!cartHandle || !cartHandle.contains(e.target))) {
                this.closeCart();
            }
        });
    }

    setupHeaderEvents() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const cartBtn = document.getElementById('cart-btn');
        const cartHandle = document.getElementById('cart-handle');
        const themeToggle = document.getElementById('theme-toggle');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                this.toggleCart();
            });
        }

        if (cartHandle) {
            cartHandle.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const cartSidebar = document.getElementById('cart-sidebar');
                if (cartSidebar && cartSidebar.classList.contains('active')) {
                    this.closeCart();
                } else {
                    this.openCart();
                }
            });
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const page = link.dataset.page;
                this.navigateTo(page);
                
                // Close mobile menu
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    navigateTo(page) {
        const homeSections = document.querySelectorAll('[data-page-section="home"]');
        const beatsSection = document.querySelector('[data-page-section="beats"]');
        const checkoutSection = document.querySelector('[data-page-section="checkout"]');
        const contactSection = document.getElementById('contact');
        const pricingSection = document.getElementById('pricing-tiers');

        if (page === 'beats') {
            homeSections.forEach(section => section.classList.add('is-hidden'));
            if (beatsSection) beatsSection.classList.remove('is-hidden');
            if (checkoutSection) checkoutSection.classList.add('is-hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (page === 'checkout') {
            homeSections.forEach(section => section.classList.add('is-hidden'));
            if (beatsSection) beatsSection.classList.add('is-hidden');
            if (checkoutSection) checkoutSection.classList.remove('is-hidden');
            this.renderCheckoutSummary();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        homeSections.forEach(section => section.classList.remove('is-hidden'));
        if (beatsSection) beatsSection.classList.add('is-hidden');
        if (checkoutSection) checkoutSection.classList.add('is-hidden');

        if (page === 'contact' && contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (page === 'licensing' && pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    initTheme() {
        const storedTheme = localStorage.getItem('cafezen-theme');
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const theme = storedTheme || (prefersLight ? 'light' : 'dark');
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        document.body.classList.toggle('theme-light', theme === 'light');
        localStorage.setItem('cafezen-theme', theme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const isLight = theme === 'light';
            themeToggle.setAttribute('aria-pressed', String(isLight));
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) icon.textContent = isLight ? '☀' : '☾';
        }
    }

    toggleTheme() {
        const isLight = document.body.classList.contains('theme-light');
        this.applyTheme(isLight ? 'dark' : 'light');
    }

    filterByGenre(genre) {
        console.log(`Filtering by ${genre}`);
        this.showNotification(`Filtering beats by ${genre}`);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global functions for onclick handlers
let app;
function navigateTo(page) {
    if (app) app.navigateTo(page);
}
function toggleCart() {
    if (app) app.toggleCart();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new CafeZenBeats();
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to { opacity: 0; transform: translateY(10px); }
    }
`;
document.head.appendChild(style);
