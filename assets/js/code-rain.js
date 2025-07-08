// Code Rain Matrix Effect
class CodeRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Code characters
        this.chars = 'const=>{}[]();</>functionreturnifelseclassimportexport01'.split('');
        
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }
    
    init() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    animate() {
        // Get computed styles
        const styles = getComputedStyle(document.documentElement);
        const bgColor = styles.getPropertyValue('--color-bg').trim();
        
        // Fade effect with theme-aware background
        const isDark = !document.documentElement.hasAttribute('data-theme') || 
                      document.documentElement.getAttribute('data-theme') === 'dark';
        const fadeOpacity = isDark ? 0.05 : 0.03;
        
        // Convert hex to rgba for fade effect
        let r, g, b;
        if (bgColor.startsWith('#')) {
            r = parseInt(bgColor.slice(1, 3), 16);
            g = parseInt(bgColor.slice(3, 5), 16);
            b = parseInt(bgColor.slice(5, 7), 16);
        } else {
            // Default to black if color format is unexpected
            r = g = b = 0;
        }
        
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fadeOpacity})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Green text from CSS variable
        const accentGreen = styles.getPropertyValue('--color-accent-green').trim();
        this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Gradient effect with theme color
            const opacity = 1 - (y / this.canvas.height);
            
            // Extract RGB from accent color
            let gr = 16, gg = 185, gb = 129; // Default green values
            if (accentGreen.startsWith('#')) {
                gr = parseInt(accentGreen.slice(1, 3), 16);
                gg = parseInt(accentGreen.slice(3, 5), 16);
                gb = parseInt(accentGreen.slice(5, 7), 16);
            }
            
            this.ctx.fillStyle = `rgba(${gr}, ${gg}, ${gb}, ${opacity})`;
            
            this.ctx.fillText(char, x, y);
            
            // Reset drop
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.95) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Binary Grid Background
class BinaryGrid {
    constructor(element) {
        this.element = element;
        this.createGrid();
    }
    
    createGrid() {
        const grid = document.createElement('div');
        grid.className = 'binary-grid';
        grid.style.position = 'absolute';
        grid.style.top = '0';
        grid.style.left = '0';
        grid.style.width = '100%';
        grid.style.height = '100%';
        grid.style.opacity = '0.03';
        grid.style.pointerEvents = 'none';
        grid.style.fontFamily = 'JetBrains Mono, monospace';
        grid.style.fontSize = '12px';
        grid.style.lineHeight = '1.4';
        grid.style.color = 'var(--color-accent-green)';
        grid.style.overflow = 'hidden';
        
        // Generate binary pattern
        let pattern = '';
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 100; j++) {
                pattern += Math.random() > 0.5 ? '1' : '0';
            }
            pattern += '\n';
        }
        
        grid.textContent = pattern;
        this.element.appendChild(grid);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Add code rain canvas
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        canvas.style.zIndex = '1';
        hero.appendChild(canvas);
        
        new CodeRain(canvas);
        new BinaryGrid(hero);
    }
});