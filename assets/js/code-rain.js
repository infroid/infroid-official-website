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
        // Fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Green text
        this.ctx.fillStyle = '#10B981';
        this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Gradient effect
            const opacity = 1 - (y / this.canvas.height);
            this.ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
            
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